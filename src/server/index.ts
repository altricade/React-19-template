import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "../client/App";
import rootReducer from "../client/redux/rootReducer";

// Read environment variables
const isProduction = process.env.NODE_ENV === "production";
const app = express();
const PORT = process.env.PORT || 3001; // Use 3001 as default to avoid conflicts

// Set up fallback to index.html for client-side routes (SPA mode)
if (!isProduction) {
  // In development, set up catch-all route AFTER all other routes
  app.use((req, res, next) => {
    // Log all requests in development for debugging
    console.log(`[DEV] Server handling request: ${req.method} ${req.path}`);
    
    // Don't redirect API requests
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    // Don't redirect static asset requests
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      return next();
    }

    // For client-side routes, let the webpack dev server handle it
    // This is the key fix for SPA routing in development mode
    return res.redirect(`http://localhost:8080${req.url}`);
  });
}

// Serve static files - both from dev and prod locations
app.use(express.static(path.resolve(__dirname, "../client")));

// In development, also serve from the webpack output directory
if (!isProduction) {
  app.use(express.static(path.resolve(__dirname, "../../dist/client")));
}

// API endpoint example
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  // Mock user data for demonstration
  const mockUsers: Record<number, { id: number; name: string; email: string }> =
    {
      1: { id: 1, name: "John Doe", email: "john@example.com" },
      2: { id: 2, name: "Jane Smith", email: "jane@example.com" },
    };

  const user = mockUsers[userId];

  if (user) {
    return res.json(user);
  }

  return res.status(404).json({ error: "User not found" });
});

// Handle all routes with server-side rendering
app.get("*", (req, res) => {
  // Create a fresh Redux store for each request
  const store = configureStore({
    reducer: rootReducer,
  });

  // Initial state that will be hydrated on the client
  const preloadedState = store.getState();

  // Read the HTML template
  let indexHtml;
  try {
    // Try to read from the build directory first (for production)
    indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf8"
    );
  } catch (error) {
    // Fallback to source directory (for development)
    indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../../src/client/index.html"),
      "utf8"
    );
  }

  // Split the HTML template to inject our React app
  const [startingHtml, endingHtml] = indexHtml.split('<div id="root"></div>');

  // Replace the initial state placeholder with actual state
  const finalHtml = endingHtml.replace(
    "window.__INITIAL_STATE__ = {};",
    `window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")};`
  );

  // In development mode, skip SSR to avoid hydration issues during active development
  if (!isProduction) {
    // For development, just send the shell (no SSR)
    res.send(indexHtml);
    return;
  }
  
  // In production, important paths like /about should also work with SSR
  // Log the requested URL for debugging
  console.log(`[SSR] Rendering route: ${req.url}`);
  
  // Check for known client routes to ensure proper SSR handling
  const isKnownRoute = ['/', '/about'].includes(req.path);

  // For production, proceed with SSR
  // Send the starting part of HTML
  res.write(startingHtml);
  res.write('<div id="root">');

  // Stream the React app (only in production)
  const { pipe } = renderToPipeableStream(
    React.createElement(
      StaticRouter,
      { location: req.url },
      React.createElement(Provider, {
        store: store,
        children: React.createElement(App, null),
      })
    ),
    {
      bootstrapScripts: [
        // Find the main client JavaScript file (this will be replaced by the actual filename in production)
        "/js/main.js",
      ],
      onShellReady() {
        pipe(res);
        res.write("</div>");
        res.write(finalHtml);
      },
      onError(err) {
        console.error("Error during SSR:", err);
        res.status(500).send("Something went wrong");
      },
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

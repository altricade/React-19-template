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

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.resolve(__dirname, "../client")));

// API endpoint example
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  // Mock user data for demonstration
  const mockUsers: Record<number, { id: number; name: string; email: string }> = {
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
  const indexHtml = fs.readFileSync(
    path.resolve(__dirname, "../client/index.html"),
    "utf8"
  );

  // Split the HTML template to inject our React app
  const [startingHtml, endingHtml] = indexHtml.split('<div id="root"></div>');

  // Replace the initial state placeholder with actual state
  const finalHtml = endingHtml.replace(
    "__INITIAL_STATE__",
    JSON.stringify(preloadedState).replace(/</g, "\\u003c")
  );

  // Send the starting part of HTML
  res.write(startingHtml);
  res.write('<div id="root">');

  // Stream the React app
  const { pipe } = renderToPipeableStream(
    React.createElement(
      StaticRouter,
      { location: req.url },
      React.createElement(
        Provider,
        { store: store, children: React.createElement(App, null) }
      )
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

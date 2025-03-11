import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "./styles.css";
import rootReducer from "./redux/rootReducer";
import App from "./App";

// Add type definition for window.__INITIAL_STATE__
declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

// Provide a fallback if __INITIAL_STATE__ is not defined
const initialState = window.__INITIAL_STATE__ || {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const rootElement = document.getElementById("root") as HTMLElement;

// Use hydrateRoot for SSR hydration to avoid mismatches
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
} else {
  // Fallback to createRoot if there are no child nodes
  createRoot(rootElement).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

// Properly declare module augmentation for Webpack HMR - this fixes TypeScript errors
declare const module: {
  hot?: {
    accept: (path?: string, callback?: () => void) => void;
  };
};

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  // Accept the entire module first to prevent page reloads
  module.hot.accept();

  // Accept updates for the App component
  module.hot.accept("./App", () => {
    console.log("🔄 Hot-updating App component");
    // Re-render the app when App changes
    const NextApp = require("./App").default;

    // For HMR, it's better to use createRoot instead of hydrate
    // This avoids hydration mismatches during development
    try {
      createRoot(rootElement).render(
        <Provider store={store}>
          <BrowserRouter>
            <NextApp />
          </BrowserRouter>
        </Provider>
      );
    } catch (error) {
      console.error("Error during hot update:", error);
    }
  });
}

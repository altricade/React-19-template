import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "./styles.css";
import rootReducer from "./redux/rootReducer";
import App from "./App";

const initialState = window.__INITIAL_STATE__;

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

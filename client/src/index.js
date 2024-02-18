import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/index.scss";
import Modal from "react-modal";
// pages imports
import App from "./App";

Modal.setAppElement("#root");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

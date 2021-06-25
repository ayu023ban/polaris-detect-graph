import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import CustomRouter from "./router";
ReactDOM.render(
  <React.StrictMode>
    <CustomRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();

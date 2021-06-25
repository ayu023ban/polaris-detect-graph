import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import TimeSeriesChart from "./timeseries_chart";
// import Continents from "./timeseries_demo";
// import VegaDemo from "./vega_demo";
import ApexDemo from "./apex_demo";
ReactDOM.render(
  <React.StrictMode>
    {/* <TimeSeriesChart /> */}
    {/* <Continents /> */}
    {/* <VegaDemo /> */}
    <ApexDemo />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

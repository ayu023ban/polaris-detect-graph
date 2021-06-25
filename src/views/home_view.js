import React from "react";
import { useHistory } from "react-router-dom";

const HomeView = () => {
  const history = useHistory();
  return (
    <div>
      <button
        onClick={() => {
          history.push("/polaris-detect-graph/apexcharts");
        }}
      >
        ApexChart version{" "}
      </button>
      <button
        onClick={() => {
          history.push("/polaris-detect-graph/canvasjs");
        }}
      >
        CanvasJs version{" "}
      </button>
      <button
        onClick={() => {
          history.push("/polaris-detect-graph/fusioncharts");
        }}
      >
        Fusion Charts version{" "}
      </button>
    </div>
  );
};

export default HomeView;

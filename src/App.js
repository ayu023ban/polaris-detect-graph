import { useEffect } from "react";
import CanvasJSReact from "./lib/canvasjs/canvasjs.react";

import "./App.css";

// import json_data from "./assets/opssat_analysis.json";
import json_data from "./assets/opssat_analysis.json";
import columns from "./assets/opssat_columns.json";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function App() {
  const timestamps = json_data.data.timestamps.map((time) => new Date(time));

  const apple = {};
  columns.forEach((column) => {
    let temp = timestamps.map((time, idx) => ({
      x: time,
      y: json_data.data.values[column]["individual_values"][idx],
    }));

    apple[column] = temp;
  });

  const data = columns.map((col) => ({
    type: "stackedArea",
    name: col,
    // showInLegend: true,
    xValueFormatString: "YYYY",
    dataPoints: apple[col],
  }));

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Opssat data analysis",
    },
    axisY: {
      title: "values",
    },
    // toolTip: {
    //   shared: true,
    // },
    // legend: {
    //   verticalAlign: "center",
    //   horizontalAlign: "right",
    //   reversed: true,
    //   cursor: "pointer",
    //   // itemclick: this.toggleDataSeries,
    // },
    data: data,
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>LightSail-2 Anomaly Data</div>
        <div>
          <CanvasJSChart
            options={options}
            // onRef={(ref) => (this.chart = ref)}
          />
        </div>
      </header>
    </div>
  );
}

export default App;

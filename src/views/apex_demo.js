// import React from "react";
import Chart from "react-apexcharts";
import json_data from "../assets/opssat_analysis.json";
import columns from "../assets/opssat_columns.json";

const timestamps = json_data.data.timestamps.map((time) => {
  let temp = new Date(time);
  return temp.getTime();
});

let columns_to_ignore = [
  // "number_of_tx_bytes_since_reboot",
  // "total_rx_packets",
  // "total_tx_bytes",
  // "total_rx_bytes",
  // "Proton 1 MeV",
  // "Electron 2 MeV",
  // "Electron 800 KeV",
  // "last_valid_packet_timestamp",
];

const data = [];
columns.forEach((col) => {
  if (columns_to_ignore.findIndex((el) => el === col) === -1) {
    let temp = {};
    temp.name = col;
    temp.data = [];
    for (let i = 0; i < timestamps.length; i++) {
      const temp2 = {};
      temp2.x = timestamps[i];
      temp2.y = json_data.data.values[col]["individual_values"][i].toFixed(2);
      temp.data.push(temp2);
    }
    data.push(temp);
  }
});

const xAxisAnnotations = json_data.data.events.map((event) => {
  return {
    x: timestamps[event],
    strokeDashArray: 0,
    borderColor: "#775DD0",
  };
});

const options = {
  chart: {
    stacked: true,
    height: 280,
    type: "area",
    zoom: {
      autoScaleYaxis: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  // tooltip: false,
  xaxis: {
    type: "datetime",
  },
  annotations: {
    xaxis: xAxisAnnotations,
  },
};

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h2>Opssat1-short analysis with normalized values</h2>
        <div className="mixed-chart">
          <Chart options={options} series={data} type="area" width="1000" />
        </div>
      </div>
    </div>
  );
};

export default App;

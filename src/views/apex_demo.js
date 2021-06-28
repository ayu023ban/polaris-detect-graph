import React from "react";
import Chart from "react-apexcharts";
import json_data from "../assets/opssat_analysis.json";
import columns from "../assets/opssat_columns.json";
import { getCommon } from "../utils/helper";

const timestamps = json_data.data.timestamps.map((time) => {
  let temp = new Date(time);
  return temp.getTime();
});
const data = [
  {
    name: "positive",
    data: [],
  },
  { name: "negative", data: [] },
];
for (let i = 0; i < timestamps.length; i++) {
  let pos = 0;
  let neg = 0;
  columns.forEach((col) => {
    let temp = json_data.data.values[col]["individual_values"][i];
    if (temp > 0) {
      pos += temp;
    } else {
      neg += temp;
    }
  });
  data[0].data.push({ x: timestamps[i], y: pos.toFixed(2) });
  data[1].data.push({ x: timestamps[i], y: neg.toFixed(2) });
}

const events = json_data.data.events.map(
  (evt) => json_data.data.timestamps[evt]
);
const eventData = {};
columns.forEach((col) => {
  let common = getCommon(
    events,
    json_data.data.values[col]["individual_events_detected"]
  );
  if (common.length > 0) {
    eventData[col] = common.length;
  }
});
console.log(eventData);
const xAxisAnnotations = json_data.data.events.map((event) => {
  return {
    x: timestamps[event],
    strokeDashArray: 0,
    borderColor: "#FF0080",
  };
});

const options = {
  chart: {
    height: 280,
    type: "area",
    foreColor: "#ccc",
    zoom: {
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
  },
  colors: ["#00BAEC"],
  stroke: {
    width: 3,
  },
  grid: {
    borderColor: "#555",
    clipMarkers: false,
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      enabled: true,
      opacityFrom: 0,
      opacityTo: 1,
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    type: "datetime",
  },
  annotations: {
    xaxis: xAxisAnnotations,
  },
};

const eventOptions = {
  chart: {
    type: "polarArea",
    foreColor: "#ccc",
  },
  labels: Object.keys(eventData),
  stroke: {
    width: 1,
    colors: undefined,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0,
      },
      spokes: {
        strokeWidth: 0,
      },
    },
  },
  yaxis: { show: false },
  legend: {
    position: "bottom",
  },
};

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "spaceEvenly",
        alignItems: "center",
        background: "#000524",
        color: "white",
        flexDirection: "column",
      }}
    >
      <div>
        <h2>Opssat1-short analysis with normalized values</h2>
        <div className="mixed-chart">
          <Chart options={options} series={data} type="area" width="1000" />
        </div>
      </div>
      <div
        style={{
          marginTop: "10rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "3rem",
        }}
      >
        <div>
          <h2>Contributions of telemetry in events</h2>
          <div className="mixed-chart">
            <Chart
              options={eventOptions}
              series={Object.values(eventData)}
              type="polarArea"
              width={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";

import columns from "../assets/opssat_columns.json";
import json_data from "../assets/opssat_analysis.json";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const dataSource = {
  chart: {
    showlegend: 0,
    exportenabled: true,
  },
  caption: {
    text: "Opssat1-short analysis with normalized values",
  },
  subcaption: {
    text: "subcaption for it",
  },

  series: "telemetry",
  yaxis: [
    {
      plot: [
        {
          value: "value",
          type: "smooth-area",
          connectnulldata: true,
          // style: {
          //   plot: {
          //     "fill-opacity": "0.8",
          //   },
          // },
        },
      ],
      title: "Normalized value",
    },
  ],
  xaxis: {
    plot: "time",
    timemarker: json_data.data.events.map((evt) => {
      const marker = {
        start: json_data.data.timestamps[evt],
        type: "full",
        timeformat: "%Y-%m-%d %-I:%-M:%-S",
        label: "fdas fdskajl fsdajkl",
        style: {
          marker: {
            fill: "#D083FF",
          },
        },
      };
      return marker;
    }),
  },
};

const FusionDemo = () => {
  const [chartConfigs, setChartConfigs] = useState({
    type: "timeseries",
    renderAt: "container",
    width: "1200",
    height: "800",
    dataSource,
  });

  useEffect(() => {
    const schema = [
      { name: "time", type: "date" },
      { name: "telemetry", type: "string" },
      { name: "value", type: "number" },
    ];
    const data = [];

    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < json_data.data.timestamps.length; j++) {
        let temp = [];
        temp.push(json_data.data.timestamps[j]);
        temp.push(columns[i]);
        temp.push(json_data.data.values[columns[i]]["individual_values"][j]);
        data.push(temp);
      }
    }
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    );
    setChartConfigs({
      ...chartConfigs,
      dataSource: { ...dataSource, data: fusionTable },
    });
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default FusionDemo;

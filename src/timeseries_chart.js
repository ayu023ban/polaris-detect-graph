import { useEffect } from "react";
import "./App.css";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  AreaChart,
  Resizable,
} from "react-timeseries-charts";
import { TimeSeries } from "pondjs";

import json_data from "./assets/opssat_analysis.json";
import columns from "./assets/opssat_columns.json";

const timestamps = json_data.data.timestamps.map((time) => {
  let temp = new Date(time);
  return temp.getTime();
});

const data = [];
for (let i = 0; i < timestamps.length; i++) {
  let temp = [];
  temp.push(timestamps[i]);
  columns.forEach((col) => {
    temp.push(json_data.data.values[col]["individual_values"][i]);
  });
  data.push(temp);
}
const columnNames = ["time", ...columns];

const series = new TimeSeries({
  name: "series",
  columns: columnNames,
  points: data,
});



function TimeSeriesChart() {
  const cols = { up: columnNames, down: [] };
  const min = 0;
  const max = 130;
  const axisType = "linear";
  const interpolationType = "curveBasis";
    // const options = Object.keys(colorbrewer).map((c) => ({ value: c, label: c }));
  // const style = styler(columnNames, this.state.scheme);
  // const legendCategories = columnNames.map((d) => ({ key: d, label: d }));

  return (
    <div className="App">
      <header className="App-header">
        <div>LightSail-2 Anomaly Data</div>
        <div>
          <Resizable>
            <ChartContainer
              timeRange={series.range()}
              // onBackgroundClick={() => this.setState({ selection: null })}
            >
              <ChartRow height="350">
                <YAxis
                  id="value"
                  min={min}
                  max={max}
                  width="60"
                  type={axisType}
                />
                <Charts>
                  <AreaChart
                    axis="value"
                    // style={style}
                    series={series}
                    columns={cols}
                    fillOpacity={0.4}
                    interpolation={interpolationType}
                    // highlight={this.state.highlight}
                    // onHighlightChange={(highlight) =>
                    //   this.setState({ highlight })
                    // }
                    // selection={this.state.selection}
                    // onSelectionChange={(selection) =>
                    //   this.setState({ selection })
                    // }
                  />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
        </div>
      </header>
    </div>
  );
}

export default TimeSeriesChart;

import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import CanvasDemo from "./views/canvas_demo";
import ApexDemo from "./views/apex_demo";
import HomeView from "./views/home_view";
import FusionDemo from "./views/fusion_demo";
const CustomRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/polaris-detect-graph/" exact component={HomeView} />
        <Route
          path="/polaris-detect-graph/canvasjs"
          exact
          component={CanvasDemo}
        />
        <Route
          path="/polaris-detect-graph/apexcharts"
          exact
          component={ApexDemo}
        />
        <Route
          path="/polaris-detect-graph/fusioncharts"
          exact
          component={FusionDemo}
        />
      </Switch>
    </Router>
  );
};

export default CustomRouter;

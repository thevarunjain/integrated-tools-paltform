import React, { Component } from "react";
import "./viewPieChart.css";
import PieChartBuilds from "../pie_chart/index";

export default class ViewPieChartBuilds extends Component {
  render() {
    console.log("Props inside view pie chart: ", this.props);
    const { failedBuild, passedBuild } = this.props;
    const width = 260;
    const height = 260;
    return (
      <div id="viewPieChart" className="pane">
        <div className="header">Failure to Successs ratio for Builds</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChartBuilds
            failedBuild={failedBuild}
            passedBuild={passedBuild}
            width={width}
            height={height}
          />
        </div>
      </div>
    );
  }
}

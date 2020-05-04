import React, { Component } from "react";
import "./viewLineChart.css";
import LineChart from "../../line_chart/index";

export default class ViewLineChart extends Component {
  render() {
    const { user } = this.props,
      width = 1100,
      height = 250;
    return (
      <div id="viewLineChart" className="pane">
        <div className="header">User Activity</div>
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          <LineChart data={user} width={width} height={height} />
        </div>
      </div>
    );
  }
}

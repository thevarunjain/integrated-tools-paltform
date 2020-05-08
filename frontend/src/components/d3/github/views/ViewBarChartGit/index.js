import React, { Component } from "react";
import BarChart from "../../bar_chart";
import "./viewBarChart.css";

export default class ViewBarChart extends Component {
  render() {
    const { data } = this.props;
    return (
      <div id="viewBarChart" className="pane">
        <div className="header">Timeline of Builds</div>
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          <BarChart data={data} width={900} height={550} />
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./viewPieChart.css";
import PieChart from "../../pie_chart";

export default class ViewPieChart extends Component {
  render() {
    const { data } = this.props;
    const width = 260;
    const height = 260;
    return (
      <div id="viewPieChart" className="pane">
        <div className="header">Issues: Open and Closed</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart data={data} width={width} height={height} />
        </div>
      </div>
    );
  }
}

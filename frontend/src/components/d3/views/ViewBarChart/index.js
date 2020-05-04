import React, { Component } from "react";
import "./viewBarChart.css";

export default class ViewBarChart extends Component {
  render() {
    const { data } = this.props;
    return (
      <div id="viewBarChart" className="pane">
        <div className="header">Users contribution in project</div>
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          <BarChart data={data} width={1000} height={550} />
        </div>
      </div>
    );
  }
}

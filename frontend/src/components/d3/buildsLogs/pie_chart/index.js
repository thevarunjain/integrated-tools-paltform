import React, { Component } from "react";
import draw from "./draw";

export default class PieChartBuilds extends Component {
  componentDidMount() {
    console.log("Props inside pie Chart builds: ", this.props);
    draw(this.props);
  }

  componentDidUpdate(preProps) {
    draw(this.props);
  }

  render() {
    return <div className="draw-piechart" />;
  }
}

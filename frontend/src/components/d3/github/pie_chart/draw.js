import * as d3 from "d3";

const draw = (props) => {
  const data = props.data;
  const status = ["open", "closed"];
  let count = new Array(3).fill(0);
  data.forEach((d) => {
    let statusIndex = status.indexOf(d.status);
    if (statusIndex + 1) count[statusIndex] += 1;
  });

  const dataset = [
    { label: "Open", count: count[0] },
    { label: "Closed", count: count[1] },
  ];

  d3.select(".draw-piechart > *").remove();
  const margin = { top: 10, right: 20, bottom: 30, left: 40 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  let svg = d3
    .select(".draw-piechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (width / 2 + margin.left) +
        "," +
        (height / 2 + margin.top) +
        ")"
    );

  let radius = Math.min(width, height) / 2;

  let color = d3.scaleOrdinal().range(["tomato", "rgb(161,210,97)"]);

  let arc = d3.arc().innerRadius(0).outerRadius(radius);

  let pie = d3
    .pie()
    .value(function (d) {
      return d.count;
    })
    .sort(null);

  svg
    .selectAll("path")
    .data(pie(dataset))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d, i) {
      return color(d.data.label);
    });
  let legendG = svg
    .selectAll(".legend")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + (i * 70 - 100) + "," + 110 + ")";
    })
    .attr("class", "legend");

  legendG
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", function (d, i) {
      return color(i);
    });

  legendG
    .append("text")
    .text(function (d) {
      return d.data.label;
    })
    .style("font-size", 12)
    .attr("y", 10)
    .attr("x", 11);
};

export default draw;

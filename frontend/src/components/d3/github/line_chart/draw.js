import * as d3 from "d3";
import _ from "lodash";

const draw = (props) => {
  let data = [];
  if (props.data !== null) {
    data = _.cloneDeep(props.data.commits);
  }
  d3.select(".draw-linechart > *").remove();
  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;
  let svg = d3
    .select(".draw-linechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function (d) {
    d.date = d3.timeParse("%Y-%m-%d")(d.date);
    d.count = +d.count;
  });

  // Add X axis --> it is a date format
  let x = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.count;
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add the line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "rgba(198, 45, 205, 0.8)")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.count);
        })
    );

  //   svg
  //     .append("text")
  //     .attr("class", "x label")
  //     .attr("text-anchor", "end")
  //     .attr("x", width)
  //     .attr("y", height + 30)
  //     .text("Date");

  //   svg
  //     .append("text")
  //     .attr("class", "y label")
  //     .attr("text-anchor", "start")
  //     .attr("y", 1)
  //     .attr("dy", ".75em")
  //     .attr("transform", "rotate(-90)")
  //     .text("Number of Commits");
};

export default draw;

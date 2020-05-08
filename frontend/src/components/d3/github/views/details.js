import React, { Component } from "react";
import { Collapse, Tabs, Table } from "antd";
import axios from "axios";
import moment from "moment";
import data from "../data/index";
import ViewLineChartGit from "./ViewLineChartGit/index";
import CanvasJSReact from "../../../../canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const { TabPane } = Tabs;

export default class DetailsGit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { gitIssues, gitCommits, gitPullRequests, gitBranches } = this.props;

    var map = new Map();
    var sortedCommits = gitCommits.sort((a, b) => {
      return a.commitTime > b.commitTime ? 1 : -1;
    });

    sortedCommits.forEach((element) => {
      let aDateString = new Date(element.commitTime).toDateString();
      let aDate = new Date(aDateString);
      let aDateDate = aDate.toDateString();
      if (map.get(aDateDate)) {
        map.set(aDateDate, map.get(aDateDate) + 1);
      } else {
        map.set(aDateDate, 1);
      }
    });

    var options = {
      animationEnabled: true,
      animationDuration: 2000,
      exportEnabled: true,
      title: {
        text: "Activity",
      },
      axisX: {
        valueFormatString: "MMM-DD-YYYY",
      },
      axisY: {
        title: "Commits",
        includeZero: false,
      },
      data: [
        {
          yValueFormatString: "# Commits",
          xValueFormatString: "",
          type: "spline",
          dataPoints: [],
        },
      ],
    };

    map.forEach((value, key, map) => {
      let dataObj = {
        x: new Date(key),
        y: value,
      };
      options.data[0].dataPoints.push(dataObj);
    });

    const commitsColumns = [
      {
        title: "Author",
        dataIndex: "nameOfAuthor",
        key: "nameOfAuthor",
        width: "20%",
      },
      {
        title: "Commit Time",
        dataIndex: "commitTime",
        key: "commitTime",
        render: (time) => {
          return moment(time).format("MMMM Do YYYY");
        },
        width: "20%",
      },
      {
        title: "Commit Message",
        dataIndex: "commitMessage",
        key: "commitMessage",
        width: "35%",
      },
      {
        title: "Commit URL",
        dataIndex: "commitURL",
        key: "commitURL",
        render: (text) => (
          <span>
            <a target="blank" href={text}>
              Click
            </a>
          </span>
        ),
        width: "25%",
      },
    ];

    const issueColumns = [
      {
        title: "Issue Title",
        dataIndex: "issueTitle",
        key: "issueTitle",
        width: "20%",
      },
      {
        title: "Issued By",
        dataIndex: "issueBy",
        key: "issueBy",
        width: "20%",
      },
      {
        title: "Issue Created At",
        dataIndex: "issueCreatedAt",
        key: "issueCreatedAt",
        render: (time) => {
          return moment(time).format("MMMM Do YYYY");
        },
        width: "20%",
      },
      {
        title: "Issue Decription",
        dataIndex: "issueDescription",
        key: "issueDescription",
        width: "40%",
      },
    ];

    const pullRequestsColumns = [
      {
        title: "Title",
        dataIndex: "issueTitle",
        key: "issueTitle",
        width: "20%",
      },
      {
        title: "Issued By",
        dataIndex: "issueBy",
        key: "issueBy",
        width: "20%",
      },
      {
        title: "Created At",
        dataIndex: "issueCreatedAt",
        key: "issueCreatedAt",
        render: (time) => {
          let time1 = "May 7th 2020";
          let time2 = "May 6th 2020";
          console.log(
            "Time difference: ",
            new Date(time1) > new Date(time2),
            time
          );
          return moment(time).format("MMMM Do YYYY");
        },
        width: "20%",
      },
      {
        title: "Decription",
        dataIndex: "issueDescription",
        key: "issueDescription",
        width: "40%",
      },
    ];

    const branchesColumns = [
      {
        title: "Branch Commit Name",
        dataIndex: "branchName",
        key: "branchName",
        width: "40%",
      },
      {
        title: "Branch Commit URL",
        dataIndex: "branchCommitUrl",
        key: "branchCommitUrl",
        render: (text) => (
          <span>
            <a target="blank" href={text}>
              Click
            </a>
          </span>
        ),
        width: "60%",
      },
    ];

    return (
      <div id="viewBarChart" className="pane">
        <Tabs type="card">
          <TabPane tab="Branches" key="1">
            <Table
              columns={branchesColumns}
              dataSource={gitBranches}
              onChange={this.onBranchChange}
              size="default"
              scroll
            />
          </TabPane>
          <TabPane tab="Commits" key="2">
            <Table
              columns={commitsColumns}
              dataSource={gitCommits}
              onChange={this.onCommitsChange}
              size="default"
              scroll
            />
          </TabPane>
          <TabPane tab="Issues" key="3">
            <Table
              columns={issueColumns}
              dataSource={gitIssues}
              onChange={this.onIssuesChange}
              size="default"
              scroll
            />
          </TabPane>
          <TabPane tab="Pull Requests" key="4">
            <Table
              columns={pullRequestsColumns}
              dataSource={gitPullRequests}
              onChange={this.onPullRequestChange}
              size="default"
              scroll
            />
          </TabPane>
          <TabPane tab="Activity" key="5">
            <div style={{ padding: "12px" }}>
              {/* <p>x-axis: Day</p>
              <p>y-axis: Number of Commits</p> */}
            </div>
            {/* <ViewLineChartGit user={data[0]} /> */}
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

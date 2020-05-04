import React, { Component } from "react";
import { Collapse, Tabs, Table } from "antd";
import axios from "axios";
import moment from "moment";
import data from "../data/index";
import ViewLineChartGit from "./ViewLineChartGit/index";

const { TabPane } = Tabs;

export default class DetailsGit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { gitIssues, gitCommits, gitPullRequests, gitBranches } = this.props;

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
          <TabPane tab="User Activity" key="5">
            <div style={{ padding: "12px" }}>
              <p>x-axis: Days</p>
              <p>y-axis: Number of Commits</p>
            </div>
            <ViewLineChartGit user={data[0]} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

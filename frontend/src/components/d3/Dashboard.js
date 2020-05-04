import React, { Component } from "react";
import { Layout, Menu } from "antd";
import data from "./github/data";
import dataIssues from "./github/data/issues.js";
import ViewLineChart from "./github/views/ViewLineChartGit";
import "./dashboard.css";
import ViewBarChart from "./github/views/ViewBarChartGit/index";
import ViewPieChart from "./github/views/ViewPieChartGit/index";
import user from "../user.png";
import axios from "axios";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CodeFilled,
  GithubOutlined,
  ScheduleFilled,
  FileTextFilled,
} from "@ant-design/icons";
import DetailsJIRA from "./jira/views/details/details";
import DetailsGit from "./github/views/details";
import DetailsBuildsLogs from "./buildsLogs/details/details";

const { Header, Sider, Content, Footer } = Layout;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: data[0],
      collapsible: false,
      selectedTab: "1",
      allProjects: [],
      selectedProject: "",
      jiraAllBoards: "",
      detailsOfBoardsPresent: [],
      sprints: [],
      activeBoard: "",
      allIssues: [],
      branchDetails: [],
      commitHistory: [],
      allJobs: [],
      gitCommits: [],
      gitPullRequests: [],
      gitBranches: [],
      gitIssues: [],
    };
  }

  handleBoardChange = async (e) => {
    const { value } = e.target;
    this.setState({
      activeBoard: value,
    });
    let sprintsArray = [];
    if (value !== "") {
      let sprints = await axios.get(
        `http://52.53.117.75:8888/integratedTools/JIRA/ActiveSprintDetails/${value}`
      );

      if (
        (sprints.status === 200 || sprints.status === 304) &&
        sprints.data &&
        sprints.data !== "No Sprint present for the selected board" &&
        sprints.data.sprintDetails
      ) {
        let sprintDetails = sprints.data.sprintDetails;
        sprintDetails.map(async (sprint, index) => {
          let issues = await axios.get(
            `http://52.53.117.75:8888/integratedTools/JIRA/allIssues/${sprint.originBoardId}/${sprint.sprintId}`
          );
          if (
            (issues.status === 200 || issues.status === 304) &&
            issues.data &&
            issues.data !== "No Issues present in this Board" &&
            issues.data.allIssueDetails
          ) {
            let s = sprint;
            s.issues = issues.data.allIssueDetails;
            sprintsArray.push(s);
          }
        });
      }
      setTimeout(
        function () {
          //Start the timer
          this.setState({
            sprints: sprintsArray,
          }); //After 1 second, set render to true
        }.bind(this),
        1000
      );
      this.setState({
        sprints: sprintsArray,
      });
    } else {
      this.setState({
        sprints: [],
        activeBoard: "",
      });
    }
  };

  handleProjectChange = async (e) => {
    this.setState({
      selectedProject: e.target.value,
    });
    setTimeout(
      function () {
        this.getAllBoardsOfProject();
      }.bind(this),
      1000
    );
  };

  handleTabChange = (key) => {
    if (this.props !== undefined) {
      this.setState({
        selectedTab: key.key,
      });
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  getAllProjects = async () => {
    let allProjects = await axios.get(
      "http://52.53.117.75:8888/integratedTools/JIRA/allProjectDetails"
    );

    if (allProjects.status === 200 || allProjects.status === 304) {
      this.setState({
        allProjects: allProjects.data,
        selectedProject: allProjects.data[0],
      });
    }
    this.getAllBoardsOfProject();
  };

  getAllBoardsOfProject = async () => {
    let boards = [];
    let jiraAllBoards = await axios.get(
      "http://52.53.117.75:8888/integratedTools/JIRA/allBoardDetails"
    );
    if (jiraAllBoards.status === 200 || jiraAllBoards.status === 304) {
      if (jiraAllBoards.data && jiraAllBoards.data.detailsOfBoardsPresent) {
        jiraAllBoards.data.detailsOfBoardsPresent.map(async (b) => {
          if (b.nameOfTheProject === this.state.selectedProject) {
            let boardObject = {};
            boardObject = b;
            let sprints = await axios.get(
              `http://52.53.117.75:8888/integratedTools/JIRA/ActiveSprintDetails/${b.boardId}`
            );

            if (
              (sprints.status === 200 || sprints.status === 304) &&
              sprints.data &&
              sprints.data !== "No Sprint present for the selected board" &&
              sprints.data.sprintDetails
            ) {
              let sprintsArray = [];
              sprints.data.sprintDetails.map(async (sprint) => {
                let issuesInSprint = await axios.get(
                  `http://52.53.117.75:8888/integratedTools/JIRA/allIssues/${sprint.originBoardId}/${sprint.sprintId}`
                );
                if (
                  (issuesInSprint.status === 200 ||
                    issuesInSprint.status === 304) &&
                  issuesInSprint.data &&
                  issuesInSprint.data !== "No Issues present in this Board" &&
                  issuesInSprint.data.allIssueDetails
                ) {
                  let sprintObject = sprint;
                  let issuesArray = [];
                  issuesInSprint.data.allIssueDetails.map(async (issue) => {
                    let branchesDetails = await axios.get(
                      `http://52.53.117.75:8888/integratedTools/JIRA/branchDetails/${issue.keyAssociatedWithIssue}`
                    );

                    let issueObject = issue;

                    if (
                      (branchesDetails.status === 200 ||
                        branchesDetails.status === 304) &&
                      branchesDetails.data &&
                      branchesDetails.data !==
                        "No repositories attached found" &&
                      branchesDetails.data.branchDetails
                    ) {
                      issueObject.branchesDetails =
                        branchesDetails.data.branchDetails;
                    }

                    let commitDetails = await axios.get(
                      `http://52.53.117.75:8888/integratedTools/JIRA/commitDetails/${issue.keyAssociatedWithIssue}`
                    );

                    if (
                      (commitDetails.status === 200 ||
                        commitDetails.status === 304) &&
                      commitDetails.data &&
                      commitDetails.data !== "No repositories attached found" &&
                      commitDetails.data.commits
                    ) {
                      issueObject.commits = commitDetails.data.commits;
                    }

                    issuesArray.push(issueObject);
                  });
                  sprintObject.issues = issuesArray;
                  sprintsArray.push(sprintObject);
                }
              });
              boardObject.sprints = sprintsArray;
            }
            boards.push(boardObject);
          }
        });

        setTimeout(
          function () {
            this.setState({
              jiraAllBoards: boards,
            });
          }.bind(this),
          1000
        );
      }
    }
  };

  getAllJobs = async () => {
    let allJobs = await axios.get(`http://52.53.120.24:3000/jenkins/jobs`);
    let allJobsArray = [];
    let failedBuilds = 0,
      passedBuilds = 0;
    if (allJobs.status === 200 || allJobs.status === 304) {
      allJobs.data.jobs.map(async (job) => {
        let jobDetails = await axios.get(
          `http://52.53.120.24:3000/jenkins/jobs/${job.name}`
        );
        if (jobDetails.status === 200 || jobDetails.status === 304) {
          let job = {};
          let builds = [];
          job.name = jobDetails.data.name;
          job.url = jobDetails.data.url;

          let buildsData = jobDetails.data.builds;
          job.totalBuilds = jobDetails.data.builds
            ? jobDetails.data.builds.length
            : 0;
          buildsData.map(async (build) => {
            let buildDetails = await axios.get(
              `http://52.53.120.24:3000/jenkins/jobs/maven-project/builds/${build.number}`
            );
            let buildObject = {};
            if (buildDetails.status === 200 || buildDetails.status === 304) {
              buildObject.number = buildDetails.data.number;
              buildObject.cause = buildDetails.data.cause;
              buildObject.result = buildDetails.data.result;
              buildObject.timestamp = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(buildDetails.data.timestamp);
              buildObject.url = buildDetails.data.url;
              buildObject.totalTime = buildDetails.data.totaltime;

              if (buildDetails.data.result === "FAILURE") {
                failedBuilds += 1;
              } else if (buildDetails.data.result === "SUCCESS") {
                passedBuilds += 1;
              }
            }

            let buildLogDetails = await axios.get(
              `http://52.53.120.24:3000/jenkins/jobs/maven-project/builds/${build.number}/log`
            );
            if (
              buildLogDetails.status === 200 ||
              buildLogDetails.status === 304
            ) {
              buildObject.logs = buildLogDetails.data;
            }
            builds.push(buildObject);
          });
          job.builds = builds;
          job.failedBuilds = failedBuilds;
          job.passedBuilds = passedBuilds;
          passedBuilds = 0;
          failedBuilds = 0;
          allJobsArray.push(job);
        }
      });
    }
    setTimeout(
      function () {
        //Start the timer
        this.setState({
          allJobs: allJobsArray,
        }); //After 1 second, set render to true
      }.bind(this),
      1000
    );
  };

  getGithubData = async () => {
    let gitCommits = await axios.get(
      `http://54.219.215.34:8080/github/commits/thevarunjain/simple-java-maven-app`
    );

    if (gitCommits.status === 200 || gitCommits.status === 304) {
      this.setState({
        gitCommits: gitCommits.data.CommitDetails,
      });
    }

    let gitPullRequests = await axios.get(
      `http://54.219.215.34:8080/github/pullRequests/thevarunjain/simple-java-maven-app`
    );

    if (gitPullRequests.status === 200 || gitPullRequests.status === 304) {
      this.setState({
        gitPullRequests: gitPullRequests.data.CommitDetails,
      });
    }

    let gitIssues = await axios.get(
      `http://54.219.215.34:8080/github/issues/thevarunjain/simple-java-maven-app`
    );

    if (gitIssues.status === 200 || gitIssues.status === 304) {
      this.setState({
        gitIssues: gitIssues.data.CommitDetails,
      });
    }

    let gitBranches = await axios.get(
      `http://54.219.215.34:8080/github/branch/thevarunjain/simple-java-maven-app`
    );

    if (gitBranches.status === 200 || gitBranches.status === 304) {
      this.setState({
        gitBranches: gitBranches.data.branchDetails,
      });
    }
  };

  componentDidMount = async () => {
    this.getAllProjects();
    this.getAllJobs();
    this.getGithubData();
  };

  render() {
    const { allProjects } = this.state;
    let projectOptions = allProjects.map((project, index) => {
      return (
        <option key={index} value={project}>
          {project}
        </option>
      );
    });

    return (
      <Layout style={{ display: "flex", flexDirection: "column" }}>
        <nav
          class="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#282c34" }}
        >
          <a
            class="navbar-brand"
            href="#"
            style={{
              fontFamily: "sans-serif",
              fontWeight: "700",
              fontSize: "28px",
              color: "#29a3a3",
            }}
          >
            Integrated Dashboard
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div style={{ width: "20px" }}></div>
          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#" style={{ color: "white" }}>
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <div style={{ width: "30px" }}></div>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "white" }}>
                  About Us
                </a>
              </li>
              <div style={{ width: "30px" }}></div>
            </ul>

            <div
              className="dropdown"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "justify-center",
              }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-outline-light dropdown-toggle"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <UserOutlined />
                <span style={{ marginLeft: "5px", marginRight: "3px" }}>
                  My Account
                </span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              >
                <span style={{ padding: "8px" }}>Logout</span>
              </div>
            </div>
          </div>
        </nav>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{ minHeight: "100vh" }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              onClick={this.handleTabChange}
            >
              <Menu.Item key="1">
                <UserOutlined />
                <span>User</span>
              </Menu.Item>
              <Menu.Item key="2">
                <ScheduleFilled />
                <span>Tast Tracker</span>
              </Menu.Item>
              <Menu.Item key="3">
                <GithubOutlined />
                <span>Code Management</span>
              </Menu.Item>
              <Menu.Item key="4">
                <FileTextFilled />
                <span>Builds & Logs</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                marginBottom: "20px",
                marginTop: "40px",
                padding: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "justify-start",
                alignItems: "center",
              }}
            >
              <div>
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle,
                  }
                )}
              </div>
              <h5
                className="projects-heading"
                style={{
                  fontSize: "28px",
                  paddingTop: "10px",
                }}
              >
                Projects:
              </h5>
              <select
                onChange={this.handleProjectChange}
                style={{
                  height: "30px",
                  width: "300px",
                  marginLeft: "10px",
                  paddingBottom: "7px",
                }}
              >
                {projectOptions}
              </select>
            </Header>
            {this.state.selectedTab === "1" ? (
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                }}
              >
                {/* <Layout>Organization People</Layout> */}
                <h2>Organization People</h2>
                <ul class="list-group" style={{ width: "50%" }}>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Abhishek Konduri
                    <span class="badge badge-primary badge-pill">
                      {" "}
                      Authorized
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Varun Jain
                    <span class="badge badge-primary badge-pill">
                      {" "}
                      Authorized
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Rohan Kamat
                    <span class="badge badge-primary-not badge-pill">
                      {" "}
                      Not Authorized
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Jasnoor Brar
                    <span class="badge badge-primary-not badge-pill">
                      Not Authorized
                    </span>
                  </li>
                </ul>
              </Content>
            ) : (
              ""
            )}
            {this.state.selectedTab === "2" ? (
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
                  padding: 24,
                }}
              >
                <Layout>
                  <Content>
                    <DetailsJIRA
                      style={{ overflow: "scroll" }}
                      handleBoardChange={this.handleBoardChange}
                      {...this.state}
                    />
                    {/* <ViewBarChart data={data} /> */}
                  </Content>
                </Layout>
              </Content>
            ) : (
              ""
            )}{" "}
            {this.state.selectedTab === "3" ? (
              <Content
                style={{
                  margin: "24px 16px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItemsL: "center",
                  justifyContent: "center",
                }}
              >
                <Layout>
                  <DetailsGit {...this.state} />
                </Layout>
                {/* <Layout>
                  <Content>
                    <ViewPieChart data={dataIssues} />
                  </Content>
                </Layout> */}
              </Content>
            ) : (
              ""
            )}
            {this.state.selectedTab === "4" ? (
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItemsL: "center",
                  justifyContent: "center",
                }}
              >
                <Layout>
                  <DetailsBuildsLogs {...this.state} />
                </Layout>
                {/* <Layout>
                  <Content style={{ height: 300 }}>
                    <ViewPieChart data={dataIssues} />
                  </Content>
                </Layout> */}
              </Content>
            ) : (
              ""
            )}
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;

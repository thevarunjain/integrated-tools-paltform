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
    };
  }

  handleBoardChange = async (e) => {
    const { value } = e.target;
    console.log("e.target.value is: ", value);
    this.setState({
      activeBoard: value,
    });
    let sprintsArray = [];
    if (value !== "") {
      console.log("It shd enter here: ");
      let sprints = await axios.get(
        `http://localhost:8888/integratedTools/JIRA/ActiveSprintDetails/${value}`
      );

      if (
        (sprints.status === 200 || sprints.status === 304) &&
        sprints.data &&
        sprints.data !== "No Sprint present for the selected board" &&
        sprints.data.sprintDetails
      ) {
        console.log("It shd enter here as well: ");
        let sprintDetails = sprints.data.sprintDetails;
        sprintDetails.map(async (sprint, index) => {
          let issues = await axios.get(
            `http://localhost:8888/integratedTools/JIRA/allIssues/${sprint.originBoardId}/${sprint.sprintId}`
          );
          console.log("Entering late here");
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
      console.log("Entering first here");
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

  handleProjectChange = (e) => {
    this.setState({
      selectedProject: e.target.value,
    });
    this.getAllBoardsOfProject();
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
      "http://localhost:8888/integratedTools/JIRA/allProjectDetails"
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
      "http://localhost:8888/integratedTools/JIRA/allBoardDetails"
    );

    if (jiraAllBoards.status === 200 || jiraAllBoards.status === 304) {
      if (jiraAllBoards.data && jiraAllBoards.data.detailsOfBoardsPresent) {
        jiraAllBoards.data.detailsOfBoardsPresent.map((b) => {
          if (b.nameOfTheProject === this.state.selectedProject) {
            boards.push(b);
          }
        });
        this.setState({
          jiraAllBoards: boards,
        });
      }
    }
    this.getAllIssues();
  };

  getAllIssues = async () => {
    console.log("Jira all boards are: ", this.state.jiraAllBoards);
    if (this.state.jiraAllBoards.length > 0) {
      this.state.jiraAllBoards.map(async (board, index) => {
        let sprints = await axios.get(
          `http://localhost:8888/integratedTools/JIRA/ActiveSprintDetails/${board.boardId}`
        );
        if (
          (sprints.status === 200 || sprints.status === 304) &&
          sprints.data &&
          sprints.data !== "No Sprint present for the selected board" &&
          sprints.data.sprintDetails
        ) {
          let sprintDetails = sprints.data.sprintDetails;
          sprintDetails.map(async (sprint, idx) => {
            let issues = await axios.get(
              `http://localhost:8888/integratedTools/JIRA/allIssues/${sprint.originBoardId}/${sprint.sprintId}`
            );
            console.log("Entering late here");
            if (
              (issues.status === 200 || issues.status === 304) &&
              issues.data &&
              issues.data !== "No Issues present in this Board" &&
              issues.data.allIssueDetails
            ) {
              this.setState({
                allIssues: this.state.allIssues.concat(
                  issues.data.allIssueDetails
                ),
              });
            }
          });
        }
      });
    }
    setTimeout(
      function () {
        //Start the timer
        this.getBranchesInformation();
      }.bind(this),
      1000
    );
  };

  getBranchesInformation = async () => {
    const { allIssues } = this.state;
    console.log("Entwring in getAllBranches: ", allIssues.length);
    if (allIssues.length > 0) {
      allIssues.map(async (issue) => {
        let branches = await axios.get(
          `http://localhost:8888/integratedTools/JIRA/branchDetails/${issue.keyAssociatedWithIssue}`
        );
        console.log(branches);
        if (
          (branches.status === 200 || branches.status === 304) &&
          branches.data &&
          branches.data !== "No repositories attached found" &&
          branches.data.branchDetails
        ) {
          let b = {};
          b.branches = branches.data.branchDetails;
          b.issueId = issue.keyAssociatedWithIssue;
          this.setState({
            branchDetails: [...this.state.branchDetails, b],
          });
        }

        let commits = await axios.get(
          `http://localhost:8888/integratedTools/JIRA/commitDetails/${issue.keyAssociatedWithIssue}`
        );
        console.log("commits", commits);
        if (
          (commits.status === 200 || commits.status === 304) &&
          commits.data &&
          commits.data !== "No repositories attached found" &&
          commits.data.commits
        ) {
          let c = {};
          c.commits = commits.data.commits;
          c.issueId = issue.keyAssociatedWithIssue;
          this.setState({
            commitHistory: [...this.state.commitHistory, c],
          });
        }
      });
    }
  };

  getAllJobs = async () => {
    let allJobs = await axios.get(`http://localhost:3001/jenkins/jobs`);
    console.log("All jobs", allJobs);
    let allJobsArray = [];
    if (allJobs.status === 200 || allJobs.status === 304) {
      allJobs.data.jobs.map(async (job) => {
        let jobDetails = await axios.get(
          `http://localhost:3001/jenkins/jobs/${job.name}`
        );
        console.log("Job details: ", jobDetails);
        if (jobDetails.status === 200 || jobDetails.status === 304) {
          let job = {};
          let builds = [];
          job.name = jobDetails.data.name;
          job.url = jobDetails.url;

          let buildsData = jobDetails.data.builds;
          job.totalBuilds = jobDetails.data.builds
            ? jobDetails.data.builds.length
            : 0;
          let failedBuilds = 0,
            passedBuilds = 0;
          buildsData.map(async (build) => {
            let buildDetails = await axios.get(
              `http://localhost:3001/jenkins/jobs/maven-project/builds/${build.number}`
            );
            console.log("Build details", buildDetails);
            if (buildDetails.status === 200 || buildDetails.status === 304) {
              let build = {};
              build.number = buildDetails.data.number;
              build.cause = buildDetails.data.cause;
              build.result = buildDetails.data.result;
              build.timestamp = new Date(buildDetails.data.timestamp);
              build.url = buildDetails.data.url;
              build.totalTime = buildDetails.data.totalTime;
              builds.push(build);
              if (build.result === "FAILURE") {
                failedBuilds++;
              } else if (build.result === "SUCCESS") {
                passedBuilds++;
              }
            }
          });
          job.builds = builds;
          job.failedBuilds = failedBuilds;
          job.passedBuilds = passedBuilds;
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
      2000
    );
  };

  componentDidMount = async () => {
    this.getAllProjects();
    this.getAllJobs();
    // let jiraAllSprints = await axios.get(
    //   "http://localhost:8888/integratedTools/JIRA/ActiveSprintDetails/1"
    // );

    // let jiralAllIssues = await axios.get(
    //   "http://localhost:8888/integratedTools/JIRA/allIssues/1/1"
    // );
  };

  render() {
    const {
      selectedUser,
      jiraAllBoards,
      allProjects,
      selectedProject,
    } = this.state;
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
                <Layout>"User Information"</Layout>
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
                  minHeight: 280,
                }}
              >
                <Layout>
                  <Content>
                    <DetailsJIRA
                      data={jiraAllBoards}
                      selectedProject={selectedProject}
                      handleBoardChange={this.handleBoardChange}
                      {...this.state}
                    />
                  </Content>
                </Layout>
                <Layout>
                  <Content>
                    <ViewBarChart data={data} />
                  </Content>
                </Layout>
              </Content>
            ) : (
              ""
            )}{" "}
            {this.state.selectedTab === "3" ? (
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
                  <DetailsGit {...this.state} />
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
                  <DetailsGit {...this.state} />
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

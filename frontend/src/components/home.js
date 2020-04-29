import React, { Component } from "react";
import axios from "axios";
import user from "./user.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      commits: [],
      serverInfo: "",
      searchQuery: "",
      searchCriteria: "",
      downloads: "",
      logMessage: "",
      logGeneratedNotify: false,
      jenkinsJobs: [],
      issueDetails: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8013/integratedTools/github/IssueDetails/abhigithub911/Animation-Javascript-HTML-5-Canvas"
      )
      .then((res) => {
        console.log(res);
        this.setState({
          issues: res.data,
        });
      });
    axios.get("http://localhost:3005/serverinfo").then((res) => {
      this.setState({
        serverInfo: res.data,
      });
    });
    axios
      .get(
        "http://localhost:8013/integratedTools/github/noOfCommits/abhigithub911/Animation-Javascript-HTML-5-Canvas"
      )
      .then((res) => {
        console.log(res);
        this.setState({
          commits: res.data,
        });
      });
    axios
      .get(
        "http://localhost:8013/integratedTools/github/noOfDownloads/abhigithub911/Animation-Javascript-HTML-5-Canvas"
      )
      .then((res) => {
        console.log(res);
        this.setState({
          downloads: res.data,
        });
      });
    axios
      .get("http://localhost:8888/integratedTools/JIRA/IssueDetails")
      .then((res) => {
        console.log("Issue details in sprint", res.data);
        this.setState({
          issueDetails: res.data,
        });
      });
  }

  handleSearchCriteria = (e) => {
    this.setState({
      searchCriteria: e.target.value,
    });
  };

  handleSearchQuery = (e) => {
    e.preventDefault();
    let data = {
      start_time: this.state.searchCriteria,
    };
    axios.post(`http://localhost:3005/search/json`, data).then((res) => {
      console.log(res);
      this.setState({
        searchQuery: res.data,
      });
    });
  };

  handleEventGeneratorInput = (e) => {
    this.setState({
      logMessage: e.target.value,
    });
  };

  handleEventGeneratorSubmit = (e) => {
    e.preventDefault();
    let data = {
      message: this.state.logMessage,
    };
    axios.post(`http://localhost:3005/EventGenerator`, data).then((res) => {
      console.log(res);
      this.setState({
        logGeneratedNotify: true,
      });
    });
  };

  hanldeJenkinsStatus = () => {
    axios.get("http://13.57.137.114:3000/jenkins/getstatus").then((res) => {
      alert(res.data);
      window.location.reload(1);
    });
  };

  handleViewJenkinsJobs = () => {
    axios.get("http://13.57.137.114:3000/jenkins/getjobs").then((res) => {
      console.log("Jenkins Jobs ", res);
      this.setState({
        jenkinsJobs: res.data.jobs,
      });
    });
  };

  handleTriggerJob = (name) => {
    axios
      .post(`http://13.57.137.114:3000/jenkins/trigger?name=${name}`)
      .then((res) => {
        alert(res.data);
      });
  };

  render() {
    let issues = this.state.issues.map((issue) => {
      return <div>{issue}</div>;
    });

    let jobsTableContent = this.state.jenkinsJobs.map((job) => {
      return (
        <tr style={{ textAlign: "center" }}>
          <td>{job.name}</td>
          <td>{job.url}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleTriggerJob(job.name)}
            >
              Trigger
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <nav
          class="navbar navbar-expand-lg navbar-light bg-light"
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
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <div style={{ width: "30px" }}></div>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About Us
                </a>
              </li>
              <div style={{ width: "30px" }}></div>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Help
                </a>
              </li>
            </ul>

            <div className="dropdown">
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
                  color: "black",
                }}
              >
                <img src={user} style={{ width: "30px" }}></img>
                <div style={{ width: "5px" }}></div>
                <span>My Account</span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              ></div>
            </div>
          </div>
        </nav>
        <div className="main-container">
          <div
            className="main-container-content"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "50px",
              }}
            >
              <h1 style={{ color: "#F2AA4CFF" }}>Project:</h1>
              <h2 style={{ marginLeft: "10px", color: "#f5f5eb" }}>
                Animation-Javascript-HTML-5-Canvas
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "stretch",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <div
                class="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h5
                    class="card-header"
                    style={{
                      color: "#29a3a3",
                      textAlign: "left",
                      textDecoration: "underline",
                      backgroundColor: "#e6e6e6",
                      fontWeight: "600",
                    }}
                  >
                    JIRA Board
                  </h5>
                  <div style={{ padding: "20px" }}>
                    <h6 class="card-title" style={{ color: "#b30000" }}>
                      Sprints:
                    </h6>
                    <div style={{ marginTop: "4px" }}>
                      <p style={{ color: "#282c34" }}>
                        https://jira.board/sprints/32
                      </p>
                      <p style={{ color: "#282c34" }}>
                        https://jira.board/sprints/35
                      </p>
                      <p style={{ color: "#282c34" }}>
                        https://jira.board/sprints/41
                      </p>
                      <p style={{ color: "#282c34" }}>
                        https://jira.board/sprints/46
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <button
                    type="button"
                    className="btn btn-primary card-button"
                    data-toggle="modal"
                    data-target="#exampleModal5"
                  >
                    IntegratedToolsDashboard
                  </button>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal5"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModal5Label"
                  aria-hidden="true"
                  style={{ opacity: "1" }}
                >
                  <div
                    class="modal-dialog modal-dialog-scrollable"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5
                          class="modal-title"
                          id="exampleModalCenteredLabel"
                          style={{ color: "black" }}
                        >
                          Issues in Sprint
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style={{ color: "black" }}>
                        <table class="table">
                          <thead class="thead-dark">
                            <tr>
                              <th>#</th>
                              <th>Issue Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Cors Implementation</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>Configure File</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h5
                    class="card-header"
                    style={{
                      color: "#29a3a3",
                      textAlign: "left",
                      textDecoration: "underline",
                      backgroundColor: "#e6e6e6",
                      fontWeight: "600",
                    }}
                  >
                    Github
                  </h5>
                  <div style={{ padding: "20px" }}>
                    <h6 class="card-title" style={{ color: "#b30000" }}>
                      Latest Issues:
                    </h6>
                    {/* <p style={{ color: "black" }}>{issues}</p> */}
                    <div style={{ marginTop: "4px" }}>
                      <p style={{ color: "#282c34" }}>
                        https://github.com/brar24/issues/3123
                      </p>
                      <p style={{ color: "#282c34" }}>
                        https://github.com/brar24/issues/3224
                      </p>
                      <p style={{ color: "#282c34" }}>
                        https://github.com/brar24/issues/3243
                      </p>
                      <p style={{ color: "#282c34" }}>
                        https://github.com/brar24/issues/3245
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModal2"
                    className="btn btn-primary card-button"
                  >
                    View Commit History
                  </button>
                  <div style={{ height: "15px" }}></div>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModal4"
                    className="btn btn-primary card-button"
                  >
                    View Downloads
                  </button>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal2"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModal2Label"
                  aria-hidden="true"
                  style={{ opacity: "1" }}
                >
                  <div
                    class="modal-dialog modal-dialog-scrollable"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5
                          class="modal-title"
                          id="exampleModalCenteredLabel"
                          style={{ color: "black" }}
                        >
                          Commit History
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style={{ color: "black" }}>
                        Number of Commits: 239
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal4"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModal4Label"
                  aria-hidden="true"
                  style={{ opacity: "1" }}
                >
                  <div
                    class="modal-dialog modal-dialog-scrollable"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5
                          class="modal-title"
                          id="exampleModalCenteredLabel"
                          style={{ color: "black" }}
                        >
                          Repository Downloads
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style={{ color: "black" }}>
                        Number of Downloads: 12
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "stretch",
                width: "100%",
                marginTop: "80px",
                flexWrap: "wrap",
              }}
            >
              <div
                class="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h5
                    class="card-header"
                    style={{
                      color: "#29a3a3",
                      textAlign: "left",
                      textDecoration: "underline",
                      backgroundColor: "#e6e6e6",
                      fontWeight: "600",
                    }}
                  >
                    Jenkins
                  </h5>
                  <div style={{ padding: "20px" }}>
                    <h6 class="card-title" style={{ color: "#b30000" }}>
                      Latest Build results:
                    </h6>
                    <div style={{ color: "#282c34" }}>
                      <p>Started by user anonymous</p>
                      <p>
                        [Pipeline] Allocate node: <strong>Start</strong>
                      </p>
                      <p>
                        Running on <strong>master</strong> in
                        /tmp/example/workspace
                      </p>
                      <p>[Pipeline] node</p>
                      <p>[Pipleine] sh</p>
                      <p>
                        [<strong>test</strong>] Running shell script +{" "}
                        <strong>exit</strong> 1
                      </p>
                      <p>[Pipeline] echo</p>
                      <strong> RESULT FAILURE</strong>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <button
                    type="btn"
                    className="btn btn-primary card-button"
                    onClick={this.hanldeJenkinsStatus}
                  >
                    View Jenkins Status
                  </button>
                  <div style={{ height: "15px" }}></div>
                  <button
                    type="btn"
                    className="btn btn-primary card-button"
                    onClick={this.handleViewJenkinsJobs}
                  >
                    View All Jobs
                  </button>
                  <div style={{ height: "15px" }}></div>
                  <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <table class="table table-striped ">
                      <thead className="thead-dark">
                        <tr>
                          <th>Job Name</th>
                          <th>URL</th>
                          <th>Trigger Job</th>
                        </tr>
                      </thead>
                      <tbody>{jobsTableContent}</tbody>
                    </table>
                    )
                  </div>
                </div>
              </div>
              <div
                class="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h5
                    class="card-header"
                    style={{
                      color: "#29a3a3",
                      textAlign: "left",
                      textDecoration: "underline",
                      backgroundColor: "#e6e6e6",
                      fontWeight: "600",
                    }}
                  >
                    Splunk
                  </h5>
                  <div style={{ padding: "20px" }}>
                    <h6 class="card-title" style={{ color: "#b30000" }}>
                      Alert Logs:
                    </h6>
                    <div style={{ color: "#282c34" }}>
                      <p>
                        {"sender"}: "michael" {"recipient"}:{"name"}:"michael",
                        "name":"andrea", "name":"itay" "subject":"i heart logs"
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "20px",
                  }}
                >
                  <button
                    type="button"
                    class="btn btn-primary card-button"
                    data-toggle="modal"
                    data-target="#exampleModal3"
                  >
                    Generate an Event
                  </button>
                  <div
                    class="modal fade"
                    id="exampleModal3"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModal3Label"
                    aria-hidden="true"
                    style={{ opacity: "1" }}
                  >
                    <div
                      class="modal-dialog modal-dialog-scrollable"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id="exampleModalCenteredLabel"
                            style={{ color: "black" }}
                          >
                            Event Generator
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body" style={{ color: "black" }}>
                          <form
                            onSubmit={this.handleEventGeneratorSubmit}
                            style={{ width: "100%" }}
                          >
                            <div className="form-froup">
                              <label
                                style={{
                                  fontSize: "16px",
                                  fontFamily: "Gill Sans,sans-serif",
                                  color: "black",
                                }}
                              >
                                Message<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                required
                                id="searchCriteria"
                                placeholder="Enter Log Message"
                                className="form-control"
                                onChange={this.handleEventGeneratorInput}
                              ></input>
                            </div>
                            <div style={{ height: "15px" }}></div>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{
                                color: "white",
                                backgroundColor: "#29a3a3",
                                width: "100%",
                              }}
                            >
                              Submit
                            </button>
                            <div style={{ height: "25px" }}></div>
                            <div style={{ border: "1px solid #eee" }}>
                              {this.state.logGeneratedNotify ? (
                                <div
                                  style={{
                                    backgroundColor: "#e6ffff",
                                    color: "black",
                                    textAlign: "center",
                                  }}
                                >
                                  Log Generated!
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: "15px" }}></div>

                  <button
                    type="button"
                    class="btn btn-primary card-button"
                    data-toggle="modal"
                    data-target="#exampleModal1"
                  >
                    View Server Info
                  </button>
                  <div
                    class="modal fade"
                    id="exampleModal1"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModal1Label"
                    aria-hidden="true"
                    style={{ opacity: "1" }}
                  >
                    <div
                      class="modal-dialog modal-dialog-scrollable"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id="exampleModalCenteredLabel"
                            style={{ color: "black" }}
                          >
                            Server Info
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body" style={{ color: "black" }}>
                          {this.state.serverInfo}
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: "15px" }}></div>

                  <button
                    type="button"
                    class="btn btn-primary card-button"
                    data-toggle="modal"
                    data-target="#exampleModal6"
                  >
                    Enter Search Query
                  </button>
                  <div
                    class="modal fade"
                    id="exampleModal6"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModal6Label"
                    aria-hidden="true"
                    style={{ opacity: "1" }}
                  >
                    <div
                      class="modal-dialog modal-dialog-scrollable"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id="exampleModalCenteredLabel"
                            style={{ color: "black" }}
                          >
                            Search Query
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body" style={{ color: "black" }}>
                          <form
                            onSubmit={this.handleSearchQuery}
                            style={{ width: "100%" }}
                          >
                            <div className="form-group">
                              <label
                                style={{
                                  fontSize: "16px",
                                  fontFamily: "Gill Sans,sans-serif",
                                  color: "black",
                                }}
                              >
                                Search<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                required
                                id="searchCriteria"
                                placeholder="Enter Search Criteria"
                                className="form-control"
                                onChange={this.handleSearchCriteria}
                              ></input>
                            </div>
                            <div style={{ height: "15px" }}></div>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{
                                color: "white",
                                backgroundColor: "#29a3a3",
                                width: "100%",
                              }}
                            >
                              Submit
                            </button>
                            <div style={{ height: "25px" }}></div>
                            <div style={{ border: "1px solid #eee" }}>
                              {this.state.searchQuery}
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

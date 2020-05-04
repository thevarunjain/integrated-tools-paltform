import React, { Component } from "react";
import { Collapse, Modal, Input } from "antd";
import axios from "axios";
import moment from "moment";

const { Panel } = Collapse;
const { TextArea } = Input;

export default class DetailsBuildsLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildSuccess: false,
      selectedBuildForLogs: "",
      visible: false,
      logs: "",
    };
  }

  handleViewLogs = (e, logs) => {
    e.preventDefault();
    this.setState({
      visible: true,
      logs: logs,
    });
  };

  handleOk = async (e) => {
    e.preventDefault();
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      visible: false,
      logs: "",
    });
  };

  handleBuildJob = async (e, jobName) => {
    let buildJob = await axios.post(``);
  };

  render() {
    const { allJobs } = this.props;
    console.log("All jobs ", allJobs);

    let jobsContent = allJobs.map((job, index) => {
      let builds = job.builds;
      return (
        <Collapse style={{ fontSize: "20px" }} accordion>
          <Panel header={"Job: " + job.name} key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "justify-start",
              }}
            >
              <a
                href={job.url}
                target="blank"
                style={{
                  textDecoration: "underline",
                  fontSize: "16px",
                  padding: "6px",
                  color: "#80b6bc",
                  fontWeight: "500",
                }}
              >
                Go to Job URL
              </a>
              <button
                className="btn build-button"
                style={{ marginLeft: "10px", marginBotton: "5px" }}
                onClick={(e) => this.handleBuildJob(e, job.name)}
              >
                Build Job
              </button>
            </div>
            <div>
              <br />
              <h5 style={{ padding: "6px" }}>Build Information</h5>
              {builds.map((build, idx) => {
                return (
                  <Collapse style={{ fontSize: "20px" }} accordion>
                    <Panel header={"Build: " + build.number} key={index}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "justify-start",
                        }}
                      >
                        <a
                          href={build.url}
                          target="blank"
                          style={{
                            textDecoration: "underline",
                            fontSize: "16px",
                            padding: "6px",
                            color: "#80b6bc",
                            fontWeight: "500",
                          }}
                        >
                          Go to Build URL
                        </a>
                        <button
                          className="btn build-button"
                          style={{ marginLeft: "10px", marginBotton: "5px" }}
                          onClick={(e) => this.handleViewLogs(e, build.logs)}
                        >
                          View Logs
                        </button>
                      </div>
                      <br />
                      <p>Result: {build.result}</p>
                      <p>Cause: {build.cause}</p>
                      <p>
                        Build started:{" "}
                        {moment(new Date(build.timestamp)).format(
                          "MMMM Do YYYY"
                        )}
                      </p>
                      <p>
                        Total Build Time: {Math.round(build.totalTime / 60, 2)}{" "}
                        minutes
                      </p>
                      <p></p>
                    </Panel>
                  </Collapse>
                );
              })}
            </div>
          </Panel>
        </Collapse>
      );
    });

    return (
      <div id="viewBarChart" className="pane">
        <div className="header">All Jobs</div>
        <div
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {jobsContent}
        </div>
        <Modal
          title="Logs"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable
          okText="Done"
          cancelText="Cancel"
          style={{ position: "relative" }}
        >
          {this.state.logs ? (
            <div>
              <p>
                <a target="blank" href={this.state.logs.log}>
                  Go to log
                </a>
              </p>
              <br />
              <p>Commit Message: {this.state.logs.commitMessage}</p>
              <br />
              <p>Tests Run: {this.state.logs["Tests run"]}</p>
              <br />
              <p>Skipped: {this.state.logs.Skipped}</p>
              <br />
              <p>Errors: {this.state.logs.Errors}</p>
              <br />
              <p>Failures: {this.state.logs.Failures}</p>
              <br />
              <p>Build Time: {this.state.logs.buildTime} seconds</p>
            </div>
          ) : (
            ""
          )}
        </Modal>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Collapse, Modal, Input, message } from "antd";
import axios from "axios";
import moment from "moment";
import PieChartBuilds from "../pie_chart/index";
import ViewPieChartBuilds from "../views/index";
import ViewBarChart from "../../github/views/ViewBarChartGit";
import data from "../../github/data/index";
import JSONPretty from "react-json-pretty";

const { Panel } = Collapse;
const { TextArea } = Input;

export default class DetailsBuildsLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBuildForLogs: "",
      visible: false,
      logs: "",
      logsJSON: "",
    };
  }

  handleViewLogs = (e, logs) => {
    e.preventDefault();
    console.log("Logs and JSON strigify: ", logs, JSON.stringify(logs));
    this.setState({
      visible: true,
      logs: logs,
      logsJSON: JSON.stringify(logs),
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
    let buildJob = await axios.post(
      `http://52.53.120.24:3000/jenkins/build/${jobName}`
    );
    if (buildJob.status === 200 || buildJob.status === 304) {
      message.success("Build has been started.");
    }
  };

  handleJobCollpase = () => {
    this.forceUpdate();
  };

  render() {
    const { allJobs } = this.props;

    let graphs = [];

    allJobs.map((job) => {
      let builds = job.builds;
      let failedBuild = 0,
        passedBuild = 0;
      builds.map((build) => {
        if (build.result === "FAILURE") {
          failedBuild++;
        } else {
          passedBuild++;
        }
      });

      graphs.push(
        <ViewPieChartBuilds
          failedBuild={failedBuild}
          passedBuild={passedBuild}
        ></ViewPieChartBuilds>
      );
    });

    let jobsContent = allJobs.map((job, index) => {
      let builds = job.builds;
      let failedBuild = 0,
        passedBuild = 0;
      builds.map((build) => {
        if (build.result === "FAILURE") {
          failedBuild++;
        } else {
          passedBuild++;
        }
      });

      return (
        <Collapse
          style={{ fontSize: "20px" }}
          accordion
          onClick={this.handleJobCollpase}
        >
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
                Job URL
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
                          Build URL
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
                        seconds
                      </p>
                      <p></p>
                    </Panel>
                  </Collapse>
                );
              })}
            </div>
            <br />
            {graphs[index]}
            <ViewBarChart data={data} />
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
              <JSONPretty
                id="json-pretty"
                data={this.state.logsJSON}
              ></JSONPretty>
            </div>
          ) : (
            ""
          )}
        </Modal>
      </div>
    );
  }
}

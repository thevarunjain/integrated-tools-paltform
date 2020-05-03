import React, { Component } from "react";
import { Layout, Menu } from "antd";
import data from "./github/data";
import dataIssues from "./github/data/issues.js";
import ViewLineChart from "./github/views/ViewLineChart";
import "./dashboard.css";
import ViewBarChart from "./github/views/ViewBarChart/index";
import ViewPieChart from "./github/views/ViewPieChart/index";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CodeFilled,
  GithubOutlined,
  ScheduleFilled,
  FileTextFilled,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: data[0],
      collapsible: false,
      selectedTab: "1",
    };
  }

  handleTabChange = (key) => {
    if (this.props !== undefined) {
      console.log("printing key: ", key.key);
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

  componentDidMount = async () => {};

  render() {
    const { selectedUser } = this.state;
    return (
      //   <Layout style={{ height: 920 }}>
      //     <Sider width={300} style={{ backgroundColor: "#eee" }}>
      //     </Sider>
      //     <Layout>
      //       <Content style={{ height: 300 }}>
      //         <ViewLineChart user={selectedUser} />
      //       </Content>
      //     </Layout>
      //     <Layout style={{ height: 600 }}>
      //       <Content>
      //         <ViewBarChart data={data} />
      //       </Content>
      //     </Layout>
      //   </Layout>
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
              <span>JIRA</span>
            </Menu.Item>
            <Menu.Item key="3">
              <GithubOutlined />
              <span>GitHub</span>
            </Menu.Item>
            <Menu.Item key="4">
              <CodeFilled />
              <span>Jenkins</span>
            </Menu.Item>
            <Menu.Item key="5">
              <FileTextFilled />
              <span>Splunk</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
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
                <Content style={{ height: 300 }}>
                  <ViewPieChart data={dataIssues} />
                </Content>
              </Layout>
              <Layout>
                <Content style={{ height: 300 }}>
                  <ViewLineChart user={selectedUser} />
                </Content>
              </Layout>
              <Layout style={{ height: 600 }}>
                <Content>
                  <ViewBarChart data={data} />
                </Content>
              </Layout>
            </Content>
          ) : (
            ""
          )}
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
                <Content style={{ height: 300 }}>
                  <ViewLineChart user={selectedUser} />
                </Content>
              </Layout>
              <Layout style={{ height: 600 }}>
                <Content>
                  <ViewBarChart data={data} />
                </Content>
              </Layout>
            </Content>
          ) : (
            ""
          )}
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;

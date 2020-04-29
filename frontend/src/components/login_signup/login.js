import React, { Component } from "react";
import { Link } from "react-router-dom";
import bannerImg from "./banner-img.png";
import "./styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      eamil: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <section
        className="login-block background-design"
        style={{ minHeight: "100vh" }}
      >
        <div className="background"></div>
        <div className="container foreground">
          <div
            class="row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            {/* <div class="banner-sec">
              <div class="card">
                <img
                  class="card-img"
                  height="500"
                  width="300"
                  src={bannerImg}
                  alt="Card image"
                />
              </div>
            </div> */}
            <div class="col-md-6 login-sec" height="500" width="300">
              <h3
                class="myh3"
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "800",
                  fontSize: "40px",
                  color: "#f5f5eb",
                  textAlign: "center",
                  marginBottom: "46px",
                }}
              >
                Login
              </h3>
              <form class="login-form">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    autoFocus
                    value={email}
                    onChange={this.onChange}
                    placeholder="Enter github email."
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    required
                    value={password}
                    onChange={this.onChange}
                    placeholder="Enter github password."
                  />
                </div>

                <br />
                <br />
                <button
                  type="submit"
                  style={{ border: "none" }}
                  class="btn btn-secondary btn-lg btn-block form-control button-design"
                  onClick={this.onChange}
                >
                  Log In
                </button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ marginTop: "20px" }}>
                    <a
                      className="forgot-password"
                      href="#"
                      style={{
                        textAlign: "left",
                        color: "#f5f5eb",
                        fontWeight: "500",
                      }}
                    >
                      Forgot Password?{" "}
                    </a>
                  </div>
                  <div>
                    <a
                      className="forgot-password"
                      href="#"
                      style={{
                        textAlign: "left",
                        color: "#f5f5eb",
                        fontWeight: "500",
                        textDecoration: "underline",
                      }}
                    >
                      New?Register Now!
                    </a>
                  </div>
                  <div
                    class="form-check"
                    style={{ color: "#f5f5eb", fontWeight: "500" }}
                  >
                    <input type="checkbox" class="form-check-input" />
                    <small>Keep me signed in</small>
                  </div>
                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;

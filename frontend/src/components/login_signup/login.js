import React, { Component } from "react";
import { Link } from "react-router-dom";
import bannerImg from "./banner-img.png";
import "./styles.css";

import { signUpWithCredentials } from "../Firebase";
var firebase = require("firebase/app");
require("firebase/auth");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      eamil: "",
    };
  }

  onChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    e.preventDefault();

    var email = this.state.email;
    var password = this.state.password;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        this.props.history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.message);
      });
    console.log("Login up done");
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
                    // onChange={this.onChange}
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                    }}
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    required
                    value={password}
                    // onChange={this.onChange}
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                    placeholder="Password"
                  />
                </div>

                <br />
                <br />
                <button
                  type="submit"
                  style={{ border: "none" }}
                  class="btn btn-secondary btn-lg btn-block form-control button-design"
                  // onClick={this.onChange}
                  onClick={this.login}
                >
                  Log In
                </button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "justify-center",
                  }}
                >
                  <div style={{ marginTop: "20px" }}></div>
                  <br />
                  <br />
                  <br />
                  <div>
                    <a
                      className="forgot-password"
                      href="/signup"
                      style={{
                        textAlign: "center",
                        color: "#f5f5eb",
                        fontWeight: "500",
                        textDecoration: "underline",
                      }}
                    >
                      New ? Register Now!
                    </a>
                  </div>
                  <div
                    class="form-check"
                    style={{ color: "#f5f5eb", fontWeight: "500" }}
                  ></div>
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

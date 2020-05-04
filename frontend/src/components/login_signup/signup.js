import React, { Component } from "react";
import { Link } from "react-router-dom";
import bannerImg from "./banner-img.png";
import "./styles.css";
import { signUpWithCredentials } from "../Firebase";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      password: "",
      email: "",
      org : "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signup = (e) =>{
    e.preventDefault();
    signUpWithCredentials(this.state.email, this.state.password);
    console.log("Sign up done");
  }

  render() {
    const { name, email, password, password2 } = this.state;
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
                Sign Up 
              </h3>
              <form class="login-form">
                <div className="row">
                  <div class="col-md-6 form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="fname"
                      autoFocus
                      // onChange={this.onChange}
                      onChange = {(event) => {this.setState({ fname : event.target.value })}} 
                      placeholder="First Name"
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <input
                      type="text"
                      // onChange={this.onChange}
                      onChange = {(event) => {this.setState({ lname : event.target.value })}} 
                      name="lname"
                      class="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="email"
                    // onChange={this.onChange}
                    onChange = {(event) => {this.setState({ email : event.target.value })}} 
                    placeholder="Email Address"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    // onChange={this.onChange}
                    onChange = {(event) => {this.setState({ password : event.target.value })}} 
                    placeholder="Password (min 6 characters)"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="org"
                    // onChange={this.onChange}
                    onChange = {(event) => {this.setState({ org : event.target.value })}} 
                    placeholder="Organization"
                  />
                </div>

                <br />
                <br />
                <button
                  type="submit"
                  style={{ border: "none" }}
                  class="btn btn-secondary btn-lg btn-block form-control button-design"
                  onClick={this.signup}>
                  Confirm
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
                    {/* <a
                      className="forgot-password"
                      href="#"
                      style={{
                        textAlign: "left",
                        color: "#f5f5eb",
                        fontWeight: "500",
                      }}
                    >
                      Forgot Password?{" "}
                    </a> */}
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
                      Already member ? Login Now!
                    </a>
                  </div>
                  <div
                    class="form-check"
                    style={{ color: "#f5f5eb", fontWeight: "500" }}
                  >
                    {/* <input type="checkbox" class="form-check-input" /> */}
                    {/* <small>Keep me signed in</small> */}
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

export default Signup;

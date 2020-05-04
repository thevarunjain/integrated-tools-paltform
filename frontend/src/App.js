import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "../src/components/home";
import "./App.css";
import Dashboard from "./components/d3/Dashboard";
import "antd/dist/antd.css";
import Login from "./components/login_signup/login";
import Signup from "./components/login_signup/signup";

function App() {


  localStorage.setItem("Abhishek Konduri", true);
  localStorage.setItem("Varun Jain", true);
  localStorage.setItem("Rohan Kamat", false);
  localStorage.setItem("Jasnoor", false);
  
  console.log(localStorage.getItem("Hello"));

  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </BrowserRouter>
  );
}

export default App;

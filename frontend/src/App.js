import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "../src/components/home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/login/Login.js";
import { Signup } from "./components/signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import "./App.css";

import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Button>Test</Button>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
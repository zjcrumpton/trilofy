import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route path="/dashboard" component={Dashboard} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

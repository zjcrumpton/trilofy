import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import { StreamingProvider } from "./contexts/streamingContext";
import getCookie from "./utilities/cookies";

class App extends React.Component {
  state = {
    currentStreamingPlatform: "spotify",
    setStreamingPlatform: (streamingPlatform) => {
      this.setState({ currentStreamingPlatform: streamingPlatform });
    },
    spotifyLoggedIn: spotifyLoggedIn(),
    updateSpotifyLogin: (value) => {
      this.setState({ spotifyLoggedIn: value });
    },
  };

  render() {
    return (
      <div className="App">
        <StreamingProvider value={this.state}>
          <Router>
            <Switch>
              <Route exact path="/" component={Authentication} />
              <Route path="/dashboard" component={Dashboard} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Router>
        </StreamingProvider>
      </div>
    );
  }
}

const spotifyLoggedIn = () => {
  return getCookie("spotifyAccess") && getCookie("spotifyAccess") !== "expired"
    ? true
    : false;
};

export default App;

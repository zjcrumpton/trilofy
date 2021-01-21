import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import { StreamingProvider } from "./contexts/streamingContext";
import getCookie from "./utilities/cookies";

const spotifyLoggedIn = () => {
  return getCookie("spotifyAccess") && getCookie("spotifyAccess") !== "expired"
    ? true
    : false;
};
class App extends React.Component {
  state = {
    platform: "spotify",
    setStreamingPlatform: (streamingPlatform) => {
      this.setState({ platform: streamingPlatform });
    },
    spotifyLoggedIn: spotifyLoggedIn(),
    updateSpotifyLogin: (value) => {
      this.setState({ spotifyLoggedIn: value });
    },
    logoutSpotify: () => logoutOfSpotify(),
    spDeviceId: "",
    setSpDeviceId: (id) => {
      this.setState({ spDeviceId: id });
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

const logoutOfSpotify = () => {
  document.cookie = "spotifyAccess=expired; max-age=0; path=/; SameSite=Lax";
};

export default App;

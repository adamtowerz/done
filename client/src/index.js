import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme.js";

import Navigation from "./components/Navigation";

import Root from "./routes/Root";
import About from "./routes/About";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Settings from "./routes/Settings";

import Today from "./routes/Today";

import { jwtFromCache } from "./auth.js";

const client = new ApolloClient({
  uri: "/graphql",
  request: async operation => {
    const token = jwtFromCache();
    if (token) {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ""
        }
      });
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navigation>
          <Route exact path="/" component={Root} />
          <Route path="/About" component={About} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route path="/Settings" component={Settings} />
          <Route path="/Today" component={Today} />
        </Navigation>
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();

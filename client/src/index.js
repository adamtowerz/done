import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { GET_COMPLETE_TODO_DATA } from "./queries";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme.js";

import { withAppNavigation } from "./components/AppNavigation";
import { withStaticNavigation } from "./components/StaticNavigation";

import Splash from "./routes/Static/Splash";
import NoMatch from "./routes/Static/NoMatch";
import Signup from "./routes/User/Signup";
import Login from "./routes/User/Login";
import Settings from "./routes/User/Settings";

import Today from "./routes/App/Today";
import Inbox from "./routes/App/Inbox";
import Tags from "./routes/App/Tags";

import { isLoggedIn, getJwt } from "./auth.js";

const client = new ApolloClient({
  uri: "/graphql",
  request: async operation => {
    const token = getJwt();
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
    <Query query={GET_COMPLETE_TODO_DATA}>
      {({ loading, error, data }) => (
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props =>
                  isLoggedIn() ? <Redirect to="/Today" /> : <Splash />
                }
              />
              <Route path="/Signup" component={withStaticNavigation(Signup)} />
              <Route path="/Login" component={withStaticNavigation(Login)} />
              <Route path="/Settings" component={withAppNavigation(Settings)} />
              <Route path="/Today" component={withAppNavigation(Today)} />
              <Route path="/Inbox" component={withAppNavigation(Inbox)} />
              <Route
                path="/Tags"
                component={withAppNavigation(Tags, {
                  withContentPadding: false
                })}
              />
              <Route component={withStaticNavigation(NoMatch)} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      )}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();

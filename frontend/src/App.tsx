import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./App.css";
import StandardTheme from "./theme/StandardTheme";
import IndexPage from "./components/IndexPage/IndexPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import useBookLister from "./hooks/BookLister/BookLister";
import { getCurrentUser as useCurrentUser } from "./hooks/UserLister/UserLister";
import SignInPage from "./components/SignInPage/SignInPage";

const theme = createMuiTheme(StandardTheme);

function App() {
  const [loadingCurrentUser, currentUser] = useCurrentUser();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {loadingCurrentUser ? (
        <div>Loading...</div>
      ) : currentUser ? (
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <IndexPage search={useBookLister} />;
              }}
            />
            <Route path="/profile/:id" component={withRouter(ProfilePage)} />
            <Route path="/profile" component={withRouter(ProfilePage)} />
            <Route render={() => <h1>NotFound</h1>} />
          </Switch>
        </Router>
      ) : (
        <SignInPage />
      )}
    </MuiThemeProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import StandardTheme from './theme/StandardTheme';
import IndexPage from './components/IndexPage/IndexPage';
import useBookLister from "./hooks/BookLister/BookLister";
import useResourceStatus from "./hooks/RentalStatus/RentalStatus";
import useCurrentUser from "./hooks/CurrentUser/CurrentUser";
import SignInPage from './components/SignInPage/SignInPage';

const theme = createMuiTheme(StandardTheme);

function App() {
  const [loadingCurrentUser, currentUser] = useCurrentUser();
  return (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {loadingCurrentUser ?
          <div>Loading...</div> :
            <Router>
              <Switch>
                <Route path='/' component={() => {
                  if (!currentUser) return <SignInPage />;
                  return <IndexPage search={useBookLister} statusFetcher={useResourceStatus} currentUser={currentUser} />
                }}  />
              </Switch>
            </Router>
        }
    </MuiThemeProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import StandardTheme from './theme/StandardTheme';
import IndexPage from './components/IndexPage/IndexPage';
import useCurrentUser from "./hooks/CurrentUser/CurrentUser";
import SignInPage from './components/SignInPage/SignInPage';
import BookDetail from './components/BookDetail/BookDetail';

const theme = createMuiTheme(StandardTheme);

function App() {
  const [loadingCurrentUser, currentUser] = useCurrentUser();
  return (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {loadingCurrentUser ?
          <div>Loading...</div> :
            currentUser ?
            <Router>
              <Switch>
                <Route path='/' render={() => {
                  return <IndexPage currentUser={currentUser} />
                }} />
                <Route path='/books/:id' component={withRouter(BookDetail)} />
                <Route render={() => <h1>NotFound</h1>} />
              </Switch>
            </Router> : <SignInPage /> 
        }
    </MuiThemeProvider>
  );
}

export default App;

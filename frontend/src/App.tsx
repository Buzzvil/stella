import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import StandardTheme from './theme/StandardTheme';
import IndexPage from './components/IndexPage/IndexPage';
import BookLister from "./hooks/BookLister/BookLister";
import getResourceStatus from "./hooks/RentalStatus/RentalStatus";
import CurrentUser from "./hooks/CurrentUser/CurrentUser";
import SignInPage from './components/SignInPage/SignInPage';

const theme = createMuiTheme(StandardTheme);

function App() {
  const [loadingCurrentUser, currentUser] = CurrentUser();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {loadingCurrentUser ?
        <div>Loading...</div> :
        currentUser ?
          <IndexPage
            search={BookLister}
            statusFetcher={getResourceStatus}
            currentUser={currentUser}/> :
          <SignInPage />
      }
    </MuiThemeProvider>
  );
}

export default App;

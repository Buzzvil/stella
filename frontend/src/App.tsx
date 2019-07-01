import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import StandardTheme from './theme/StandardTheme';
import IndexPage from './components/IndexPage/IndexPage';
import {Book, ListBooksRequest, ListBooksResponse} from "proto/booksvc_pb";
import { BookServiceClient } from 'proto/booksvc_grpc_web_pb';
import BookLister from "./hooks/BookLister/BookLister";
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
          <IndexPage search={BookLister} currentUser={currentUser}/> :
          <SignInPage />
      }
    </MuiThemeProvider>
  );
}

export default App;

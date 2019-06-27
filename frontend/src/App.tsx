import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import StandardTheme from './theme/StandardTheme';
import IndexPage from './components/IndexPage/IndexPage';
import {Book, ListBooksRequest, ListBooksResponse} from "proto/booksvc_pb";
import { BookServiceClient } from 'proto/booksvc_grpc_web_pb';
import BookLister from "./hooks/BookLister/BookLister"

const theme = createMuiTheme(StandardTheme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <IndexPage search={BookLister}/>
    </MuiThemeProvider>
  );
}

export default App;

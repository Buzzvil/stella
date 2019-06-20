import React, { useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import BookLister from "./hooks/BookLister/BookLister";
import AppHeader from './AppHeader';
import { UserServiceClient } from 'proto/usersvc_grpc_web_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { User } from 'proto/usersvc_pb';
import './App.css';

const theme = createMuiTheme({});

const userService = new UserServiceClient(process.env.PUBLIC_URL, null, null);
userService.getCurrentUser(new Empty(), {}, (err: any, user: User) => {
  console.log(err)
  console.log(user)
})

function App() {
  const [query, setQuery] = useState("");
  const [loading, books] = BookLister(query);
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <AppHeader />
        <input style={{marginTop: 100}} value={query} onChange={e => setQuery(e.target.value)} type="search" />
        {loading && <div>Loading...</div>}
        {books.map(book => <p key={book.getId()}>{book.getName()}</p>)}
      </div>
    </MuiThemeProvider>
  );
}

export default App;

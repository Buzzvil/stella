import React, { useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import BookLister from "./hooks/BookLister/BookLister";
import AppHeader from './AppHeader';
import './App.css';

const theme = createMuiTheme({});

function App() {
  const [query, setQuery] = useState("");
  const {loadingBooks, books} = BookLister(query);
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <AppHeader />
        <input style={{marginTop: 100}} value={query} onChange={e => setQuery(e.target.value)} type="search" />
        {loadingBooks && <div>Loading...</div>}
        {books.map(book => <p key={book.getId()}>{book.getName()}</p>)}
      </div>
    </MuiThemeProvider>
  );
}

export default App;

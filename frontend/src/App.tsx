import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BookServiceClient } from './proto/BooksvcServiceClientPb';
import { ListBooksRequest, ListBooksResponse, Book } from './proto/booksvc_pb';
import AppHeader from './AppHeader';
import './App.css';

const theme = createMuiTheme({});

const bookService = new BookServiceClient('http://localhost:30080', null, null);

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[] | null>(null);

  const listBooks = ((query: string) => {
    const req = new ListBooksRequest();
    req.setName(query)
    bookService.listBooks(req, {}, (err: any, resp: ListBooksResponse) => {
      if (err) {
        console.log(err);
      } else {
        setBooks(resp.getBooksList());
      }
    });
  });

  useEffect(() => {
    listBooks(query);
  }, [query]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <AppHeader />
        <input value={query} onChange={e => setQuery(e.target.value)} type="search" />
        {books && books.map((book) => <p key={book.getId()}>{book.getName()}</p>)}
      </div>
    </MuiThemeProvider>
  );
}

export default App;

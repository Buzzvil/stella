import { useState, useEffect } from "react";
import { Book } from "proto/booksvc_pb";
import Loader from "../Loader/Loader";

export default (query = {}): [boolean, Book[]] => {
  const [loading, load] = Loader();
  const [books, setBooks] = useState<Book[]>([]);
  // Fetch Books
  const listBooks = (q: any) => () => {
      const [cancelled, cancel] = load(Promise.resolve()
        .then(() => new Promise(r => setTimeout(r, 1000)))
        .then(() => {
          if (cancelled()) return;
          setBooks([])
        })
      );
      return cancel;
  };

  useEffect(listBooks(query), [query]);
  return [loading, books];
};

// import { BookServiceClient } from 'proto/booksvc_grpc_web_pb';

// import { ListBooksRequest, ListBooksResponse, Book } from 'proto/booksvc_pb';

// const bookService = new BookServiceClient('https://billy.buzzvil.com', null, null);

  // const [query, setQuery] = useState("");


  // const listBooks = ((query: string) => {
  //   const req = new ListBooksRequest();
  //   req.setFilter(query)
  //   const meta = {'authorization': 'xxxxx'}
  //   bookService.listBooks(req, meta, (err: any, resp: ListBooksResponse) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(resp.getBooksList());
  //       setBooks(resp.getBooksList());
  //     }
  //   });
  // });

  // useEffect(() => {
  //   listBooks(query);
  // }, [query]);

import { useState, useEffect } from "react";
import { BookServiceClient } from "proto/booksvc_grpc_web_pb";
import { ListBooksRequest, ListBooksResponse, Book } from "proto/booksvc_pb";

import Loader from "../Loader/Loader";
import { useBookContext, setBooks as setContextBooks } from "../BookContext/BookContext";

const bookService = new BookServiceClient(process.env.PUBLIC_URL, null, null);

export default (query: string): [boolean, Book[]] => {
  const [loading, load] = Loader();
  const [books, setBooks] = useState<Book[]>([]);
  const [_, dispatch] = useBookContext();
  // Fetch Books
  const listBooks = (q: string) => () => {
    if (q === "") {
      setBooks([]);
      return () => {};
    }
    const req = new ListBooksRequest();
    req.setFilter(q);
    const bookPromise: Promise<Book[]> = new Promise((resolve, reject) => {
      bookService.listBooks(req, {}, (err: any, resp: ListBooksResponse) =>
        err ? reject(err) : resolve(resp.getBooksList())
      );
    });

    const [cancelled, cancel] = load(
      bookPromise.then(books => {
        if (cancelled()) return;
        setBooks(books);
        setContextBooks(dispatch, books);
      })
    );
    return cancel;
  };

  useEffect(listBooks(query), [query]);
  return [loading, books];
};

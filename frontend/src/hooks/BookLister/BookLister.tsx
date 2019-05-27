import { useState, useEffect } from "react";
import { BookServiceClient } from 'proto/booksvc_grpc_web_pb';
import { ListBooksRequest, ListBooksResponse, Book } from 'proto/booksvc_pb';
import Loader from "../Loader/Loader";

const bookService = new BookServiceClient(process.env.PUBLIC_URL, null, null);

export default (query: string): [boolean, Book[]] => {
  const [loading, load] = Loader();
  const [books, setBooks] = useState<Book[]>([]);
  // Fetch Books
  const listBooks = (q: string) => () => {
      const req = new ListBooksRequest();
      req.setFilter(q)
      const bookPromise: Promise<Book[]> = new Promise((resolve, reject) => {
        bookService.listBooks(req, {}, (err: any, resp: ListBooksResponse) => err ? reject(err) : resolve(resp.getBooksList()))
      });

      const [cancelled, cancel] = load(bookPromise
        .then(books => {
          if (cancelled()) return;
          setBooks(books);
        })
      );
      return cancel;
  };

  useEffect(listBooks(query), [query]);
  return [loading, books];
};

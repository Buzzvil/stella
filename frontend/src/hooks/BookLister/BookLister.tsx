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
      return () => { };
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

interface BookListStatus {
  books: Book[];
}

export interface BookListIfc {
  (ids: number[]): [boolean, BookListStatus | undefined];
}

export const getBooksList: BookListIfc = ids => {
  const [loading, load] = Loader();
  const [IDSet, setIDset] = useState<Set<number>>(new Set());
  const [books, setStatus] = useState<BookListStatus>();
  const getBookListStatus = (ids: number[]) => {
    // Fetch Books with ids
    const req = new ListBooksRequest();
    req.setIdsList(ids);
    const listBooksPromise: Promise<Book[]> = new Promise(
      (resolve, reject) => {
        if (ids.length === 0) return resolve([])
        bookService.listBooks(
          req,
          {},
          (err: any, l: ListBooksResponse) => (err ? reject(err) : resolve(l.getBooksList()))
        )
      }
    )

    const [cancelled, cancel] = load(
      listBooksPromise.then(b => {
        if (cancelled()) return [];
        setStatus({ books: b })
      }).catch(err => {
        console.log(err);
      })
    );
    return cancel;
  };
  const diff = ids.length !== IDSet.size && !ids.every(id => IDSet.has(id));
  if (diff) setIDset(new Set(ids));
  useEffect(() => getBookListStatus(ids), [IDSet]);

  return [loading, books];
}

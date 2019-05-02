import * as grpcWeb from 'grpc-web';
import {
  Book,
  CreateBookRequest,
  GetBookRequest,
  ListBooksRequest,
  ListBooksResponse} from './booksvc_pb';

export class BookServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  listBooks(
    request: ListBooksRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ListBooksResponse) => void
  ): grpcWeb.ClientReadableStream<ListBooksResponse>;

  getBook(
    request: GetBookRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Book) => void
  ): grpcWeb.ClientReadableStream<Book>;

  createBook(
    request: CreateBookRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Book) => void
  ): grpcWeb.ClientReadableStream<Book>;

}

export class BookServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  listBooks(
    request: ListBooksRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ListBooksResponse>;

  getBook(
    request: GetBookRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Book>;

  createBook(
    request: CreateBookRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Book>;

}


/**
 * @fileoverview gRPC-Web generated client stub for stella.book.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';
import {
  Book,
  CreateBookRequest,
  GetBookRequest,
  ListBooksRequest,
  ListBooksResponse} from './booksvc_pb';

export class BookServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; }) {
    if (!options) options = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoListBooks = new grpcWeb.AbstractClientBase.MethodInfo(
    ListBooksResponse,
    (request: ListBooksRequest) => {
      return request.serializeBinary();
    },
    ListBooksResponse.deserializeBinary
  );

  listBooks(
    request: ListBooksRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ListBooksResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.book.v1.BookService/ListBooks',
      request,
      metadata,
      this.methodInfoListBooks,
      callback);
  }

  methodInfoGetBook = new grpcWeb.AbstractClientBase.MethodInfo(
    Book,
    (request: GetBookRequest) => {
      return request.serializeBinary();
    },
    Book.deserializeBinary
  );

  getBook(
    request: GetBookRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Book) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.book.v1.BookService/GetBook',
      request,
      metadata,
      this.methodInfoGetBook,
      callback);
  }

  methodInfoCreateBook = new grpcWeb.AbstractClientBase.MethodInfo(
    Book,
    (request: CreateBookRequest) => {
      return request.serializeBinary();
    },
    Book.deserializeBinary
  );

  createBook(
    request: CreateBookRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Book) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.book.v1.BookService/CreateBook',
      request,
      metadata,
      this.methodInfoCreateBook,
      callback);
  }

}


import * as jspb from "google-protobuf"

export class Book extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getIsbn(): string;
  setIsbn(value: string): void;

  getAuthorsList(): Array<string>;
  setAuthorsList(value: Array<string>): void;
  clearAuthorsList(): void;
  addAuthors(value: string, index?: number): void;

  getPublisher(): string;
  setPublisher(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getCoverImage(): string;
  setCoverImage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Book.AsObject;
  static toObject(includeInstance: boolean, msg: Book): Book.AsObject;
  static serializeBinaryToWriter(message: Book, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Book;
  static deserializeBinaryFromReader(message: Book, reader: jspb.BinaryReader): Book;
}

export namespace Book {
  export type AsObject = {
    id: number,
    name: string,
    isbn: string,
    authorsList: Array<string>,
    publisher: string,
    content: string,
    coverImage: string,
  }
}

export class ListBooksRequest extends jspb.Message {
  getFilter(): string;
  setFilter(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListBooksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListBooksRequest): ListBooksRequest.AsObject;
  static serializeBinaryToWriter(message: ListBooksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListBooksRequest;
  static deserializeBinaryFromReader(message: ListBooksRequest, reader: jspb.BinaryReader): ListBooksRequest;
}

export namespace ListBooksRequest {
  export type AsObject = {
    filter: string,
  }
}

export class ListBooksResponse extends jspb.Message {
  getBooksList(): Array<Book>;
  setBooksList(value: Array<Book>): void;
  clearBooksList(): void;
  addBooks(value?: Book, index?: number): Book;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListBooksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListBooksResponse): ListBooksResponse.AsObject;
  static serializeBinaryToWriter(message: ListBooksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListBooksResponse;
  static deserializeBinaryFromReader(message: ListBooksResponse, reader: jspb.BinaryReader): ListBooksResponse;
}

export namespace ListBooksResponse {
  export type AsObject = {
    booksList: Array<Book.AsObject>,
  }
}

export class GetBookRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBookRequest): GetBookRequest.AsObject;
  static serializeBinaryToWriter(message: GetBookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBookRequest;
  static deserializeBinaryFromReader(message: GetBookRequest, reader: jspb.BinaryReader): GetBookRequest;
}

export namespace GetBookRequest {
  export type AsObject = {
    id: number,
  }
}

export class CreateBookRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getIsbn(): string;
  setIsbn(value: string): void;

  getAuthorsList(): Array<string>;
  setAuthorsList(value: Array<string>): void;
  clearAuthorsList(): void;
  addAuthors(value: string, index?: number): void;

  getPublisher(): string;
  setPublisher(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getCoverImage(): string;
  setCoverImage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateBookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateBookRequest): CreateBookRequest.AsObject;
  static serializeBinaryToWriter(message: CreateBookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateBookRequest;
  static deserializeBinaryFromReader(message: CreateBookRequest, reader: jspb.BinaryReader): CreateBookRequest;
}

export namespace CreateBookRequest {
  export type AsObject = {
    name: string,
    isbn: string,
    authorsList: Array<string>,
    publisher: string,
    content: string,
    coverImage: string,
  }
}


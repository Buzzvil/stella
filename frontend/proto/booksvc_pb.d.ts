export class Book {
  constructor ();
  getId(): number;
  setId(a: number): void;
  getName(): string;
  setName(a: string): void;
  getIsbn(): string;
  setIsbn(a: string): void;
  getAuthorsList(): string[];
  setAuthorsList(a: string[]): void;
  getPublisher(): string;
  setPublisher(a: string): void;
  getContent(): string;
  setContent(a: string): void;
  getCoverImage(): string;
  setCoverImage(a: string): void;
  toObject(): Book.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Book;
}

export namespace Book {
  export type AsObject = {
    Id: number;
    Name: string;
    Isbn: string;
    AuthorsList: string[];
    Publisher: string;
    Content: string;
    CoverImage: string;
  }
}

export class CreateBookRequest {
  constructor ();
  getName(): string;
  setName(a: string): void;
  getIsbn(): string;
  setIsbn(a: string): void;
  getAuthorsList(): string[];
  setAuthorsList(a: string[]): void;
  getPublisher(): string;
  setPublisher(a: string): void;
  getContent(): string;
  setContent(a: string): void;
  getCoverImage(): string;
  setCoverImage(a: string): void;
  toObject(): CreateBookRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CreateBookRequest;
}

export namespace CreateBookRequest {
  export type AsObject = {
    Name: string;
    Isbn: string;
    AuthorsList: string[];
    Publisher: string;
    Content: string;
    CoverImage: string;
  }
}

export class GetBookRequest {
  constructor ();
  getId(): number;
  setId(a: number): void;
  toObject(): GetBookRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetBookRequest;
}

export namespace GetBookRequest {
  export type AsObject = {
    Id: number;
  }
}

export class ListBooksRequest {
  constructor ();
  getFilter(): string;
  setFilter(a: string): void;
  getIdsList(): number[];
  setIdsList(a: number[]): void;
  toObject(): ListBooksRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListBooksRequest;
}

export namespace ListBooksRequest {
  export type AsObject = {
    Filter: string;
    IdsList: number[];
  }
}

export class ListBooksResponse {
  constructor ();
  getBooksList(): Book[];
  setBooksList(a: Book[]): void;
  toObject(): ListBooksResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListBooksResponse;
}

export namespace ListBooksResponse {
  export type AsObject = {
    BooksList: Book[];
  }
}

export class SearchBookRequest {
  constructor ();
  getIsbn(): string;
  setIsbn(a: string): void;
  toObject(): SearchBookRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => SearchBookRequest;
}

export namespace SearchBookRequest {
  export type AsObject = {
    Isbn: string;
  }
}

export class SearchBookResponse {
  constructor ();
  getBooksList(): Book[];
  setBooksList(a: Book[]): void;
  toObject(): SearchBookResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => SearchBookResponse;
}

export namespace SearchBookResponse {
  export type AsObject = {
    BooksList: Book[];
  }
}


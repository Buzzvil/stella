/**
 * @fileoverview gRPC-Web generated client stub for stella.book.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.stella = {};
proto.stella.book = {};
proto.stella.book.v1 = require('./booksvc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.stella.book.v1.BookServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.stella.book.v1.BookServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.stella.book.v1.BookServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.stella.book.v1.BookServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.book.v1.ListBooksRequest,
 *   !proto.stella.book.v1.ListBooksResponse>}
 */
const methodInfo_BookService_ListBooks = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.book.v1.ListBooksResponse,
  /** @param {!proto.stella.book.v1.ListBooksRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.book.v1.ListBooksResponse.deserializeBinary
);


/**
 * @param {!proto.stella.book.v1.ListBooksRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.book.v1.ListBooksResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.book.v1.ListBooksResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServiceClient.prototype.listBooks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.book.v1.BookService/ListBooks',
      request,
      metadata,
      methodInfo_BookService_ListBooks,
      callback);
};


/**
 * @param {!proto.stella.book.v1.ListBooksRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.book.v1.ListBooksResponse>}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServicePromiseClient.prototype.listBooks =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.listBooks(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.book.v1.GetBookRequest,
 *   !proto.stella.book.v1.Book>}
 */
const methodInfo_BookService_GetBook = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.book.v1.Book,
  /** @param {!proto.stella.book.v1.GetBookRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.book.v1.Book.deserializeBinary
);


/**
 * @param {!proto.stella.book.v1.GetBookRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.book.v1.Book)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.book.v1.Book>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServiceClient.prototype.getBook =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.book.v1.BookService/GetBook',
      request,
      metadata,
      methodInfo_BookService_GetBook,
      callback);
};


/**
 * @param {!proto.stella.book.v1.GetBookRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.book.v1.Book>}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServicePromiseClient.prototype.getBook =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getBook(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.book.v1.SearchBookRequest,
 *   !proto.stella.book.v1.SearchBookResponse>}
 */
const methodInfo_BookService_SearchBookInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.book.v1.SearchBookResponse,
  /** @param {!proto.stella.book.v1.SearchBookRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.book.v1.SearchBookResponse.deserializeBinary
);


/**
 * @param {!proto.stella.book.v1.SearchBookRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.book.v1.SearchBookResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.book.v1.SearchBookResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServiceClient.prototype.searchBookInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.book.v1.BookService/SearchBookInfo',
      request,
      metadata,
      methodInfo_BookService_SearchBookInfo,
      callback);
};


/**
 * @param {!proto.stella.book.v1.SearchBookRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.book.v1.SearchBookResponse>}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServicePromiseClient.prototype.searchBookInfo =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.searchBookInfo(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.book.v1.CreateBookRequest,
 *   !proto.stella.book.v1.Book>}
 */
const methodInfo_BookService_CreateBook = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.book.v1.Book,
  /** @param {!proto.stella.book.v1.CreateBookRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.book.v1.Book.deserializeBinary
);


/**
 * @param {!proto.stella.book.v1.CreateBookRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.book.v1.Book)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.book.v1.Book>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServiceClient.prototype.createBook =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.book.v1.BookService/CreateBook',
      request,
      metadata,
      methodInfo_BookService_CreateBook,
      callback);
};


/**
 * @param {!proto.stella.book.v1.CreateBookRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.book.v1.Book>}
 *     The XHR Node Readable Stream
 */
proto.stella.book.v1.BookServicePromiseClient.prototype.createBook =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createBook(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.stella.book.v1;


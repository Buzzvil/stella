/**
 * @fileoverview gRPC-Web generated client stub for stella.rating.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.stella = {};
proto.stella.rating = {};
proto.stella.rating.v1 = require('./ratingsvc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.stella.rating.v1.RatingServiceClient =
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
proto.stella.rating.v1.RatingServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.stella.rating.v1.RatingServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.stella.rating.v1.RatingServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rating.v1.GetRatingRequest,
 *   !proto.stella.rating.v1.GetRatingResponse>}
 */
const methodInfo_RatingService_GetRating = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.rating.v1.GetRatingResponse,
  /** @param {!proto.stella.rating.v1.GetRatingRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.rating.v1.GetRatingResponse.deserializeBinary
);


/**
 * @param {!proto.stella.rating.v1.GetRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.rating.v1.GetRatingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.rating.v1.GetRatingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServiceClient.prototype.getRating =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rating.v1.RatingService/GetRating',
      request,
      metadata,
      methodInfo_RatingService_GetRating,
      callback);
};


/**
 * @param {!proto.stella.rating.v1.GetRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.rating.v1.GetRatingResponse>}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServicePromiseClient.prototype.getRating =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getRating(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rating.v1.GetUserRatingRequest,
 *   !proto.stella.rating.v1.Rating>}
 */
const methodInfo_RatingService_GetUserRating = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.rating.v1.Rating,
  /** @param {!proto.stella.rating.v1.GetUserRatingRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.rating.v1.Rating.deserializeBinary
);


/**
 * @param {!proto.stella.rating.v1.GetUserRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.rating.v1.Rating)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.rating.v1.Rating>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServiceClient.prototype.getUserRating =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rating.v1.RatingService/GetUserRating',
      request,
      metadata,
      methodInfo_RatingService_GetUserRating,
      callback);
};


/**
 * @param {!proto.stella.rating.v1.GetUserRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.rating.v1.Rating>}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServicePromiseClient.prototype.getUserRating =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getUserRating(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rating.v1.GetRatingRequest,
 *   !proto.stella.rating.v1.ListRatingsResponse>}
 */
const methodInfo_RatingService_ListRatings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.rating.v1.ListRatingsResponse,
  /** @param {!proto.stella.rating.v1.GetRatingRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.rating.v1.ListRatingsResponse.deserializeBinary
);


/**
 * @param {!proto.stella.rating.v1.GetRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.rating.v1.ListRatingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.rating.v1.ListRatingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServiceClient.prototype.listRatings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rating.v1.RatingService/ListRatings',
      request,
      metadata,
      methodInfo_RatingService_ListRatings,
      callback);
};


/**
 * @param {!proto.stella.rating.v1.GetRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.rating.v1.ListRatingsResponse>}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServicePromiseClient.prototype.listRatings =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.listRatings(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rating.v1.GetUserRatingRequest,
 *   !proto.stella.rating.v1.ListRatingsResponse>}
 */
const methodInfo_RatingService_ListUserRatings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.rating.v1.ListRatingsResponse,
  /** @param {!proto.stella.rating.v1.GetUserRatingRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.rating.v1.ListRatingsResponse.deserializeBinary
);


/**
 * @param {!proto.stella.rating.v1.GetUserRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.rating.v1.ListRatingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.rating.v1.ListRatingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServiceClient.prototype.listUserRatings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rating.v1.RatingService/ListUserRatings',
      request,
      metadata,
      methodInfo_RatingService_ListUserRatings,
      callback);
};


/**
 * @param {!proto.stella.rating.v1.GetUserRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.rating.v1.ListRatingsResponse>}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServicePromiseClient.prototype.listUserRatings =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.listUserRatings(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rating.v1.UpsertRatingRequest,
 *   !proto.stella.rating.v1.Rating>}
 */
const methodInfo_RatingService_UpsertRating = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.rating.v1.Rating,
  /** @param {!proto.stella.rating.v1.UpsertRatingRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.rating.v1.Rating.deserializeBinary
);


/**
 * @param {!proto.stella.rating.v1.UpsertRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.rating.v1.Rating)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.rating.v1.Rating>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServiceClient.prototype.upsertRating =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rating.v1.RatingService/UpsertRating',
      request,
      metadata,
      methodInfo_RatingService_UpsertRating,
      callback);
};


/**
 * @param {!proto.stella.rating.v1.UpsertRatingRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.rating.v1.Rating>}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServicePromiseClient.prototype.upsertRating =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.upsertRating(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rating.v1.DeleteRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_RatingService_DeleteRating = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.stella.rating.v1.DeleteRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.stella.rating.v1.DeleteRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServiceClient.prototype.deleteRating =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rating.v1.RatingService/DeleteRating',
      request,
      metadata,
      methodInfo_RatingService_DeleteRating,
      callback);
};


/**
 * @param {!proto.stella.rating.v1.DeleteRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.stella.rating.v1.RatingServicePromiseClient.prototype.deleteRating =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteRating(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.stella.rating.v1;


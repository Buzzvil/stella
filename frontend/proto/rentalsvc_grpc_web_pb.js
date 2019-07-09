/**
 * @fileoverview gRPC-Web generated client stub for stella.rental.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.stella = {};
proto.stella.rental = {};
proto.stella.rental.v1 = require('./rentalsvc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.stella.rental.v1.RentalServiceClient =
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
proto.stella.rental.v1.RentalServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.stella.rental.v1.RentalServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.stella.rental.v1.RentalServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rental.v1.GetResourceStatusRequest,
 *   !proto.stella.rental.v1.ResourceStatus>}
 */
const methodInfo_RentalService_GetResourceStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.rental.v1.ResourceStatus,
  /** @param {!proto.stella.rental.v1.GetResourceStatusRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.rental.v1.ResourceStatus.deserializeBinary
);


/**
 * @param {!proto.stella.rental.v1.GetResourceStatusRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.rental.v1.ResourceStatus)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.rental.v1.ResourceStatus>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServiceClient.prototype.getResourceStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rental.v1.RentalService/GetResourceStatus',
      request,
      metadata,
      methodInfo_RentalService_GetResourceStatus,
      callback);
};


/**
 * @param {!proto.stella.rental.v1.GetResourceStatusRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.rental.v1.ResourceStatus>}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServicePromiseClient.prototype.getResourceStatus =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getResourceStatus(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rental.v1.GetUserStatusRequest,
 *   !proto.stella.rental.v1.UserStatus>}
 */
const methodInfo_RentalService_GetUserStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.rental.v1.UserStatus,
  /** @param {!proto.stella.rental.v1.GetUserStatusRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.rental.v1.UserStatus.deserializeBinary
);


/**
 * @param {!proto.stella.rental.v1.GetUserStatusRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.rental.v1.UserStatus)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.rental.v1.UserStatus>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServiceClient.prototype.getUserStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rental.v1.RentalService/GetUserStatus',
      request,
      metadata,
      methodInfo_RentalService_GetUserStatus,
      callback);
};


/**
 * @param {!proto.stella.rental.v1.GetUserStatusRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.rental.v1.UserStatus>}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServicePromiseClient.prototype.getUserStatus =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getUserStatus(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rental.v1.RentResourceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_RentalService_RentResource = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.stella.rental.v1.RentResourceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.stella.rental.v1.RentResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServiceClient.prototype.rentResource =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rental.v1.RentalService/RentResource',
      request,
      metadata,
      methodInfo_RentalService_RentResource,
      callback);
};


/**
 * @param {!proto.stella.rental.v1.RentResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServicePromiseClient.prototype.rentResource =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.rentResource(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rental.v1.ReturnResourceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_RentalService_ReturnResource = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.stella.rental.v1.ReturnResourceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.stella.rental.v1.ReturnResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServiceClient.prototype.returnResource =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rental.v1.RentalService/ReturnResource',
      request,
      metadata,
      methodInfo_RentalService_ReturnResource,
      callback);
};


/**
 * @param {!proto.stella.rental.v1.ReturnResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServicePromiseClient.prototype.returnResource =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.returnResource(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rental.v1.WatchResourceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_RentalService_WatchResource = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.stella.rental.v1.WatchResourceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.stella.rental.v1.WatchResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServiceClient.prototype.watchResource =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rental.v1.RentalService/WatchResource',
      request,
      metadata,
      methodInfo_RentalService_WatchResource,
      callback);
};


/**
 * @param {!proto.stella.rental.v1.WatchResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServicePromiseClient.prototype.watchResource =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.watchResource(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.rental.v1.UnwatchResourceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_RentalService_UnwatchResource = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.stella.rental.v1.UnwatchResourceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.stella.rental.v1.UnwatchResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServiceClient.prototype.unwatchResource =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.rental.v1.RentalService/UnwatchResource',
      request,
      metadata,
      methodInfo_RentalService_UnwatchResource,
      callback);
};


/**
 * @param {!proto.stella.rental.v1.UnwatchResourceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.stella.rental.v1.RentalServicePromiseClient.prototype.unwatchResource =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.unwatchResource(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.stella.rental.v1;


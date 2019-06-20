/**
 * @fileoverview gRPC-Web generated client stub for stella.user.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.stella = {};
proto.stella.user = {};
proto.stella.user.v1 = require('./usersvc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.stella.user.v1.UserServiceClient =
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
proto.stella.user.v1.UserServicePromiseClient =
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
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.stella.user.v1.User>}
 */
const methodInfo_UserService_GetCurrentUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.user.v1.User,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.user.v1.User.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.user.v1.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.user.v1.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.user.v1.UserServiceClient.prototype.getCurrentUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.user.v1.UserService/GetCurrentUser',
      request,
      metadata || {},
      methodInfo_UserService_GetCurrentUser,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.user.v1.User>}
 *     A native promise that resolves to the response
 */
proto.stella.user.v1.UserServicePromiseClient.prototype.getCurrentUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/stella.user.v1.UserService/GetCurrentUser',
      request,
      metadata || {},
      methodInfo_UserService_GetCurrentUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.user.v1.GetUserRequest,
 *   !proto.stella.user.v1.User>}
 */
const methodInfo_UserService_GetUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.user.v1.User,
  /** @param {!proto.stella.user.v1.GetUserRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.user.v1.User.deserializeBinary
);


/**
 * @param {!proto.stella.user.v1.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.user.v1.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.user.v1.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.user.v1.UserServiceClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.user.v1.UserService/GetUser',
      request,
      metadata || {},
      methodInfo_UserService_GetUser,
      callback);
};


/**
 * @param {!proto.stella.user.v1.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.user.v1.User>}
 *     A native promise that resolves to the response
 */
proto.stella.user.v1.UserServicePromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/stella.user.v1.UserService/GetUser',
      request,
      metadata || {},
      methodInfo_UserService_GetUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.user.v1.ListUsersRequest,
 *   !proto.stella.user.v1.ListUsersResponse>}
 */
const methodInfo_UserService_ListUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.user.v1.ListUsersResponse,
  /** @param {!proto.stella.user.v1.ListUsersRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.user.v1.ListUsersResponse.deserializeBinary
);


/**
 * @param {!proto.stella.user.v1.ListUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.user.v1.ListUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.user.v1.ListUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.user.v1.UserServiceClient.prototype.listUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.user.v1.UserService/ListUsers',
      request,
      metadata || {},
      methodInfo_UserService_ListUsers,
      callback);
};


/**
 * @param {!proto.stella.user.v1.ListUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.user.v1.ListUsersResponse>}
 *     A native promise that resolves to the response
 */
proto.stella.user.v1.UserServicePromiseClient.prototype.listUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/stella.user.v1.UserService/ListUsers',
      request,
      metadata || {},
      methodInfo_UserService_ListUsers);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.stella.user.v1.CreateUserRequest,
 *   !proto.stella.user.v1.User>}
 */
const methodInfo_UserService_CreateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.stella.user.v1.User,
  /** @param {!proto.stella.user.v1.CreateUserRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.stella.user.v1.User.deserializeBinary
);


/**
 * @param {!proto.stella.user.v1.CreateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.stella.user.v1.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stella.user.v1.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stella.user.v1.UserServiceClient.prototype.createUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stella.user.v1.UserService/CreateUser',
      request,
      metadata || {},
      methodInfo_UserService_CreateUser,
      callback);
};


/**
 * @param {!proto.stella.user.v1.CreateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stella.user.v1.User>}
 *     A native promise that resolves to the response
 */
proto.stella.user.v1.UserServicePromiseClient.prototype.createUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/stella.user.v1.UserService/CreateUser',
      request,
      metadata || {},
      methodInfo_UserService_CreateUser);
};


module.exports = proto.stella.user.v1;


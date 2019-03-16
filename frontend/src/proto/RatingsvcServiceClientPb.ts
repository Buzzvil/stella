/**
 * @fileoverview gRPC-Web generated client stub for stella.rating.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';
import {
  Empty,
  DeleteRequest,
  GetRatingRequest,
  Rating,
  UpsertRatingRequest} from './ratingsvc_pb';

export class RatingServiceClient {
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

  methodInfoGetRating = new grpcWeb.AbstractClientBase.MethodInfo(
    Rating,
    (request: GetRatingRequest) => {
      return request.serializeBinary();
    },
    Rating.deserializeBinary
  );

  getRating(
    request: GetRatingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Rating) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rating.v1.RatingService/GetRating',
      request,
      metadata,
      this.methodInfoGetRating,
      callback);
  }

  methodInfoUpsertRating = new grpcWeb.AbstractClientBase.MethodInfo(
    Rating,
    (request: UpsertRatingRequest) => {
      return request.serializeBinary();
    },
    Rating.deserializeBinary
  );

  upsertRating(
    request: UpsertRatingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Rating) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rating.v1.RatingService/UpsertRating',
      request,
      metadata,
      this.methodInfoUpsertRating,
      callback);
  }

  methodInfoDelete = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: DeleteRequest) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  delete(
    request: DeleteRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rating.v1.RatingService/Delete',
      request,
      metadata,
      this.methodInfoDelete,
      callback);
  }

}


/**
 * @fileoverview gRPC-Web generated client stub for stella.rental.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';
import {
  CancelResourceRequest,
  GetResourceStatusRequest,
  RentResourceRequest,
  ReserveResourceRequest,
  ResourceStatus,
  ReturnResourceRequest} from './rentalsvc_pb';

export class RentalServiceClient {
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

  methodInfoGetResourceStatus = new grpcWeb.AbstractClientBase.MethodInfo(
    ResourceStatus,
    (request: GetResourceStatusRequest) => {
      return request.serializeBinary();
    },
    ResourceStatus.deserializeBinary
  );

  getResourceStatus(
    request: GetResourceStatusRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rental.v1.RentalService/GetResourceStatus',
      request,
      metadata,
      this.methodInfoGetResourceStatus,
      callback);
  }

  methodInfoRentResource = new grpcWeb.AbstractClientBase.MethodInfo(
    ResourceStatus,
    (request: RentResourceRequest) => {
      return request.serializeBinary();
    },
    ResourceStatus.deserializeBinary
  );

  rentResource(
    request: RentResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rental.v1.RentalService/RentResource',
      request,
      metadata,
      this.methodInfoRentResource,
      callback);
  }

  methodInfoReturnResource = new grpcWeb.AbstractClientBase.MethodInfo(
    ResourceStatus,
    (request: ReturnResourceRequest) => {
      return request.serializeBinary();
    },
    ResourceStatus.deserializeBinary
  );

  returnResource(
    request: ReturnResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rental.v1.RentalService/ReturnResource',
      request,
      metadata,
      this.methodInfoReturnResource,
      callback);
  }

  methodInfoReserveResource = new grpcWeb.AbstractClientBase.MethodInfo(
    ResourceStatus,
    (request: ReserveResourceRequest) => {
      return request.serializeBinary();
    },
    ResourceStatus.deserializeBinary
  );

  reserveResource(
    request: ReserveResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rental.v1.RentalService/ReserveResource',
      request,
      metadata,
      this.methodInfoReserveResource,
      callback);
  }

  methodInfoCancelResource = new grpcWeb.AbstractClientBase.MethodInfo(
    ResourceStatus,
    (request: CancelResourceRequest) => {
      return request.serializeBinary();
    },
    ResourceStatus.deserializeBinary
  );

  cancelResource(
    request: CancelResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stella.rental.v1.RentalService/CancelResource',
      request,
      metadata,
      this.methodInfoCancelResource,
      callback);
  }

}


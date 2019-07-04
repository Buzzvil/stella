import * as grpcWeb from 'grpc-web';
import {
  Empty,
  CancelResourceRequest,
  GetResourceStatusRequest,
  GetUserStatusRequest,
  RentResourceRequest,
  ReserveResourceRequest,
  ResourceStatus,
  ReturnResourceRequest,
  UserStatus} from './rentalsvc_pb';

export class RentalServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getResourceStatus(
    request: GetResourceStatusRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void
  ): grpcWeb.ClientReadableStream<ResourceStatus>;

  getUserStatus(
    request: GetUserStatusRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: UserStatus) => void
  ): grpcWeb.ClientReadableStream<UserStatus>;

  rentResource(
    request: RentResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  returnResource(
    request: ReturnResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  reserveResource(
    request: ReserveResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  cancelResource(
    request: CancelResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

}

export class RentalServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getResourceStatus(
    request: GetResourceStatusRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ResourceStatus>;

  getUserStatus(
    request: GetUserStatusRequest,
    metadata: grpcWeb.Metadata
  ): Promise<UserStatus>;

  rentResource(
    request: RentResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

  returnResource(
    request: ReturnResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

  reserveResource(
    request: ReserveResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

  cancelResource(
    request: CancelResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

}


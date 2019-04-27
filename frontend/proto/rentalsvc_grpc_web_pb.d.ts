import * as grpcWeb from 'grpc-web';
import {
  CancelResourceRequest,
  GetResourceStatusRequest,
  RentResourceRequest,
  ReserveResourceRequest,
  ResourceStatus,
  ReturnResourceRequest} from './rentalsvc_pb';

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

  rentResource(
    request: RentResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void
  ): grpcWeb.ClientReadableStream<ResourceStatus>;

  returnResource(
    request: ReturnResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void
  ): grpcWeb.ClientReadableStream<ResourceStatus>;

  reserveResource(
    request: ReserveResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void
  ): grpcWeb.ClientReadableStream<ResourceStatus>;

  cancelResource(
    request: CancelResourceRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ResourceStatus) => void
  ): grpcWeb.ClientReadableStream<ResourceStatus>;

}

export class RentalServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getResourceStatus(
    request: GetResourceStatusRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ResourceStatus>;

  rentResource(
    request: RentResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ResourceStatus>;

  returnResource(
    request: ReturnResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ResourceStatus>;

  reserveResource(
    request: ReserveResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ResourceStatus>;

  cancelResource(
    request: CancelResourceRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ResourceStatus>;

}


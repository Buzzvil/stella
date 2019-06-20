import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class ResourceStatus extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getAvailability(): ResourceStatus.Availability;
  setAvailability(value: ResourceStatus.Availability): void;

  getHolder(): number;
  setHolder(value: number): void;

  getReservedUserIdsList(): Array<number>;
  setReservedUserIdsList(value: Array<number>): void;
  clearReservedUserIdsList(): void;
  addReservedUserIds(value: number, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceStatus): ResourceStatus.AsObject;
  static serializeBinaryToWriter(message: ResourceStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceStatus;
  static deserializeBinaryFromReader(message: ResourceStatus, reader: jspb.BinaryReader): ResourceStatus;
}

export namespace ResourceStatus {
  export type AsObject = {
    entityId: number,
    availability: ResourceStatus.Availability,
    holder: number,
    reservedUserIdsList: Array<number>,
  }

  export enum Availability { 
    AVAILABLE = 0,
    UNAVAILABLE = 1,
  }
}

export class GetResourceStatusRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResourceStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetResourceStatusRequest): GetResourceStatusRequest.AsObject;
  static serializeBinaryToWriter(message: GetResourceStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResourceStatusRequest;
  static deserializeBinaryFromReader(message: GetResourceStatusRequest, reader: jspb.BinaryReader): GetResourceStatusRequest;
}

export namespace GetResourceStatusRequest {
  export type AsObject = {
    entityId: number,
  }
}

export class RentResourceRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RentResourceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RentResourceRequest): RentResourceRequest.AsObject;
  static serializeBinaryToWriter(message: RentResourceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RentResourceRequest;
  static deserializeBinaryFromReader(message: RentResourceRequest, reader: jspb.BinaryReader): RentResourceRequest;
}

export namespace RentResourceRequest {
  export type AsObject = {
    entityId: number,
    userId: number,
  }
}

export class ReturnResourceRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReturnResourceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReturnResourceRequest): ReturnResourceRequest.AsObject;
  static serializeBinaryToWriter(message: ReturnResourceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReturnResourceRequest;
  static deserializeBinaryFromReader(message: ReturnResourceRequest, reader: jspb.BinaryReader): ReturnResourceRequest;
}

export namespace ReturnResourceRequest {
  export type AsObject = {
    entityId: number,
    userId: number,
  }
}

export class ReserveResourceRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReserveResourceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReserveResourceRequest): ReserveResourceRequest.AsObject;
  static serializeBinaryToWriter(message: ReserveResourceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReserveResourceRequest;
  static deserializeBinaryFromReader(message: ReserveResourceRequest, reader: jspb.BinaryReader): ReserveResourceRequest;
}

export namespace ReserveResourceRequest {
  export type AsObject = {
    entityId: number,
    userId: number,
  }
}

export class CancelResourceRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelResourceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CancelResourceRequest): CancelResourceRequest.AsObject;
  static serializeBinaryToWriter(message: CancelResourceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelResourceRequest;
  static deserializeBinaryFromReader(message: CancelResourceRequest, reader: jspb.BinaryReader): CancelResourceRequest;
}

export namespace CancelResourceRequest {
  export type AsObject = {
    entityId: number,
    userId: number,
  }
}


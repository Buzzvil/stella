export class Empty {
  constructor ();
  toObject(): Empty.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class CancelResourceRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): CancelResourceRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CancelResourceRequest;
}

export namespace CancelResourceRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
  }
}

export class GetResourceStatusRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  toObject(): GetResourceStatusRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetResourceStatusRequest;
}

export namespace GetResourceStatusRequest {
  export type AsObject = {
    EntityId: number;
  }
}

export class RentResourceRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): RentResourceRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RentResourceRequest;
}

export namespace RentResourceRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
  }
}

export class ReserveResourceRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): ReserveResourceRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ReserveResourceRequest;
}

export namespace ReserveResourceRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
  }
}

export class ResourceStatus {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getAvailability(): ResourceStatus.Availability;
  setAvailability(a: ResourceStatus.Availability): void;
  getHolder(): number;
  setHolder(a: number): void;
  getReservedUserIdsList(): number[];
  setReservedUserIdsList(a: number[]): void;
  toObject(): ResourceStatus.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ResourceStatus;
}

export namespace ResourceStatus {
  export type AsObject = {
    EntityId: number;
    Availability: ResourceStatus.Availability;
    Holder: number;
    ReservedUserIdsList: number[];
  }

  export enum Availability { 
    AVAILABLE = 0,
    UNAVAILABLE = 1,
  }
}

export class ReturnResourceRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): ReturnResourceRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ReturnResourceRequest;
}

export namespace ReturnResourceRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
  }
}


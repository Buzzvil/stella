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

export class GetUserStatusRequest {
  constructor ();
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): GetUserStatusRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetUserStatusRequest;
}

export namespace GetUserStatusRequest {
  export type AsObject = {
    UserId: number;
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

export class ResourceStatus {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getAvailability(): ResourceStatus.Availability;
  setAvailability(a: ResourceStatus.Availability): void;
  getHolder(): number;
  setHolder(a: number): void;
  getWatchingUserIdsList(): number[];
  setWatchingUserIdsList(a: number[]): void;
  toObject(): ResourceStatus.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ResourceStatus;
}

export namespace ResourceStatus {
  export type AsObject = {
    EntityId: number;
    Availability: ResourceStatus.Availability;
    Holder: number;
    WatchingUserIdsList: number[];
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

export class UnwatchResourceRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): UnwatchResourceRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UnwatchResourceRequest;
}

export namespace UnwatchResourceRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
  }
}

export class UserStatus {
  constructor ();
  getUserId(): number;
  setUserId(a: number): void;
  getRentedEntityIdsList(): number[];
  setRentedEntityIdsList(a: number[]): void;
  getWatchingEntityIdsList(): number[];
  setWatchingEntityIdsList(a: number[]): void;
  toObject(): UserStatus.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UserStatus;
}

export namespace UserStatus {
  export type AsObject = {
    UserId: number;
    RentedEntityIdsList: number[];
    WatchingEntityIdsList: number[];
  }
}

export class WatchResourceRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): WatchResourceRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => WatchResourceRequest;
}

export namespace WatchResourceRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
  }
}


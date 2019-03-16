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

export class DeleteRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): DeleteRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => DeleteRequest;
}

export namespace DeleteRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
  }
}

export class GetRatingRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  toObject(): GetRatingRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetRatingRequest;
}

export namespace GetRatingRequest {
  export type AsObject = {
    EntityId: number;
  }
}

export class Rating {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getRating(): number;
  setRating(a: number): void;
  toObject(): Rating.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Rating;
}

export namespace Rating {
  export type AsObject = {
    EntityId: number;
    Rating: number;
  }
}

export class UpsertRatingRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  getRating(): number;
  setRating(a: number): void;
  getComment(): string;
  setComment(a: string): void;
  toObject(): UpsertRatingRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UpsertRatingRequest;
}

export namespace UpsertRatingRequest {
  export type AsObject = {
    EntityId: number;
    UserId: number;
    Rating: number;
    Comment: string;
  }
}


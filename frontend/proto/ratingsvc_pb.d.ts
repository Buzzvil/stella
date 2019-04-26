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

export class GetRatingResponse {
  constructor ();
  getScore(): number;
  setScore(a: number): void;
  getCount(): number;
  setCount(a: number): void;
  toObject(): GetRatingResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetRatingResponse;
}

export namespace GetRatingResponse {
  export type AsObject = {
    Score: number;
    Count: number;
  }
}

export class GetUserRatingRequest {
  constructor ();
  getUserId(): number;
  setUserId(a: number): void;
  toObject(): GetUserRatingRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetUserRatingRequest;
}

export namespace GetUserRatingRequest {
  export type AsObject = {
    UserId: number;
  }
}

export class ListRatingsResponse {
  constructor ();
  getRatingsList(): Rating[];
  setRatingsList(a: Rating[]): void;
  toObject(): ListRatingsResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListRatingsResponse;
}

export namespace ListRatingsResponse {
  export type AsObject = {
    RatingsList: Rating[];
  }
}

export class Rating {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getScore(): number;
  setScore(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  getComment(): string;
  setComment(a: string): void;
  toObject(): Rating.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Rating;
}

export namespace Rating {
  export type AsObject = {
    EntityId: number;
    Score: number;
    UserId: number;
    Comment: string;
  }
}

export class UpsertRatingRequest {
  constructor ();
  getEntityId(): number;
  setEntityId(a: number): void;
  getUserId(): number;
  setUserId(a: number): void;
  getScore(): number;
  setScore(a: number): void;
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
    Score: number;
    Comment: string;
  }
}


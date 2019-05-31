import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class Rating extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getScore(): number;
  setScore(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Rating.AsObject;
  static toObject(includeInstance: boolean, msg: Rating): Rating.AsObject;
  static serializeBinaryToWriter(message: Rating, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Rating;
  static deserializeBinaryFromReader(message: Rating, reader: jspb.BinaryReader): Rating;
}

export namespace Rating {
  export type AsObject = {
    entityId: number,
    score: number,
    userId: number,
    comment: string,
  }
}

export class GetRatingRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRatingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRatingRequest): GetRatingRequest.AsObject;
  static serializeBinaryToWriter(message: GetRatingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRatingRequest;
  static deserializeBinaryFromReader(message: GetRatingRequest, reader: jspb.BinaryReader): GetRatingRequest;
}

export namespace GetRatingRequest {
  export type AsObject = {
    entityId: number,
  }
}

export class GetRatingResponse extends jspb.Message {
  getScore(): number;
  setScore(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRatingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRatingResponse): GetRatingResponse.AsObject;
  static serializeBinaryToWriter(message: GetRatingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRatingResponse;
  static deserializeBinaryFromReader(message: GetRatingResponse, reader: jspb.BinaryReader): GetRatingResponse;
}

export namespace GetRatingResponse {
  export type AsObject = {
    score: number,
    count: number,
  }
}

export class GetUserRatingRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRatingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRatingRequest): GetUserRatingRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserRatingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRatingRequest;
  static deserializeBinaryFromReader(message: GetUserRatingRequest, reader: jspb.BinaryReader): GetUserRatingRequest;
}

export namespace GetUserRatingRequest {
  export type AsObject = {
    userId: number,
  }
}

export class ListRatingsResponse extends jspb.Message {
  getRatingsList(): Array<Rating>;
  setRatingsList(value: Array<Rating>): void;
  clearRatingsList(): void;
  addRatings(value?: Rating, index?: number): Rating;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRatingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRatingsResponse): ListRatingsResponse.AsObject;
  static serializeBinaryToWriter(message: ListRatingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRatingsResponse;
  static deserializeBinaryFromReader(message: ListRatingsResponse, reader: jspb.BinaryReader): ListRatingsResponse;
}

export namespace ListRatingsResponse {
  export type AsObject = {
    ratingsList: Array<Rating.AsObject>,
  }
}

export class UpsertRatingRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  getScore(): number;
  setScore(value: number): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpsertRatingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpsertRatingRequest): UpsertRatingRequest.AsObject;
  static serializeBinaryToWriter(message: UpsertRatingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpsertRatingRequest;
  static deserializeBinaryFromReader(message: UpsertRatingRequest, reader: jspb.BinaryReader): UpsertRatingRequest;
}

export namespace UpsertRatingRequest {
  export type AsObject = {
    entityId: number,
    userId: number,
    score: number,
    comment: string,
  }
}

export class DeleteRequest extends jspb.Message {
  getEntityId(): number;
  setEntityId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRequest): DeleteRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRequest;
  static deserializeBinaryFromReader(message: DeleteRequest, reader: jspb.BinaryReader): DeleteRequest;
}

export namespace DeleteRequest {
  export type AsObject = {
    entityId: number,
    userId: number,
  }
}


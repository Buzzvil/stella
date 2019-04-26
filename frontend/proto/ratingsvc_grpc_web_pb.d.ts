import * as grpcWeb from 'grpc-web';
import {
  Empty,
  DeleteRequest,
  GetRatingRequest,
  GetRatingResponse,
  GetUserRatingRequest,
  ListRatingsResponse,
  Rating,
  UpsertRatingRequest} from './ratingsvc_pb';

export class RatingServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getRating(
    request: GetRatingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: GetRatingResponse) => void
  ): grpcWeb.ClientReadableStream<GetRatingResponse>;

  getUserRating(
    request: GetUserRatingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Rating) => void
  ): grpcWeb.ClientReadableStream<Rating>;

  listRatings(
    request: GetRatingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ListRatingsResponse) => void
  ): grpcWeb.ClientReadableStream<ListRatingsResponse>;

  listUserRatings(
    request: GetUserRatingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: ListRatingsResponse) => void
  ): grpcWeb.ClientReadableStream<ListRatingsResponse>;

  upsertRating(
    request: UpsertRatingRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Rating) => void
  ): grpcWeb.ClientReadableStream<Rating>;

  delete(
    request: DeleteRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

}

export class RatingServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getRating(
    request: GetRatingRequest,
    metadata: grpcWeb.Metadata
  ): Promise<GetRatingResponse>;

  getUserRating(
    request: GetUserRatingRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Rating>;

  listRatings(
    request: GetRatingRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ListRatingsResponse>;

  listUserRatings(
    request: GetUserRatingRequest,
    metadata: grpcWeb.Metadata
  ): Promise<ListRatingsResponse>;

  upsertRating(
    request: UpsertRatingRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Rating>;

  delete(
    request: DeleteRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

}


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  CreateUserRequest,
  GetCurrentUserRequest,
  GetUserRequest,
  ListUsersRequest,
  ListUsersResponse,
  User} from './usersvc_pb';

export class UserServiceClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getCurrentUser(
    request: GetCurrentUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

  getUser(
    request: GetUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

  listUsers(
    request: ListUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ListUsersResponse) => void
  ): grpcWeb.ClientReadableStream<ListUsersResponse>;

  createUser(
    request: CreateUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

}

export class UserServicePromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getCurrentUser(
    request: GetCurrentUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

  getUser(
    request: GetUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

  listUsers(
    request: ListUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ListUsersResponse>;

  createUser(
    request: CreateUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

}


export class CreateUserRequest {
  constructor ();
  getName(): string;
  setName(a: string): void;
  getSlackUserId(): string;
  setSlackUserId(a: string): void;
  getSlackTeamId(): string;
  setSlackTeamId(a: string): void;
  getImage(): string;
  setImage(a: string): void;
  toObject(): CreateUserRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CreateUserRequest;
}

export namespace CreateUserRequest {
  export type AsObject = {
    Name: string;
    SlackUserId: string;
    SlackTeamId: string;
    Image: string;
  }
}

export class GetCurrentUserRequest {
  constructor ();
  toObject(): GetCurrentUserRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetCurrentUserRequest;
}

export namespace GetCurrentUserRequest {
  export type AsObject = {
  }
}

export class GetUserRequest {
  constructor ();
  getId(): number;
  setId(a: number): void;
  getSlackUserId(): string;
  setSlackUserId(a: string): void;
  toObject(): GetUserRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
    Id: number;
    SlackUserId: string;
  }
}

export class ListUsersRequest {
  constructor ();
  getIdsList(): number[];
  setIdsList(a: number[]): void;
  toObject(): ListUsersRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListUsersRequest;
}

export namespace ListUsersRequest {
  export type AsObject = {
    IdsList: number[];
  }
}

export class ListUsersResponse {
  constructor ();
  getUsersList(): User[];
  setUsersList(a: User[]): void;
  toObject(): ListUsersResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListUsersResponse;
}

export namespace ListUsersResponse {
  export type AsObject = {
    UsersList: User[];
  }
}

export class User {
  constructor ();
  getId(): number;
  setId(a: number): void;
  getName(): string;
  setName(a: string): void;
  getSlackUserId(): string;
  setSlackUserId(a: string): void;
  getSlackTeamId(): string;
  setSlackTeamId(a: string): void;
  getImage(): string;
  setImage(a: string): void;
  toObject(): User.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => User;
}

export namespace User {
  export type AsObject = {
    Id: number;
    Name: string;
    SlackUserId: string;
    SlackTeamId: string;
    Image: string;
  }
}


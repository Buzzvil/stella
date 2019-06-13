/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
goog.exportSymbol('proto.stella.user.v1.CreateUserRequest', null, global);
goog.exportSymbol('proto.stella.user.v1.GetUserRequest', null, global);
goog.exportSymbol('proto.stella.user.v1.ListUsersRequest', null, global);
goog.exportSymbol('proto.stella.user.v1.ListUsersResponse', null, global);
goog.exportSymbol('proto.stella.user.v1.User', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stella.user.v1.User = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stella.user.v1.User, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.stella.user.v1.User.displayName = 'proto.stella.user.v1.User';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stella.user.v1.ListUsersRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.stella.user.v1.ListUsersRequest.repeatedFields_, null);
};
goog.inherits(proto.stella.user.v1.ListUsersRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.stella.user.v1.ListUsersRequest.displayName = 'proto.stella.user.v1.ListUsersRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stella.user.v1.ListUsersResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.stella.user.v1.ListUsersResponse.repeatedFields_, null);
};
goog.inherits(proto.stella.user.v1.ListUsersResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.stella.user.v1.ListUsersResponse.displayName = 'proto.stella.user.v1.ListUsersResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stella.user.v1.GetUserRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.stella.user.v1.GetUserRequest.oneofGroups_);
};
goog.inherits(proto.stella.user.v1.GetUserRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.stella.user.v1.GetUserRequest.displayName = 'proto.stella.user.v1.GetUserRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stella.user.v1.CreateUserRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stella.user.v1.CreateUserRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.stella.user.v1.CreateUserRequest.displayName = 'proto.stella.user.v1.CreateUserRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stella.user.v1.User.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.user.v1.User.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.user.v1.User} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.User.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    slackUserId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    slackTeamId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    image: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stella.user.v1.User}
 */
proto.stella.user.v1.User.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.user.v1.User;
  return proto.stella.user.v1.User.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.user.v1.User} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.user.v1.User}
 */
proto.stella.user.v1.User.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSlackUserId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSlackTeamId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setImage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stella.user.v1.User.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.user.v1.User.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.user.v1.User} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.User.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSlackUserId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSlackTeamId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getImage();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional int64 id = 1;
 * @return {number}
 */
proto.stella.user.v1.User.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.user.v1.User.prototype.setId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.stella.user.v1.User.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.stella.user.v1.User.prototype.setName = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string slack_user_id = 3;
 * @return {string}
 */
proto.stella.user.v1.User.prototype.getSlackUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.stella.user.v1.User.prototype.setSlackUserId = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string slack_team_id = 4;
 * @return {string}
 */
proto.stella.user.v1.User.prototype.getSlackTeamId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.stella.user.v1.User.prototype.setSlackTeamId = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string image = 5;
 * @return {string}
 */
proto.stella.user.v1.User.prototype.getImage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.stella.user.v1.User.prototype.setImage = function(value) {
  jspb.Message.setProto3StringField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.stella.user.v1.ListUsersRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stella.user.v1.ListUsersRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.user.v1.ListUsersRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.user.v1.ListUsersRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.ListUsersRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    idsList: jspb.Message.getRepeatedField(msg, 1)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stella.user.v1.ListUsersRequest}
 */
proto.stella.user.v1.ListUsersRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.user.v1.ListUsersRequest;
  return proto.stella.user.v1.ListUsersRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.user.v1.ListUsersRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.user.v1.ListUsersRequest}
 */
proto.stella.user.v1.ListUsersRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt64());
      msg.setIdsList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stella.user.v1.ListUsersRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.user.v1.ListUsersRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.user.v1.ListUsersRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.ListUsersRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      1,
      f
    );
  }
};


/**
 * repeated int64 ids = 1;
 * @return {!Array<number>}
 */
proto.stella.user.v1.ListUsersRequest.prototype.getIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/** @param {!Array<number>} value */
proto.stella.user.v1.ListUsersRequest.prototype.setIdsList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 */
proto.stella.user.v1.ListUsersRequest.prototype.addIds = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.stella.user.v1.ListUsersRequest.prototype.clearIdsList = function() {
  this.setIdsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.stella.user.v1.ListUsersResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stella.user.v1.ListUsersResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.user.v1.ListUsersResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.user.v1.ListUsersResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.ListUsersResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.stella.user.v1.User.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stella.user.v1.ListUsersResponse}
 */
proto.stella.user.v1.ListUsersResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.user.v1.ListUsersResponse;
  return proto.stella.user.v1.ListUsersResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.user.v1.ListUsersResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.user.v1.ListUsersResponse}
 */
proto.stella.user.v1.ListUsersResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.stella.user.v1.User;
      reader.readMessage(value,proto.stella.user.v1.User.deserializeBinaryFromReader);
      msg.addUsers(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stella.user.v1.ListUsersResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.user.v1.ListUsersResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.user.v1.ListUsersResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.ListUsersResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.stella.user.v1.User.serializeBinaryToWriter
    );
  }
};


/**
 * repeated User users = 1;
 * @return {!Array<!proto.stella.user.v1.User>}
 */
proto.stella.user.v1.ListUsersResponse.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.stella.user.v1.User>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.stella.user.v1.User, 1));
};


/** @param {!Array<!proto.stella.user.v1.User>} value */
proto.stella.user.v1.ListUsersResponse.prototype.setUsersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.stella.user.v1.User=} opt_value
 * @param {number=} opt_index
 * @return {!proto.stella.user.v1.User}
 */
proto.stella.user.v1.ListUsersResponse.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.stella.user.v1.User, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.stella.user.v1.ListUsersResponse.prototype.clearUsersList = function() {
  this.setUsersList([]);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.stella.user.v1.GetUserRequest.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.stella.user.v1.GetUserRequest.IdentifierCase = {
  IDENTIFIER_NOT_SET: 0,
  ID: 1,
  SLACK_USER_ID: 2
};

/**
 * @return {proto.stella.user.v1.GetUserRequest.IdentifierCase}
 */
proto.stella.user.v1.GetUserRequest.prototype.getIdentifierCase = function() {
  return /** @type {proto.stella.user.v1.GetUserRequest.IdentifierCase} */(jspb.Message.computeOneofCase(this, proto.stella.user.v1.GetUserRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stella.user.v1.GetUserRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.user.v1.GetUserRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.user.v1.GetUserRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.GetUserRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    slackUserId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stella.user.v1.GetUserRequest}
 */
proto.stella.user.v1.GetUserRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.user.v1.GetUserRequest;
  return proto.stella.user.v1.GetUserRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.user.v1.GetUserRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.user.v1.GetUserRequest}
 */
proto.stella.user.v1.GetUserRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSlackUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stella.user.v1.GetUserRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.user.v1.GetUserRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.user.v1.GetUserRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.GetUserRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int64 id = 1;
 * @return {number}
 */
proto.stella.user.v1.GetUserRequest.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.user.v1.GetUserRequest.prototype.setId = function(value) {
  jspb.Message.setOneofField(this, 1, proto.stella.user.v1.GetUserRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.stella.user.v1.GetUserRequest.prototype.clearId = function() {
  jspb.Message.setOneofField(this, 1, proto.stella.user.v1.GetUserRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.stella.user.v1.GetUserRequest.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string slack_user_id = 2;
 * @return {string}
 */
proto.stella.user.v1.GetUserRequest.prototype.getSlackUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.stella.user.v1.GetUserRequest.prototype.setSlackUserId = function(value) {
  jspb.Message.setOneofField(this, 2, proto.stella.user.v1.GetUserRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 */
proto.stella.user.v1.GetUserRequest.prototype.clearSlackUserId = function() {
  jspb.Message.setOneofField(this, 2, proto.stella.user.v1.GetUserRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.stella.user.v1.GetUserRequest.prototype.hasSlackUserId = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stella.user.v1.CreateUserRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.user.v1.CreateUserRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.user.v1.CreateUserRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.CreateUserRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    slackUserId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    slackTeamId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    image: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stella.user.v1.CreateUserRequest}
 */
proto.stella.user.v1.CreateUserRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.user.v1.CreateUserRequest;
  return proto.stella.user.v1.CreateUserRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.user.v1.CreateUserRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.user.v1.CreateUserRequest}
 */
proto.stella.user.v1.CreateUserRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSlackUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSlackTeamId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setImage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stella.user.v1.CreateUserRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.user.v1.CreateUserRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.user.v1.CreateUserRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.user.v1.CreateUserRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSlackUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSlackTeamId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getImage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.stella.user.v1.CreateUserRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.stella.user.v1.CreateUserRequest.prototype.setName = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string slack_user_id = 2;
 * @return {string}
 */
proto.stella.user.v1.CreateUserRequest.prototype.getSlackUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.stella.user.v1.CreateUserRequest.prototype.setSlackUserId = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string slack_team_id = 3;
 * @return {string}
 */
proto.stella.user.v1.CreateUserRequest.prototype.getSlackTeamId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.stella.user.v1.CreateUserRequest.prototype.setSlackTeamId = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string image = 4;
 * @return {string}
 */
proto.stella.user.v1.CreateUserRequest.prototype.getImage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.stella.user.v1.CreateUserRequest.prototype.setImage = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


goog.object.extend(exports, proto.stella.user.v1);
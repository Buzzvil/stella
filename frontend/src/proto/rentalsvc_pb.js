/* eslint-disable *//* eslint-disable *//**
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

goog.exportSymbol('proto.stella.rental.v1.CancelResourceRequest', null, global);
goog.exportSymbol('proto.stella.rental.v1.GetResourceStatusRequest', null, global);
goog.exportSymbol('proto.stella.rental.v1.RentResourceRequest', null, global);
goog.exportSymbol('proto.stella.rental.v1.ReserveResourceRequest', null, global);
goog.exportSymbol('proto.stella.rental.v1.ResourceStatus', null, global);
goog.exportSymbol('proto.stella.rental.v1.ResourceStatus.Availability', null, global);
goog.exportSymbol('proto.stella.rental.v1.ReturnResourceRequest', null, global);

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
proto.stella.rental.v1.ResourceStatus = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.stella.rental.v1.ResourceStatus.repeatedFields_, null);
};
goog.inherits(proto.stella.rental.v1.ResourceStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stella.rental.v1.ResourceStatus.displayName = 'proto.stella.rental.v1.ResourceStatus';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.stella.rental.v1.ResourceStatus.repeatedFields_ = [3];



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
proto.stella.rental.v1.ResourceStatus.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.rental.v1.ResourceStatus.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.rental.v1.ResourceStatus} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.ResourceStatus.toObject = function(includeInstance, msg) {
  var f, obj = {
    entityId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    availability: jspb.Message.getFieldWithDefault(msg, 2, 0),
    reservedUserIdsList: jspb.Message.getRepeatedField(msg, 3)
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
 * @return {!proto.stella.rental.v1.ResourceStatus}
 */
proto.stella.rental.v1.ResourceStatus.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.rental.v1.ResourceStatus;
  return proto.stella.rental.v1.ResourceStatus.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.rental.v1.ResourceStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.rental.v1.ResourceStatus}
 */
proto.stella.rental.v1.ResourceStatus.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEntityId(value);
      break;
    case 2:
      var value = /** @type {!proto.stella.rental.v1.ResourceStatus.Availability} */ (reader.readEnum());
      msg.setAvailability(value);
      break;
    case 3:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt64());
      msg.setReservedUserIdsList(value);
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
proto.stella.rental.v1.ResourceStatus.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.rental.v1.ResourceStatus.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.rental.v1.ResourceStatus} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.ResourceStatus.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEntityId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getAvailability();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getReservedUserIdsList();
  if (f.length > 0) {
    writer.writePackedInt64(
      3,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.stella.rental.v1.ResourceStatus.Availability = {
  AVAILABLE: 0,
  UNAVAILABLE: 1
};

/**
 * optional int64 entity_id = 1;
 * @return {number}
 */
proto.stella.rental.v1.ResourceStatus.prototype.getEntityId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.rental.v1.ResourceStatus.prototype.setEntityId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional Availability availability = 2;
 * @return {!proto.stella.rental.v1.ResourceStatus.Availability}
 */
proto.stella.rental.v1.ResourceStatus.prototype.getAvailability = function() {
  return /** @type {!proto.stella.rental.v1.ResourceStatus.Availability} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {!proto.stella.rental.v1.ResourceStatus.Availability} value */
proto.stella.rental.v1.ResourceStatus.prototype.setAvailability = function(value) {
  jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * repeated int64 reserved_user_ids = 3;
 * @return {!Array<number>}
 */
proto.stella.rental.v1.ResourceStatus.prototype.getReservedUserIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 3));
};


/** @param {!Array<number>} value */
proto.stella.rental.v1.ResourceStatus.prototype.setReservedUserIdsList = function(value) {
  jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.stella.rental.v1.ResourceStatus.prototype.addReservedUserIds = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


proto.stella.rental.v1.ResourceStatus.prototype.clearReservedUserIdsList = function() {
  this.setReservedUserIdsList([]);
};



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
proto.stella.rental.v1.GetResourceStatusRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stella.rental.v1.GetResourceStatusRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stella.rental.v1.GetResourceStatusRequest.displayName = 'proto.stella.rental.v1.GetResourceStatusRequest';
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
proto.stella.rental.v1.GetResourceStatusRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.rental.v1.GetResourceStatusRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.rental.v1.GetResourceStatusRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.GetResourceStatusRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    entityId: jspb.Message.getFieldWithDefault(msg, 1, 0)
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
 * @return {!proto.stella.rental.v1.GetResourceStatusRequest}
 */
proto.stella.rental.v1.GetResourceStatusRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.rental.v1.GetResourceStatusRequest;
  return proto.stella.rental.v1.GetResourceStatusRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.rental.v1.GetResourceStatusRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.rental.v1.GetResourceStatusRequest}
 */
proto.stella.rental.v1.GetResourceStatusRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEntityId(value);
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
proto.stella.rental.v1.GetResourceStatusRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.rental.v1.GetResourceStatusRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.rental.v1.GetResourceStatusRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.GetResourceStatusRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEntityId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
};


/**
 * optional int64 entity_id = 1;
 * @return {number}
 */
proto.stella.rental.v1.GetResourceStatusRequest.prototype.getEntityId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.rental.v1.GetResourceStatusRequest.prototype.setEntityId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};



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
proto.stella.rental.v1.RentResourceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stella.rental.v1.RentResourceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stella.rental.v1.RentResourceRequest.displayName = 'proto.stella.rental.v1.RentResourceRequest';
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
proto.stella.rental.v1.RentResourceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.rental.v1.RentResourceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.rental.v1.RentResourceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.RentResourceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    entityId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userId: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.stella.rental.v1.RentResourceRequest}
 */
proto.stella.rental.v1.RentResourceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.rental.v1.RentResourceRequest;
  return proto.stella.rental.v1.RentResourceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.rental.v1.RentResourceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.rental.v1.RentResourceRequest}
 */
proto.stella.rental.v1.RentResourceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEntityId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUserId(value);
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
proto.stella.rental.v1.RentResourceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.rental.v1.RentResourceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.rental.v1.RentResourceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.RentResourceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEntityId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 entity_id = 1;
 * @return {number}
 */
proto.stella.rental.v1.RentResourceRequest.prototype.getEntityId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.rental.v1.RentResourceRequest.prototype.setEntityId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 user_id = 2;
 * @return {number}
 */
proto.stella.rental.v1.RentResourceRequest.prototype.getUserId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.stella.rental.v1.RentResourceRequest.prototype.setUserId = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



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
proto.stella.rental.v1.ReturnResourceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stella.rental.v1.ReturnResourceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stella.rental.v1.ReturnResourceRequest.displayName = 'proto.stella.rental.v1.ReturnResourceRequest';
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
proto.stella.rental.v1.ReturnResourceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.rental.v1.ReturnResourceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.rental.v1.ReturnResourceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.ReturnResourceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    entityId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userId: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.stella.rental.v1.ReturnResourceRequest}
 */
proto.stella.rental.v1.ReturnResourceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.rental.v1.ReturnResourceRequest;
  return proto.stella.rental.v1.ReturnResourceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.rental.v1.ReturnResourceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.rental.v1.ReturnResourceRequest}
 */
proto.stella.rental.v1.ReturnResourceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEntityId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUserId(value);
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
proto.stella.rental.v1.ReturnResourceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.rental.v1.ReturnResourceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.rental.v1.ReturnResourceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.ReturnResourceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEntityId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 entity_id = 1;
 * @return {number}
 */
proto.stella.rental.v1.ReturnResourceRequest.prototype.getEntityId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.rental.v1.ReturnResourceRequest.prototype.setEntityId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 user_id = 2;
 * @return {number}
 */
proto.stella.rental.v1.ReturnResourceRequest.prototype.getUserId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.stella.rental.v1.ReturnResourceRequest.prototype.setUserId = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



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
proto.stella.rental.v1.ReserveResourceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stella.rental.v1.ReserveResourceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stella.rental.v1.ReserveResourceRequest.displayName = 'proto.stella.rental.v1.ReserveResourceRequest';
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
proto.stella.rental.v1.ReserveResourceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.rental.v1.ReserveResourceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.rental.v1.ReserveResourceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.ReserveResourceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    entityId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userId: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.stella.rental.v1.ReserveResourceRequest}
 */
proto.stella.rental.v1.ReserveResourceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.rental.v1.ReserveResourceRequest;
  return proto.stella.rental.v1.ReserveResourceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.rental.v1.ReserveResourceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.rental.v1.ReserveResourceRequest}
 */
proto.stella.rental.v1.ReserveResourceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEntityId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUserId(value);
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
proto.stella.rental.v1.ReserveResourceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.rental.v1.ReserveResourceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.rental.v1.ReserveResourceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.ReserveResourceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEntityId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 entity_id = 1;
 * @return {number}
 */
proto.stella.rental.v1.ReserveResourceRequest.prototype.getEntityId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.rental.v1.ReserveResourceRequest.prototype.setEntityId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 user_id = 2;
 * @return {number}
 */
proto.stella.rental.v1.ReserveResourceRequest.prototype.getUserId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.stella.rental.v1.ReserveResourceRequest.prototype.setUserId = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



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
proto.stella.rental.v1.CancelResourceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stella.rental.v1.CancelResourceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stella.rental.v1.CancelResourceRequest.displayName = 'proto.stella.rental.v1.CancelResourceRequest';
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
proto.stella.rental.v1.CancelResourceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.stella.rental.v1.CancelResourceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stella.rental.v1.CancelResourceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.CancelResourceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    entityId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userId: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.stella.rental.v1.CancelResourceRequest}
 */
proto.stella.rental.v1.CancelResourceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stella.rental.v1.CancelResourceRequest;
  return proto.stella.rental.v1.CancelResourceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stella.rental.v1.CancelResourceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stella.rental.v1.CancelResourceRequest}
 */
proto.stella.rental.v1.CancelResourceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setEntityId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUserId(value);
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
proto.stella.rental.v1.CancelResourceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stella.rental.v1.CancelResourceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stella.rental.v1.CancelResourceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stella.rental.v1.CancelResourceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEntityId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 entity_id = 1;
 * @return {number}
 */
proto.stella.rental.v1.CancelResourceRequest.prototype.getEntityId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.stella.rental.v1.CancelResourceRequest.prototype.setEntityId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 user_id = 2;
 * @return {number}
 */
proto.stella.rental.v1.CancelResourceRequest.prototype.getUserId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.stella.rental.v1.CancelResourceRequest.prototype.setUserId = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


goog.object.extend(exports, proto.stella.rental.v1);

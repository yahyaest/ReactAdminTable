"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateProperty = exports.validate = exports.setValidationProperty = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _joiBrowser = _interopRequireDefault(require("joi-browser"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var setValidationProperty = function setValidationProperty(object, property, propertyType) {
  if (property === "email") {
    object["".concat(property)] = _joiBrowser.default.string().required().email().label("".concat(property));
  } else {
    if (propertyType === "string") object["".concat(property)] = _joiBrowser.default.string().required().label("".concat(property));
    if (propertyType === "number") object["".concat(property)] = _joiBrowser.default.number().required().label("".concat(property));
    if (propertyType === "object") object["".concat(property.split(".")[0])] = _joiBrowser.default.object().required().label("".concat(property.split(".")[0]));
    if (propertyType === "boolean") object["".concat(property)] = _joiBrowser.default.boolean().required().label("".concat(property));
    if (propertyType === "date") object["".concat(property)] = _joiBrowser.default.date().required().label("".concat(property));
  }
};

exports.setValidationProperty = setValidationProperty;

var validate = function validate(formSchema, formData) {
  var options = {
    abortEarly: false
  };

  var _Joi$validate = _joiBrowser.default.validate(formData, formSchema, options),
      error = _Joi$validate.error;

  if (!error) return null;
  var errors = {};

  var _iterator = _createForOfIteratorHelper(error.details),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      errors[item.path[0]] = item.message;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return errors;
};

exports.validate = validate;

var validateProperty = function validateProperty(formSchema, _ref) {
  var name = _ref.name,
      value = _ref.value;
  var obj = (0, _defineProperty2.default)({}, name, value);
  var schema = (0, _defineProperty2.default)({}, name, formSchema[name]);

  var _Joi$validate2 = _joiBrowser.default.validate(obj, schema),
      error = _Joi$validate2.error;

  return error ? error.details[0].message : null;
};

exports.validateProperty = validateProperty;
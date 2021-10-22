"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var Select = function Select(_ref) {
  var name = _ref.name,
      label = _ref.label,
      options = _ref.options,
      handleChange = _ref.handleChange,
      error = _ref.error,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["name", "label", "options", "handleChange", "error"]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: name
  }, label), /*#__PURE__*/_react.default.createElement("select", (0, _extends2.default)({
    name: name,
    id: name
  }, rest, {
    className: "form-control",
    onChange: handleChange
  }), /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }), options.map(function (option) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: option + name,
      value: option
    }, option);
  })));
};

var _default = Select;
exports.default = _default;
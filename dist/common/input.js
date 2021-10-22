"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

function Input(props) {
  var controlId = props.controlId,
      label = props.label,
      name = props.name,
      type = props.type,
      value = props.value,
      handleChange = props.handleChange;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, {
    controlId: controlId,
    className: "mb-3"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, null, label), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
    defaultValue: value,
    type: type,
    name: name,
    placeholder: "Enter ".concat(label),
    onChange: handleChange
  })));
}

var _default = Input;
exports.default = _default;
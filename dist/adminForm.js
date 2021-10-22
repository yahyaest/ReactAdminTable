"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _adminFormDefault = _interopRequireDefault(require("./adminFormDefault"));

var _adminFormAlternative = _interopRequireDefault(require("./adminFormAlternative"));

function AdminForm(props) {
  var currentId = isNaN(props.match.params.id) ? props.match.params.id : Number(props.match.params.id);
  var tableName = props.match.params.tableName;
  var url = props.match.url;

  var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showDefaultPage = _useState2[0],
      setShowDefaultPage = _useState2[1];

  return /*#__PURE__*/_react.default.createElement("div", null, showDefaultPage ? /*#__PURE__*/_react.default.createElement(_adminFormDefault.default, {
    currentId: currentId,
    tableName: tableName,
    url: url,
    handleShow: setShowDefaultPage
  }) : /*#__PURE__*/_react.default.createElement(_adminFormAlternative.default, {
    currentId: currentId,
    tableName: tableName,
    url: url,
    handleShow: setShowDefaultPage
  }));
}

var _default = AdminForm;
exports.default = _default;
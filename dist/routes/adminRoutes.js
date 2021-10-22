"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminCreateRoutes = exports.AdminUpdateRoutes = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _adminForm = _interopRequireDefault(require("../adminForm"));

var AdminUpdateRoutes = /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
  path: "/admin/:tableName/:id",
  component: _adminForm.default
});

exports.AdminUpdateRoutes = AdminUpdateRoutes;

var AdminCreateRoutes = /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
  path: "/admin/:tableName/new",
  component: _adminForm.default
});

exports.AdminCreateRoutes = AdminCreateRoutes;
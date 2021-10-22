"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _reactBootstrap = require("react-bootstrap");

var _reactRouterDom = require("react-router-dom");

function AdminNavbar(props) {
  var _currentTable$data2, _currentTable$data3, _currentTable$data4, _currentTable$data5, _currentTable$data6;

  AdminNavbar.prototype = {
    currentTable: _propTypes.PropTypes.object.isRequired
  };
  var currentTable = props.currentTable,
      handleSearch = props.handleSearch,
      search = props.search;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("nav", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "admin__navbar"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-list-ul list_icon",
    onClick: function onClick() {
      var _currentTable$data;

      var icon = document.querySelector(".list_icon");
      icon.classList.toggle("list_icon_clicked");

      if (currentTable !== null && currentTable !== void 0 && (_currentTable$data = currentTable.data) !== null && _currentTable$data !== void 0 && _currentTable$data.icon) {
        var slidebar = document.querySelector(".slideBar");
        slidebar.classList.toggle("slideBar_reduced");
        var slidebarTitle = document.querySelectorAll(".slideBar__title");
        slidebarTitle.forEach(function (element) {
          element.classList.toggle("slideBar__title__removed");
        });
      }
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "current__table"
  }, /*#__PURE__*/_react.default.createElement("p", null, currentTable === null || currentTable === void 0 ? void 0 : (_currentTable$data2 = currentTable.data) === null || _currentTable$data2 === void 0 ? void 0 : _currentTable$data2.name)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup, {
    className: "mb-3 search__form"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
    placeholder: currentTable !== null && currentTable !== void 0 && (_currentTable$data3 = currentTable.data) !== null && _currentTable$data3 !== void 0 && _currentTable$data3.name ? "Search ".concat(currentTable === null || currentTable === void 0 ? void 0 : (_currentTable$data4 = currentTable.data) === null || _currentTable$data4 === void 0 ? void 0 : _currentTable$data4.name) : "",
    "aria-label": currentTable !== null && currentTable !== void 0 && (_currentTable$data5 = currentTable.data) !== null && _currentTable$data5 !== void 0 && _currentTable$data5.name ? "Search ".concat(currentTable === null || currentTable === void 0 ? void 0 : (_currentTable$data6 = currentTable.data) === null || _currentTable$data6 === void 0 ? void 0 : _currentTable$data6.name) : "",
    "aria-describedby": "basic-addon2",
    value: search,
    onChange: handleSearch
  }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup.Append, null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-search search__icon"
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    className: "admin__exit"
  }, "Exit Admin")))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTable: state.admin.currentTable
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {})(AdminNavbar);

exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _selector = _interopRequireDefault(require("./common/selector"));

var _fileExport = require("./services/fileExport");

function AdminMenu(props) {
  var _currentTable$data;

  AdminMenu.prototype = {
    currentTable: _propTypes.PropTypes.object.isRequired,
    createButton: _propTypes.PropTypes.bool.isRequired
  };

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var currentTable = props.currentTable,
      createButton = props.createButton,
      filterSelector = props.filterSelector,
      filters = props.filters,
      currentFilter = props.currentFilter,
      handleFilter = props.handleFilter,
      currentOption = props.currentOption,
      handleOption = props.handleOption,
      filterOptions = props.filterOptions,
      resetCurrentOption = props.resetCurrentOption;
  var history = (0, _reactRouterDom.useHistory)();
  var dataToDownload = currentTable === null || currentTable === void 0 ? void 0 : (_currentTable$data = currentTable.data) === null || _currentTable$data === void 0 ? void 0 : _currentTable$data.table;
  return /*#__PURE__*/_react.default.createElement("div", null, createButton && /*#__PURE__*/_react.default.createElement("div", {
    className: "menu__bar"
  }, filterSelector && /*#__PURE__*/_react.default.createElement(_selector.default, {
    filters: filterOptions,
    filterType: "filterOptions",
    currentFilter: currentFilter,
    handleFilter: handleFilter,
    currentOption: currentOption,
    handleOption: handleOption,
    filterOptions: filterOptions,
    resetCurrentOption: resetCurrentOption
  }), /*#__PURE__*/_react.default.createElement(_selector.default, {
    filters: filters,
    filterType: "filterList",
    currentFilter: currentFilter,
    handleFilter: handleFilter,
    currentOption: currentOption,
    handleOption: handleOption,
    filterOptions: filterOptions,
    resetCurrentOption: resetCurrentOption
  }), (currentTable === null || currentTable === void 0 ? void 0 : currentTable.elementAdd) && /*#__PURE__*/_react.default.createElement("div", {
    className: "new__item",
    onClick: function onClick() {
      var _currentTable$data2;

      return history.push("/admin/".concat(currentTable === null || currentTable === void 0 ? void 0 : (_currentTable$data2 = currentTable.data) === null || _currentTable$data2 === void 0 ? void 0 : _currentTable$data2.name, "/new"));
    }
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-plus-circle"
  }), "Add new"), /*#__PURE__*/_react.default.createElement("div", {
    className: "export__data",
    onClick: function onClick() {
      return setShow(!show);
    }
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-download"
  }), "Export", show && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "export__json"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "a",
    id: "download_json",
    style: {
      textDecoration: "none",
      color: "black"
    },
    onClick: function onClick() {
      (0, _fileExport.exportToJsonFile)(dataToDownload, "download_json", currentTable.data.name);
    }
  }, "JSON")), /*#__PURE__*/_react.default.createElement("div", {
    className: "export__csv"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "a",
    id: "download_csv",
    style: {
      textDecoration: "none",
      color: "black"
    },
    onClick: function onClick() {
      (0, _fileExport.exportToCsvFile)(dataToDownload, "download_csv", currentTable.data.name);
    }
  }, "CSV"))))));
}

var mapStateToProps = function mapStateToProps(state) {
  var _state$admin$tableSta, _state$admin$tableSta2;

  return {
    currentTable: state.admin.currentTable,
    createButton: (_state$admin$tableSta = state.admin.tableStates) === null || _state$admin$tableSta === void 0 ? void 0 : _state$admin$tableSta.createButton,
    filterSelector: (_state$admin$tableSta2 = state.admin.tableStates) === null || _state$admin$tableSta2 === void 0 ? void 0 : _state$admin$tableSta2.filterSelector
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {})(AdminMenu);

exports.default = _default;
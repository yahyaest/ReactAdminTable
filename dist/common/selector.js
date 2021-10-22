"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _reactBootstrap = require("react-bootstrap");

var _admin = require("../redux/admin");

function Selector(props) {
  Selector.prototype = {
    currentTable: _propTypes.PropTypes.object.isRequired,
    filterSelectorShowed: _propTypes.PropTypes.func.isRequired,
    filterSelectorHided: _propTypes.PropTypes.func.isRequired
  };
  var currentTable = props.currentTable,
      filterSelectorShowed = props.filterSelectorShowed,
      filterSelectorHided = props.filterSelectorHided,
      filters = props.filters,
      currentFilter = props.currentFilter,
      filterType = props.filterType,
      handleFilter = props.handleFilter,
      currentOption = props.currentOption,
      handleOption = props.handleOption,
      filterOptions = props.filterOptions,
      resetCurrentOption = props.resetCurrentOption;

  var _useState = (0, _react.useState)(filters),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  (0, _react.useEffect)(function () {
    var getOption = function getOption() {
      if (filterType === "filterList") setOptions(filters);
      if (filterType === "filterOptions") setOptions(filterOptions(currentFilter));
    };

    getOption();
    if (!(currentTable !== null && currentTable !== void 0 && currentTable.filters)) filterSelectorHided();
  }, [filters, currentFilter]);
  return /*#__PURE__*/_react.default.createElement("div", null, filters && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Toggle, {
    variant: "light",
    id: "dropdown-basic",
    size: "sm"
  }, currentFilter === "Filters" && /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-filter"
  }), filterType === "filterList" ? currentFilter : currentOption === true ? "true" : currentOption === false ? "false" : currentOption), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Menu, null, options === null || options === void 0 ? void 0 : options.map(function (filter) {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
      key: filterType + filter,
      onClick: function onClick() {
        filterSelectorShowed();

        if (filterType === "filterList") {
          handleFilter(filter);
          resetCurrentOption("Options");
        }

        if (filterType === "filterOptions") {
          handleOption(filter);
        }
      }
    }, filter === true ? "true" : filter === false ? "false" : filter);
  }))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTable: state.admin.currentTable
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  filterSelectorShowed: _admin.filterSelectorShowed,
  filterSelectorHided: _admin.filterSelectorHided
})(Selector);

exports.default = _default;
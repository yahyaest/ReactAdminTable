"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _reactRouterDom = require("react-router-dom");

var _reactBootstrap = require("react-bootstrap");

var _reactToastify = require("react-toastify");

var _dataModeling = require("./services/dataModeling");

var _sleepFunction = require("./services/sleepFunction");

function AdminTable(props) {
  AdminTable.prototype = {
    currentTable: _propTypes.PropTypes.object.isRequired
  };
  var tables = props.tables,
      currentTable = props.currentTable,
      onSort = props.onSort,
      onPageChange = props.onPageChange,
      renderSortIcon = props.renderSortIcon,
      modelData = props.modelData;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      tableAttributes = _useState2[0],
      setTableAttributes = _useState2[1];

  var history = (0, _reactRouterDom.useHistory)();

  var getAttibutes = function getAttibutes() {
    var _attributes;

    var attributes = currentTable === null || currentTable === void 0 ? void 0 : currentTable.tableAttributes;
    attributes = (_attributes = attributes) === null || _attributes === void 0 ? void 0 : _attributes.filter(function (attribute) {
      return attribute.display === "table" || attribute.display === "table/form";
    });
    setTableAttributes(attributes);
    return attributes;
  };

  (0, _react.useEffect)(function () {
    getAttibutes();
  }, [currentTable]);

  var handleDelete = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
      var elementDeleted;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return currentTable.elementDelete(id);

            case 2:
              elementDeleted = _context.sent;

              if (elementDeleted && !(elementDeleted !== null && elementDeleted !== void 0 && elementDeleted.isError)) {
                onPageChange(1);

                _reactToastify.toast.dark("Item deleted successfully.");
              } else if (elementDeleted && elementDeleted !== null && elementDeleted !== void 0 && elementDeleted.isError) {
                _reactToastify.toast.error(elementDeleted === null || elementDeleted === void 0 ? void 0 : elementDeleted.errorMessage);
              } else {
                onPageChange(1);
              }

              _context.next = 6;
              return (0, _sleepFunction.sleepTime)(2000);

            case 6:
              window.location.reload();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleDelete(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Table // striped
  , {
    bordered: true,
    hover: true,
    variant: "light",
    size: "sm",
    responsive: "md",
    className: "admin__table",
    style: {
      width: "80%",
      margin: "0 auto",
      textAlign: "center",
      borderRadius: "10px",
      borderStyle: "hidden",
      borderCollapse: "collapse",
      overflow: "hidden"
    }
  }, /*#__PURE__*/_react.default.createElement("thead", {
    className: "thead-dark"
  }, /*#__PURE__*/_react.default.createElement("tr", null, tableAttributes === null || tableAttributes === void 0 ? void 0 : tableAttributes.map(function (column) {
    return /*#__PURE__*/_react.default.createElement("th", {
      key: column.title,
      onClick: function onClick() {
        return onSort(column.title);
      },
      style: {
        cursor: "pointer",
        color: "white",
        backgroundColor: "#343a40"
      }
    }, column.label, renderSortIcon(column.title));
  }), (currentTable === null || currentTable === void 0 ? void 0 : currentTable.elementUpdate) && /*#__PURE__*/_react.default.createElement("th", {
    style: {
      color: "white",
      backgroundColor: "#343a40"
    }
  }, "update"), (currentTable === null || currentTable === void 0 ? void 0 : currentTable.elementDelete) && /*#__PURE__*/_react.default.createElement("th", {
    style: {
      color: "white",
      backgroundColor: "#343a40"
    }
  }, "delete"))), /*#__PURE__*/_react.default.createElement("tbody", null, modelData === null || modelData === void 0 ? void 0 : modelData.map(function (element) {
    var _currentTable$data;

    return /*#__PURE__*/_react.default.createElement("tr", {
      key: element.id || element._id
    }, tableAttributes === null || tableAttributes === void 0 ? void 0 : tableAttributes.map(function (column) {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: column.title,
        className: column.urlForm ? "cellule__link" : "",
        onClick: function onClick() {
          if (column.urlForm) {
            var url = (0, _dataModeling.getPropertyUrl)(element, column.urlForm);
            history.push(url);
          }
        }
      }, (0, _dataModeling.getTableCelluleData)(tables, currentTable, element, column));
    }), (currentTable === null || currentTable === void 0 ? void 0 : currentTable.elementUpdate) && /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/admin/".concat(currentTable === null || currentTable === void 0 ? void 0 : (_currentTable$data = currentTable.data) === null || _currentTable$data === void 0 ? void 0 : _currentTable$data.name, "/").concat(element.id || element._id, "/"),
      className: "btn btn-warning btn-sm"
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-edit",
      style: {
        marginRight: "3px"
      }
    }), "Update")), (currentTable === null || currentTable === void 0 ? void 0 : currentTable.elementDelete) && /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "danger",
      size: "sm",
      onClick: function onClick() {
        return handleDelete(element.id || element._id);
      }
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-trash",
      style: {
        marginRight: "3px"
      }
    }), "Delete")));
  }))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTable: state.admin.currentTable,
    tables: state.admin.tables
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {})(AdminTable);

exports.default = _default;
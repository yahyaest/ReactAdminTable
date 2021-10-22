"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _admin = require("./redux/admin");

function ListTable(props) {
  ListTable.prototype = {
    tables: _propTypes.PropTypes.array.isRequired,
    addTable: _propTypes.PropTypes.func.isRequired
  };
  var tables = props.tables,
      addTable = props.addTable,
      data = props.data,
      tableAttributes = props.tableAttributes,
      search = props.search,
      filters = props.filters,
      elementAdd = props.elementAdd,
      elementUpdate = props.elementUpdate,
      elementDelete = props.elementDelete;

  var tableExist = function tableExist(tableName) {
    var tableIndex = tables.findIndex(function (table) {
      return table.data.name === tableName;
    });
    return tableIndex;
  };

  (0, _react.useEffect)(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (tableExist(data.name) === -1 && data.table.length > 0) addTable(data, tableAttributes, search, filters, elementAdd, elementUpdate, elementDelete);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();
  }, [data.table]);
  return /*#__PURE__*/_react.default.createElement("div", null);
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    tables: state.admin.tables
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  addTable: _admin.addTable
})(ListTable);

exports.default = _default;
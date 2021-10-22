"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSelectorHided = exports.filterSelectorShowed = exports.createButtonHided = exports.createButtonShowed = exports.updateTable = exports.addTable = exports.loadTable = exports.loadTables = exports.default = exports.hideFilterSelector = exports.showFilterSelector = exports.hideCreateButton = exports.showCreateButton = exports.tableRemoved = exports.tableUpdated = exports.tableLoaded = exports.tablesLoaded = exports.tableAdded = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toolkit = require("@reduxjs/toolkit");

var slice = (0, _toolkit.createSlice)({
  name: "admin",
  initialState: {
    tables: [],
    currentTable: {},
    tableStates: {
      createButton: false,
      filterSelector: false
    }
  },
  reducers: {
    tableAdded: function tableAdded(tables, action) {
      tables.tables.push(action.payload);
    },
    tablesLoaded: function tablesLoaded(tables, action) {
      tables.tables = action.payload;
    },
    tableLoaded: function tableLoaded(tables, action) {
      tables.currentTable = action.payload;
    },
    tableUpdated: function tableUpdated(tables, action) {
      var index = tables.tables.findIndex(function (table) {
        return table.data.name === action.tableName;
      });
      tables.tables[index] = action.payload;
    },
    tableRemoved: function tableRemoved(tables, action) {
      var index = tables.findIndex(function (table) {
        return table.id === action.id;
      });
      tables.splice(index, 1);
    },
    showCreateButton: function showCreateButton(tables, action) {
      tables.tableStates.createButton = action.payload;
    },
    hideCreateButton: function hideCreateButton(tables, action) {
      tables.tableStates.createButton = action.payload;
    },
    showFilterSelector: function showFilterSelector(tables, action) {
      tables.tableStates.filterSelector = action.payload;
    },
    hideFilterSelector: function hideFilterSelector(tables, action) {
      tables.tableStates.filterSelector = action.payload;
    }
  }
});
console.log(slice);
var _slice$actions = slice.actions,
    tableAdded = _slice$actions.tableAdded,
    tablesLoaded = _slice$actions.tablesLoaded,
    tableLoaded = _slice$actions.tableLoaded,
    tableUpdated = _slice$actions.tableUpdated,
    tableRemoved = _slice$actions.tableRemoved,
    showCreateButton = _slice$actions.showCreateButton,
    hideCreateButton = _slice$actions.hideCreateButton,
    showFilterSelector = _slice$actions.showFilterSelector,
    hideFilterSelector = _slice$actions.hideFilterSelector;
exports.hideFilterSelector = hideFilterSelector;
exports.showFilterSelector = showFilterSelector;
exports.hideCreateButton = hideCreateButton;
exports.showCreateButton = showCreateButton;
exports.tableRemoved = tableRemoved;
exports.tableUpdated = tableUpdated;
exports.tableLoaded = tableLoaded;
exports.tablesLoaded = tablesLoaded;
exports.tableAdded = tableAdded;
var _default = slice.reducer; // Action Creators

exports.default = _default;

var loadTables = function loadTables(data) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dispatch) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: slice.actions.tablesLoaded.type,
                payload: data
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.loadTables = loadTables;

var loadTable = function loadTable(data) {
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(dispatch) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch({
                type: slice.actions.tableLoaded.type,
                payload: data
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.loadTable = loadTable;

var addTable = function addTable(data, tableAttributes, search, filters, elementAdd, elementUpdate, elementDelete) {
  return /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(dispatch) {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch({
                type: slice.actions.tableAdded.type,
                payload: {
                  data: data,
                  tableAttributes: tableAttributes,
                  search: search,
                  filters: filters,
                  elementAdd: elementAdd,
                  elementUpdate: elementUpdate,
                  elementDelete: elementDelete
                }
              });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

exports.addTable = addTable;

var updateTable = function updateTable(data, tableName) {
  return /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(dispatch) {
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch({
                type: slice.actions.tableUpdated.type,
                payload: data,
                tableName: tableName
              });

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }();
};

exports.updateTable = updateTable;

var createButtonShowed = function createButtonShowed() {
  return /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(dispatch) {
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dispatch({
                type: slice.actions.showCreateButton.type,
                payload: true
              });

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
};

exports.createButtonShowed = createButtonShowed;

var createButtonHided = function createButtonHided() {
  return /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(dispatch) {
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              dispatch({
                type: slice.actions.hideCreateButton.type,
                payload: false
              });

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }();
};

exports.createButtonHided = createButtonHided;

var filterSelectorShowed = function filterSelectorShowed() {
  return /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(dispatch) {
      return _regenerator.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              dispatch({
                type: slice.actions.showFilterSelector.type,
                payload: true
              });

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }();
};

exports.filterSelectorShowed = filterSelectorShowed;

var filterSelectorHided = function filterSelectorHided() {
  return /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(dispatch) {
      return _regenerator.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              dispatch({
                type: slice.actions.hideFilterSelector.type,
                payload: false
              });

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x8) {
      return _ref8.apply(this, arguments);
    };
  }();
};

exports.filterSelectorHided = filterSelectorHided;
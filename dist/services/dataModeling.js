"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedTable = getSelectedTable;
exports.getTableData = getTableData;
exports.getUpdatedTable = getUpdatedTable;
exports.handleNestedProperty = handleNestedProperty;
exports.handleRelatedProperty = handleRelatedProperty;
exports.getTableCelluleData = getTableCelluleData;
exports.getPropertyUrl = getPropertyUrl;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getSelectedTable(tables, tableName) {
  var selectedTable = tables === null || tables === void 0 ? void 0 : tables.filter(function (table) {
    return table.data.name === tableName;
  })[0];
  return selectedTable;
}

function getTableData(table) {
  var _table$data;

  return (_table$data = table.data) === null || _table$data === void 0 ? void 0 : _table$data.table;
}

function getUpdatedTable(type, currentTable, object) {
  var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var newCurrentTable = _objectSpread({}, currentTable);

  var newCurrentTableData = _objectSpread({}, newCurrentTable.data);

  var newData = (0, _toConsumableArray2.default)(newCurrentTableData.table);
  var index = newData.findIndex(function (obj) {
    return obj.id === id;
  });
  if (type = "Add") newData.push(object);else if (type = "Update") {
    newData[index] = object;
  } else {
    newData.splice(index, 1);
  }
  newCurrentTableData.table = newData;
  newCurrentTable.data = newCurrentTableData;
  return newCurrentTable;
}

function handleNestedProperty(element, path) {
  if (path) {
    var keys = path.split(".");
    var result = element;
    keys.forEach(function (key) {
      try {
        result = result["".concat(key)];
      } catch (error) {//  return alert(error);
        //  return toast.error(error);
      }
    });
    return result;
  }
}

function handleRelatedProperty(tables, relatedObj, element) {
  if (relatedObj) {
    var _tables$filter$, _result;

    var result = (_tables$filter$ = tables.filter(function (table) {
      return (table === null || table === void 0 ? void 0 : table.data.name) === relatedObj.tableName;
    })[0]) === null || _tables$filter$ === void 0 ? void 0 : _tables$filter$.data.table;
    var id = handleNestedProperty(element, relatedObj.related_id);
    result = (_result = result) === null || _result === void 0 ? void 0 : _result.filter(function (res) {
      return res.id === id || res._id === id;
    })[0]["".concat(relatedObj.property)];
    if (relatedObj.type === "string" || relatedObj.type === "number") return result;
    if (relatedObj.type === "image") return /*#__PURE__*/_react.default.createElement("img", {
      src: relatedObj.imagesUrl === "" ? "".concat(result) : "".concat(relatedObj.imagesUrl, "/").concat(result),
      alt: "".concat(result),
      className: "skeleton"
    }); //return result;}
  }
}

function getTableCelluleData(tables, table, element, column) {
  var _table$data2, _table$data3, _table$data4, _table$data5;

  if (column.imageProperty) return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
    src: (table === null || table === void 0 ? void 0 : (_table$data2 = table.data) === null || _table$data2 === void 0 ? void 0 : _table$data2.imagesUrl) === "" ? "".concat(element["".concat(column.imageProperty)]) : "".concat(table === null || table === void 0 ? void 0 : (_table$data3 = table.data) === null || _table$data3 === void 0 ? void 0 : _table$data3.imagesUrl, "/").concat(element["".concat(column.imageProperty)]),
    alt: "".concat(element["".concat(column.imageProperty)]),
    className: "skeleton"
  }), element["".concat(column.title)]);
  if (column.image) return /*#__PURE__*/_react.default.createElement("img", {
    src: (table === null || table === void 0 ? void 0 : (_table$data4 = table.data) === null || _table$data4 === void 0 ? void 0 : _table$data4.imagesUrl) !== "" ? "".concat(table === null || table === void 0 ? void 0 : (_table$data5 = table.data) === null || _table$data5 === void 0 ? void 0 : _table$data5.imagesUrl, "/").concat(element["".concat(column.title)]) : "".concat(element["".concat(column.title)]),
    alt: "".concat(element["".concat(column.title)]),
    className: "skeleton"
  });
  if (column.relatedProperty) return /*#__PURE__*/_react.default.createElement("div", null, handleRelatedProperty(tables, column.relatedProperty, element), "".concat(handleNestedProperty(element, column.title)));
  if (handleNestedProperty(element, column.title) === true) return "true";
  if (handleNestedProperty(element, column.title) === false) return "false";
  return handleNestedProperty(element, column.title);
}

function getPropertyUrl(element, urlObj) {
  var id = handleNestedProperty(element, urlObj.id);
  return "/admin/".concat(urlObj.tableName, "/").concat(id);
}
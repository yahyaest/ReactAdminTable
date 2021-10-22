"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _reactRouterDom = require("react-router-dom");

var _reactBootstrap = require("react-bootstrap");

var _input = _interopRequireDefault(require("./common/input"));

var _select = _interopRequireDefault(require("./common/select"));

var _reactToastify = require("react-toastify");

var _validation = require("./services/validation");

var _dataModeling = require("./services/dataModeling");

var _sleepFunction = require("./services/sleepFunction");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function AdminFormDefault(props) {
  AdminFormDefault.prototype = {
    tables: _propTypes.PropTypes.array.isRequired,
    currentTable: _propTypes.PropTypes.object.isRequired
  };
  var tables = props.tables,
      currentTable = props.currentTable,
      handleShow = props.handleShow,
      currentId = props.currentId,
      tableName = props.tableName,
      url = props.url;

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currentComponent = _useState2[0],
      setCurrentComponent = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      intialComponent = _useState4[0],
      setIntialComponent = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      formAttributes = _useState6[0],
      setFormAttributes = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      schema = _useState8[0],
      setSchema = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      schemaComponent = _useState10[0],
      setSchemaComponent = _useState10[1];

  var _useState11 = (0, _react.useState)(""),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      uploadType = _useState12[0],
      setUploadType = _useState12[1];

  var _useState13 = (0, _react.useState)({}),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      errors = _useState14[0],
      setErrors = _useState14[1];

  var isFile = (0, _react.useRef)(false);
  var history = (0, _reactRouterDom.useHistory)();
  var attributsList = [];
  if (Object.keys(currentTable).length === 0) history.push("/admin/".concat(tableName));

  var getUploadType = function getUploadType() {
    var _tables$filter$;

    var type = "Object";
    var attributes = (_tables$filter$ = tables.filter(function (table) {
      return table.data.name === tableName;
    })[0]) === null || _tables$filter$ === void 0 ? void 0 : _tables$filter$.tableAttributes;
    attributes === null || attributes === void 0 ? void 0 : attributes.forEach(function (attribute) {
      if (attribute.image === true) type = "FormData";
    });
    return type;
  };

  var getAttibutes = function getAttibutes() {
    var _getSelectedTable, _attributes;

    var attributes = (_getSelectedTable = (0, _dataModeling.getSelectedTable)(tables, tableName)) === null || _getSelectedTable === void 0 ? void 0 : _getSelectedTable.tableAttributes;
    attributes = (_attributes = attributes) === null || _attributes === void 0 ? void 0 : _attributes.filter(function (attribute) {
      return attribute.display === "form" || attribute.display === "table/form";
    });
    setFormAttributes(attributes);
    return attributes;
  };

  var setSchemaObject = function setSchemaObject() {
    var _getSelectedTable2, _getSelectedTable2$ta;

    var schemaObject = {};
    var schemaComponentObject = {};
    (_getSelectedTable2 = (0, _dataModeling.getSelectedTable)(tables, tableName)) === null || _getSelectedTable2 === void 0 ? void 0 : (_getSelectedTable2$ta = _getSelectedTable2.tableAttributes) === null || _getSelectedTable2$ta === void 0 ? void 0 : _getSelectedTable2$ta.map(function (attribute) {
      (0, _validation.setValidationProperty)(schemaObject, attribute.title, attribute.validation_type);

      if (url !== "/admin/".concat(tableName, "/new") && attribute.validation_type) {
        if (attribute.validation_type === "object") {
          var objectAttribute = attribute.title.split(".")[0];
          schemaComponentObject["".concat(objectAttribute)] = getInputValue(currentId, objectAttribute);
        } else {
          schemaComponentObject["".concat(attribute.title)] = getInputValue(currentId, attribute.title);
        }
      }
    });
    setSchema(schemaObject);
    setSchemaComponent(schemaComponentObject);
  };

  var setComponent = function setComponent() {
    var component = {};
    formAttributes === null || formAttributes === void 0 ? void 0 : formAttributes.map(function (attribute) {
      if (attribute.format === "json") attributsList.push(attribute.title.split(".")[0]);else attributsList.push(attribute.title);
    });

    if (url === "/admin/".concat(tableName, "/new")) {
      attributsList.map(function (attribute) {
        return component["".concat(attribute)] = "";
      });
    } else {
      attributsList.map(function (attribute) {
        component["".concat(attribute)] = getInputValue(currentId, attribute);
      });
    }

    return component;
  };

  (0, _react.useEffect)(function () {
    getAttibutes();
    setIntialComponent(setComponent());
    setUploadType(getUploadType());
    setSchemaObject();
  }, [currentTable]);
  var component = intialComponent;

  var getInputValue = function getInputValue(id, attribute) {
    var result = tables.filter(function (table) {
      return table.data.name === tableName;
    })[0].data.table;
    result = result.filter(function (element) {
      return element.id === id || element._id === id;
    });
    result = result[0]["".concat(attribute)];
    return result;
  };

  var getSelectValue = function getSelectValue(currentOption) {
    var options = [];
    var result = [];
    result = tables.filter(function (table) {
      return table.data.name === tableName;
    })[0].data.table;
    result.map(function (element) {
      var index = options.indexOf(element["".concat(currentOption)]);
      if (index === -1) options.push(element["".concat(currentOption)]);
    });

    for (var index = 0; index < options.length; index++) {
      if (options[index] === true) options[index] = "true";
      if (options[index] === false) options[index] = "false";
    }

    return options;
  };

  var getTextAreaValue = function getTextAreaValue(id, attribute) {
    var result = tables.filter(function (table) {
      return table.data.name === tableName;
    })[0].data.table;
    result = result.filter(function (element) {
      return element.id === id || element._id === id;
    });
    result = result[0]["".concat(attribute)];
    result = JSON.stringify(result);
    return result;
  };

  var _handleChange = function handleChange(e, attribute) {
    // Errors
    if (attribute.validation_type) {
      var errorsObject = _objectSpread({}, errors);

      var errorMessage = (0, _validation.validateProperty)(schema, e.currentTarget);

      if (errorMessage) {
        errorsObject[e.currentTarget.name] = errorMessage;
      } else {
        delete errorsObject[e.currentTarget.name];
      }

      setErrors(errorsObject);
    } // Schema change


    var schemaComponentObject = _objectSpread({}, schemaComponent);

    if (attribute.validation_type) {
      if (attribute.validation_type === "number") {
        schemaComponentObject["".concat(attribute.title)] = parseInt(e.currentTarget.value);
      } else if (attribute.validation_type === "object") {
        schemaComponentObject["".concat(attribute.title.split(".")[0])] = e.currentTarget.value;
      } else {
        schemaComponentObject["".concat(attribute.title)] = e.currentTarget.value;
      }
    }

    setSchemaComponent(schemaComponentObject); // Change

    if (attribute.type === "file" && e.target.files.length > 0) {
      isFile.current = true;
    }

    if (attribute.type === "file" && e.target.files.length === 0) {
      isFile.current = false;
    } // Check that there is file to upload


    if (e.target.name === attribute.title) {
      if (attribute.image) {
        component["".concat(attribute.title)] = e.target.files[0];
      } else {
        component["".concat(attribute.title)] = e.currentTarget.value;
      }
    } else if (attribute.format === "json") {
      try {
        component["".concat(attribute.title.split(".")[0])] = JSON.parse(e.currentTarget.value);
      } catch (error) {}
    }

    var componentFormData = new FormData();

    for (var key in component) {
      componentFormData.append(key, component[key]);
    }

    if (uploadType === "FormData" && isFile.current) setCurrentComponent(componentFormData);else setCurrentComponent(component);
  };

  var handleSubmit = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {
      var errors, targetTable, elementAdded, _elementUpdated, _elementUpdated2, elementUpdated, _elementUpdated3, _elementUpdated4;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault(); //// Errors

              errors = (0, _validation.validate)(schema, schemaComponent);
              setErrors({
                errors: errors || {}
              });

              if (!errors) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              //// Submit
              targetTable = tables.filter(function (table) {
                return table.data.name === tableName;
              })[0]; // Add Object

              if (!(url === "/admin/".concat(targetTable.data.name, "/new"))) {
                _context.next = 16;
                break;
              }

              _context.next = 9;
              return targetTable.elementAdd(currentComponent);

            case 9:
              elementAdded = _context.sent;

              if (elementAdded && !(elementAdded !== null && elementAdded !== void 0 && elementAdded.isError)) {
                history.push("/admin/".concat(tableName));

                _reactToastify.toast.dark("New item added.");
              } else if (elementAdded && elementAdded !== null && elementAdded !== void 0 && elementAdded.isError) {
                history.push("/admin/".concat(tableName));

                _reactToastify.toast.error(elementAdded !== null && elementAdded !== void 0 && elementAdded.errorMessage ? elementAdded === null || elementAdded === void 0 ? void 0 : elementAdded.errorMessage : "An Error has occured!");
              } else {
                history.push("/admin/".concat(tableName));
              }

              _context.next = 13;
              return (0, _sleepFunction.sleepTime)(2000);

            case 13:
              window.location.reload();
              _context.next = 30;
              break;

            case 16:
              elementUpdated = {};

              if (!(Object.keys(currentComponent).length === 0)) {
                _context.next = 23;
                break;
              }

              _context.next = 20;
              return targetTable.elementUpdate(intialComponent, currentId);

            case 20:
              elementUpdated = _context.sent;
              _context.next = 26;
              break;

            case 23:
              _context.next = 25;
              return targetTable.elementUpdate(currentComponent, currentId);

            case 25:
              elementUpdated = _context.sent;

            case 26:
              if (elementUpdated && !((_elementUpdated = elementUpdated) !== null && _elementUpdated !== void 0 && _elementUpdated.isError)) {
                history.push("/admin/".concat(tableName));

                _reactToastify.toast.dark("Item updated successfully.");
              } else if (elementUpdated && (_elementUpdated2 = elementUpdated) !== null && _elementUpdated2 !== void 0 && _elementUpdated2.isError) {
                history.push("/admin/".concat(tableName));

                _reactToastify.toast.error((_elementUpdated3 = elementUpdated) !== null && _elementUpdated3 !== void 0 && _elementUpdated3.errorMessage ? (_elementUpdated4 = elementUpdated) === null || _elementUpdated4 === void 0 ? void 0 : _elementUpdated4.errorMessage : "An Error has occured!");
              } else {
                history.push("/admin/".concat(tableName));
              }

              _context.next = 29;
              return (0, _sleepFunction.sleepTime)(2000);

            case 29:
              window.location.reload();

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    className: "form__page",
    onSubmit: function onSubmit(e) {
      return handleSubmit(e);
    }
  }, formAttributes === null || formAttributes === void 0 ? void 0 : formAttributes.map(function (attribute) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: attribute.label
    }, attribute.format === "input" && /*#__PURE__*/_react.default.createElement("div", {
      key: attribute.label
    }, /*#__PURE__*/_react.default.createElement(_input.default, {
      key: attribute.label,
      controlid: "formBasic".concat(attribute.label),
      label: attribute.label,
      name: attribute.title,
      type: attribute.type,
      value: url !== "/admin/".concat(tableName, "/new") ? attribute.type !== "file" ? getInputValue(currentId, attribute.title) : "" : "",
      handleChange: function handleChange(e) {
        return _handleChange(e, attribute);
      }
    }), errors["".concat(attribute.title)] && /*#__PURE__*/_react.default.createElement("div", {
      className: "alert alert-danger"
    }, errors["".concat(attribute.title)])), attribute.format === "select" && /*#__PURE__*/_react.default.createElement(_select.default, {
      key: attribute.label,
      controlid: "formBasic".concat(attribute.label),
      label: attribute.label,
      name: attribute.title,
      options: getSelectValue(attribute.title),
      handleChange: function handleChange(e) {
        return _handleChange(e, attribute);
      }
    }), attribute.format === "json" && /*#__PURE__*/_react.default.createElement("div", {
      key: attribute.label,
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: ""
    }, attribute.label), /*#__PURE__*/_react.default.createElement("textarea", {
      name: attribute.title.split(".")[0],
      id: "",
      cols: "30",
      rows: "10",
      defaultValue: url !== "/admin/".concat(tableName, "/new") ? getTextAreaValue(currentId, attribute.title.split(".")[0]) : "",
      onChange: function onChange(e) {
        return _handleChange(e, attribute);
      }
    }), errors["".concat(attribute.title.split(".")[0])] && /*#__PURE__*/_react.default.createElement("div", {
      className: "alert alert-danger"
    }, errors["".concat(attribute.title.split(".")[0])])));
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "form__submit"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    variant: "dark",
    type: "submit",
    disabled: (0, _validation.validate)(schema, schemaComponent)
  }, "Submit"), /*#__PURE__*/_react.default.createElement("p", null, "Click below to use JSON format"), /*#__PURE__*/_react.default.createElement("div", {
    className: "json__button",
    onClick: function onClick() {
      return handleShow(false);
    }
  }, /*#__PURE__*/_react.default.createElement("svg", {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M2.1 3.1c0.2 1.3 0.4 1.6 0.4 2.9 0 0.8-1.5 1.5-1.5 1.5v1c0 0 1.5 0.7 1.5 1.5 0 1.3-0.2 1.6-0.4 2.9-0.3 2.1 0.8 3.1 1.8 3.1s2.1 0 2.1 0v-2c0 0-1.8 0.2-1.8-1 0-0.9 0.2-0.9 0.4-2.9 0.1-0.9-0.5-1.6-1.1-2.1 0.6-0.5 1.2-1.1 1.1-2-0.3-2-0.4-2-0.4-2.9 0-1.2 1.8-1.1 1.8-1.1v-2c0 0-1 0-2.1 0s-2.1 1-1.8 3.1z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M13.9 3.1c-0.2 1.3-0.4 1.6-0.4 2.9 0 0.8 1.5 1.5 1.5 1.5v1c0 0-1.5 0.7-1.5 1.5 0 1.3 0.2 1.6 0.4 2.9 0.3 2.1-0.8 3.1-1.8 3.1s-2.1 0-2.1 0v-2c0 0 1.8 0.2 1.8-1 0-0.9-0.2-0.9-0.4-2.9-0.1-0.9 0.5-1.6 1.1-2.1-0.6-0.5-1.2-1.1-1.1-2 0.2-2 0.4-2 0.4-2.9 0-1.2-1.8-1.1-1.8-1.1v-2c0 0 1 0 2.1 0s2.1 1 1.8 3.1z"
  })), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "gray"
    }
  }, "Use JSON"))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    tables: state.admin.tables,
    currentTable: state.admin.currentTable
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {})(AdminFormDefault);

exports.default = _default;
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

var _reactToastify = require("react-toastify");

var _validation = require("./services/validation");

var _sleepFunction = require("./services/sleepFunction");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function AdminFormAlternative(props) {
  AdminFormAlternative.prototype = {
    tables: _propTypes.PropTypes.array.isRequired,
    currentTable: _propTypes.PropTypes.object.isRequired
  };
  var tables = props.tables,
      currentTable = props.currentTable,
      handleShow = props.handleShow,
      currentId = props.currentId,
      tableName = props.tableName,
      url = props.url;

  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      intialComponent = _useState2[0],
      setIntialComponent = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      currentComponent = _useState4[0],
      setCurrentComponent = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isFile = _useState6[0],
      setIsFile = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isFileUpload = _useState8[0],
      setIsFileUpload = _useState8[1];

  var _useState9 = (0, _react.useState)(""),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      fileAttribute = _useState10[0],
      setFileAttribute = _useState10[1];

  var _useState11 = (0, _react.useState)({}),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      schema = _useState12[0],
      setSchema = _useState12[1];

  var _useState13 = (0, _react.useState)({}),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      schemaComponent = _useState14[0],
      setSchemaComponent = _useState14[1];

  var _useState15 = (0, _react.useState)({}),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      errors = _useState16[0],
      setErrors = _useState16[1];

  var history = (0, _reactRouterDom.useHistory)();
  if (Object.keys(currentTable).length === 0) history.push("/admin/".concat(tableName));

  var setSchemaObject = function setSchemaObject() {
    var schemaObject = {};
    var schemaComponentObject = {};
    (0, _validation.setValidationProperty)(schemaObject, tableName, "object");

    if (url !== "/admin/".concat(tableName, "/new")) {
      schemaComponentObject["".concat(tableName)] = getTextAreaObject(currentId);
    }

    setSchema(schemaObject);
    setSchemaComponent(schemaComponentObject);
  };

  var getTextAreaObject = function getTextAreaObject(id) {
    var result = tables.filter(function (table) {
      return table.data.name === tableName;
    })[0].data.table;
    result = result.filter(function (element) {
      return element.id === id || element._id === id;
    });
    result = result[0];
    result = JSON.stringify(result);
    return result;
  };

  var checkFileUpload = function checkFileUpload() {
    var result = tables.filter(function (table) {
      return table.data.name === tableName;
    })[0].tableAttributes;
    result = result.find(function (attribute) {
      return attribute.image === true;
    });
    var isFile = result ? true : false;
    setIsFile(isFile);
    return isFile;
  };

  var getFileAttribute = function getFileAttribute() {
    var _tables$filter$;

    var attributes = (_tables$filter$ = tables.filter(function (table) {
      return table.data.name === tableName;
    })[0]) === null || _tables$filter$ === void 0 ? void 0 : _tables$filter$.tableAttributes;
    attributes === null || attributes === void 0 ? void 0 : attributes.forEach(function (attribute) {
      if (attribute.image === true) {
        setFileAttribute(attribute.title);
      }
    });
  };

  (0, _react.useEffect)(function () {
    setIntialComponent(getTextAreaObject(currentId));
    setCurrentComponent(getTextAreaObject(currentId));
    checkFileUpload();
    setSchemaObject();
    getFileAttribute();
  }, []);
  var component = currentComponent;

  var handleChange = function handleChange(e) {
    // Errors
    var errorsObject = _objectSpread({}, errors);

    var errorMessage = (0, _validation.validateProperty)(schema, e.currentTarget);

    if (errorMessage) {
      errorsObject[e.currentTarget.name] = errorMessage;
    } else {
      delete errorsObject[e.currentTarget.name];
    }

    setErrors(errorsObject); // Schema change

    var schemaComponentObject = _objectSpread({}, schemaComponent);

    schemaComponentObject["".concat(tableName)] = e.currentTarget.value;
    setSchemaComponent(schemaComponentObject); // Change

    try {
      component = JSON.parse(e.currentTarget.value);
    } catch (error) {
      console.log(error);
    }

    var componentFormData = new FormData();

    for (var key in component) {
      componentFormData.append(key, component[key]);
    }

    if (isFileUpload === true) setCurrentComponent(componentFormData);else setCurrentComponent(component);
  };

  var handleImageInput = function handleImageInput(e) {
    try {
      component = JSON.parse(currentComponent);

      if (fileAttribute && component !== undefined && component !== null) {
        delete component["".concat(fileAttribute)];
      }
    } catch (error) {
      component = currentComponent;

      if (fileAttribute && component !== undefined && component !== null) {
        delete component["".concat(fileAttribute)];
      }
    }

    if (component === undefined || component === null) component = {};
    component["".concat(fileAttribute)] = e.target.files[0];
    var componentFormData = new FormData();

    for (var key in component) {
      componentFormData.append(key, component[key]);
    }

    if (isFileUpload === true) setCurrentComponent(componentFormData);else setCurrentComponent(component);
    document.getElementById("Json-Format").value = JSON.stringify(component);
  };

  var handleSubmit = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {
      var errors, targetTable, elementAdded, elementUpdated;
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
              _context.next = 23;
              break;

            case 16:
              _context.next = 18;
              return targetTable.elementUpdate(currentComponent, currentId);

            case 18:
              elementUpdated = _context.sent;

              if (elementUpdated && !(elementUpdated !== null && elementUpdated !== void 0 && elementUpdated.isError)) {
                history.push("/admin/".concat(tableName));

                _reactToastify.toast.dark("Item updated successfully.");
              } else if (elementUpdated && elementUpdated !== null && elementUpdated !== void 0 && elementUpdated.isError) {
                history.push("/admin/".concat(tableName));

                _reactToastify.toast.error(elementUpdated !== null && elementUpdated !== void 0 && elementUpdated.errorMessage ? elementUpdated === null || elementUpdated === void 0 ? void 0 : elementUpdated.errorMessage : "An Error has occured!");
              } else {
                history.push("/admin/".concat(tableName));
              }

              _context.next = 22;
              return (0, _sleepFunction.sleepTime)(2000);

            case 22:
              window.location.reload();

            case 23:
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

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    className: "form__page",
    onSubmit: function onSubmit(e) {
      return handleSubmit(e);
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "json__input",
    style: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: ""
  }, "".concat(tableName, " Object")), /*#__PURE__*/_react.default.createElement("textarea", {
    name: tableName,
    id: "Json-Format",
    cols: "30",
    rows: "10",
    defaultValue: url !== "/admin/".concat(tableName, "/new") ? intialComponent : "",
    onChange: function onChange(e) {
      return handleChange(e);
    }
  }), errors["".concat(tableName)] && /*#__PURE__*/_react.default.createElement("div", {
    className: "alert alert-danger"
  }, errors["".concat(tableName)])), isFile && /*#__PURE__*/_react.default.createElement("div", {
    className: "file__check"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    style: {
      marginRight: "3px"
    },
    onClick: function onClick() {
      return setIsFileUpload(!isFileUpload);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: ""
  }, "Upload File")), isFile && isFileUpload && /*#__PURE__*/_react.default.createElement("div", {
    className: "file__input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "file__input"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    onChange: function onChange(e) {
      return handleImageInput(e);
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form__submit"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    variant: "dark",
    type: "submit",
    disabled: (0, _validation.validate)(schema, schemaComponent)
  }, "Submit"), /*#__PURE__*/_react.default.createElement("p", null, " Click below to use default format."), /*#__PURE__*/_react.default.createElement("div", {
    className: "json__button",
    onClick: function onClick() {
      return handleShow(true);
    }
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-backward"
  }), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "gray"
    }
  }, "Go Back")))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    tables: state.admin.tables,
    currentTable: state.admin.currentTable
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {})(AdminFormAlternative);

exports.default = _default;
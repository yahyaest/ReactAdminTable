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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Pagination = _interopRequireDefault(require("react-bootstrap/Pagination"));

var _Popover = _interopRequireDefault(require("react-bootstrap/Popover"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _OverlayTrigger = _interopRequireDefault(require("react-bootstrap/OverlayTrigger"));

var Paginate = function Paginate(props) {
  Paginate.propTypes = {
    itemsCounts: _propTypes.default.number,
    pageSize: _propTypes.default.number.isRequired,
    currentPage: _propTypes.default.number.isRequired,
    onPageChange: _propTypes.default.func.isRequired
  };
  var itemsCounts = props.itemsCounts,
      pageSize = props.pageSize,
      currentPage = props.currentPage,
      onPageChange = props.onPageChange,
      handlePageSize = props.handlePageSize;
  var pageSizeOptions = [5, 10, 20, 50];
  var pagesCount = Math.ceil(itemsCounts / pageSize);

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  var activePage = currentPage > pagesCount || currentPage < 1 ? 1 : currentPage;
  var items = [];

  var handleGoToPagePopUp = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var popover, first, second, third;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              popover = document.getElementById("popover-basic");
              first = document.getElementById("first");
              second = document.getElementById("second");
              third = document.getElementById("third");
              if (popover && first) first.click();

              if (popover && second) {
                second.click();
              }

              if (popover && third) third.click();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleGoToPagePopUp() {
      return _ref.apply(this, arguments);
    };
  }();

  var handleCount = function handleCount(count) {
    setCount(parseInt(count));
  };

  var popover = /*#__PURE__*/_react.default.createElement(_Popover.default, {
    id: "popover-basic"
  }, /*#__PURE__*/_react.default.createElement(_Popover.default.Title, {
    as: "h3",
    className: "text-dark"
  }, " ", "Go to Page"), /*#__PURE__*/_react.default.createElement(_Popover.default.Content, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination__extension"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    step: "1",
    min: 1,
    max: pagesCount,
    defaultValue: activePage,
    onChange: function onChange(e) {
      return handleCount(e.currentTarget.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "dark",
    size: "sm",
    onClick: function onClick() {
      if (count < 1) onPageChange(1);else if (count > pagesCount) onPageChange(pagesCount);else onPageChange(count);
      handleGoToPagePopUp();
    }
  }, "Go"))));

  if (pagesCount === 1) return /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination__bar"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Per page: "), /*#__PURE__*/_react.default.createElement("select", {
    name: "pageSize",
    id: "page-size",
    defaultValue: pageSize,
    onChange: function onChange(e) {
      return handlePageSize(e.currentTarget.value);
    }
  }, pageSizeOptions.map(function (option) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: option,
      value: option
    }, option);
  })));

  if (pagesCount < 6) {
    items = [];

    var _loop = function _loop(number) {
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: number,
        className: number === activePage ? "page-item active" : "page-item",
        onClick: function onClick() {
          return onPageChange(number);
        }
      }, number));
    };

    for (var number = 1; number <= pagesCount; number++) {
      _loop(number);
    }
  } else {
    // Active Page = 1 || 2 || 3
    if (0 < activePage && activePage < 4) {
      items = [];

      if (activePage !== 1) {
        items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
          key: "prev",
          className: "page-item start_end_item",
          style: {
            margin: "0 5px"
          },
          onClick: function onClick() {
            onPageChange(activePage - 1);
            handleGoToPagePopUp();
          }
        }, "PREV"));
      }

      var _loop2 = function _loop2(_number) {
        items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
          key: _number,
          className: _number === activePage ? "page-item active" : "page-item",
          onClick: function onClick() {
            onPageChange(_number);
            handleGoToPagePopUp();
          }
        }, _number));
      };

      for (var _number = 1; _number <= 3; _number++) {
        _loop2(_number);
      }

      items.push( /*#__PURE__*/_react.default.createElement(_OverlayTrigger.default, {
        key: "...",
        trigger: "click",
        placement: "bottom",
        overlay: popover
      }, /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        className: "page-item",
        id: "first"
      }, "...")));
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: pagesCount,
        className: pagesCount === activePage ? "page-item active" : "page-item",
        onClick: function onClick() {
          onPageChange(pagesCount);
          handleGoToPagePopUp();
        }
      }, pagesCount));

      if (activePage !== pagesCount) {
        items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
          key: "next",
          className: "page-item start_end_item",
          style: {
            margin: "0 5px"
          },
          onClick: function onClick() {
            onPageChange(activePage + 1);
            handleGoToPagePopUp();
          }
        }, "NEXT"));
      }
    } // 3 < Active Page < pagesCount - 2


    if (3 < activePage && activePage < pagesCount - 2) {
      items = [];
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: "prev",
        className: "page-item start_end_item",
        style: {
          margin: "0 5px"
        },
        onClick: function onClick() {
          onPageChange(activePage - 1);
          handleGoToPagePopUp();
        }
      }, "PREV"));
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: "1",
        className: activePage === 1 ? "page-item active" : "page-item",
        onClick: function onClick() {
          onPageChange(1);
          handleGoToPagePopUp();
        }
      }, "1"));
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        className: "page-item",
        onClick: function onClick() {
          handleGoToPagePopUp();
        }
      }, "..."));

      var _loop3 = function _loop3(_number2) {
        items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
          key: _number2,
          className: _number2 === activePage ? "page-item active" : "page-item",
          onClick: function onClick() {
            onPageChange(_number2);
            handleGoToPagePopUp();
          }
        }, _number2));
      };

      for (var _number2 = activePage - 1; _number2 <= activePage + 1; _number2++) {
        _loop3(_number2);
      }

      items.push( /*#__PURE__*/_react.default.createElement(_OverlayTrigger.default, {
        key: "...2",
        trigger: "click",
        placement: "bottom",
        overlay: popover
      }, /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        className: "page-item",
        id: "second",
        onClick: function onClick() {
          handleGoToPagePopUp();
        }
      }, "...")));
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: pagesCount,
        className: pagesCount === activePage ? "page-item active" : "page-item",
        onClick: function onClick(e) {
          onPageChange(pagesCount);
          handleGoToPagePopUp(e.currentTarget.id);
        }
      }, pagesCount));
      if (activePage !== pagesCount) items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: "next",
        className: "page-item start_end_item",
        style: {
          margin: "0 5px"
        },
        onClick: function onClick() {
          onPageChange(activePage + 1);
          handleGoToPagePopUp();
        }
      }, "NEXT"));
    } //  pagesCount - 3 < Active Page


    if (pagesCount - 3 < activePage) {
      items = [];
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: "prev",
        className: "page-item start_end_item",
        style: {
          margin: "0 5px"
        },
        onClick: function onClick() {
          onPageChange(activePage - 1);
          handleGoToPagePopUp();
        }
      }, "PREV"));
      items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: "1",
        className: activePage === 1 ? "page-item active" : "page-item",
        onClick: function onClick() {
          onPageChange(1);
          handleGoToPagePopUp();
        }
      }, "1"));
      items.push( /*#__PURE__*/_react.default.createElement(_OverlayTrigger.default, {
        key: "...",
        trigger: "click",
        placement: "bottom",
        overlay: popover
      }, /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        className: "page-item",
        id: "third"
      }, "...")));

      var _loop4 = function _loop4(_number3) {
        items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
          key: _number3,
          className: _number3 === activePage ? "page-item active" : "page-item",
          onClick: function onClick() {
            onPageChange(_number3);
            handleGoToPagePopUp();
          }
        }, _number3));
      };

      for (var _number3 = pagesCount - 2; _number3 <= pagesCount; _number3++) {
        _loop4(_number3);
      }

      if (activePage !== pagesCount) items.push( /*#__PURE__*/_react.default.createElement(_Pagination.default.Item, {
        key: "next",
        className: "page-item start_end_item",
        style: {
          margin: "0 5px"
        },
        onClick: function onClick() {
          onPageChange(activePage + 1);
          handleGoToPagePopUp();
        }
      }, "NEXT"));
    }
  }

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination__bar"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Per page: "), /*#__PURE__*/_react.default.createElement("select", {
    name: "pageSize",
    id: "page-size",
    defaultValue: pageSize,
    onChange: function onChange(e) {
      return handlePageSize(e.currentTarget.value);
    }
  }, pageSizeOptions.map(function (option) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: option,
      value: option
    }, option);
  })), /*#__PURE__*/_react.default.createElement(_Pagination.default, null, items)));
};

var _default = Paginate;
exports.default = _default;
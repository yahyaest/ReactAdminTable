"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleepTime = sleepTime;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var sleep = function sleep(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
};

function sleepTime(_x) {
  return _sleepTime.apply(this, arguments);
}

function _sleepTime() {
  _sleepTime = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(milliseconds) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sleep(milliseconds);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sleepTime.apply(this, arguments);
}
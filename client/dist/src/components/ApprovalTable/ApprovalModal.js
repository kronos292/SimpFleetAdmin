"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApprovalModal(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, _react.default.createElement("div", {
    className: "modal-content"
  }, _react.default.createElement("div", {
    className: "modal-header"
  }, _react.default.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "User Approval"), _react.default.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, _react.default.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"))), _react.default.createElement("div", {
    className: "modal-body"
  }, "Are you sure to ", props.status, " ", props.user, " to login?"), _react.default.createElement("div", {
    className: "modal-footer"
  }, _react.default.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    "data-dismiss": "modal"
  }, "Cancel"), _react.default.createElement("button", {
    type: "button",
    className: "btn btn-".concat(props.status === "disable" ? "danger" : "primary"),
    onClick: function onClick() {
      return props.onUpdateIsApprove(props.users);
    },
    "data-dismiss": "modal"
  }, props.status)))));
}

var _default = ApprovalModal;
exports.default = _default;

//# sourceMappingURL=ApprovalModal.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

var _ApprovalModal = _interopRequireDefault(require("./ApprovalModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApprovalTable(props) {
  /* map the user */
  var content = Object.keys(props.users).map(function (key, index) {
    var users = props.users[key];
    var compObj = users.userCompany;

    if (users.userCompany === undefined) {
      compObj = users.company;
    }

    var compName = "";

    if (compObj === null || compObj === undefined) {
      compName = "";
    } else {
      compName = compObj.name;
    }

    return (
      /* body component */
      _react.default.createElement(_react.default.Fragment, {
        key: index
      }, _react.default.createElement("tr", null, _react.default.createElement("td", null, users.firstName === "" ? "-" : users.firstName), _react.default.createElement("td", null, users.lastName === "" ? "-" : users.lastName), _react.default.createElement("td", null, users.email === "" ? "-" : users.email), _react.default.createElement("td", null, compName === "" ? "-" : compName), _react.default.createElement("td", null, users.contactNumber === "" ? "-" : users.contactNumber), _react.default.createElement("td", null, users.isApproved === true ? "approved" : "not yet approved"), _react.default.createElement("td", null, _react.default.createElement("button", {
        className: "btn btn-".concat(users.isApproved ? "danger" : "primary"),
        "data-toggle": "modal",
        "data-target": "#approvemodal".concat(users._id)
      }, users.isApproved ? "disable" : "enable"))), _react.default.createElement("div", {
        className: "modal fade",
        id: "approvemodal".concat(users._id),
        tabIndex: "-1",
        role: "dialog",
        "aria-labelledby": "exampleModalLabel",
        "aria-hidden": "true"
      }, _react.default.createElement(_ApprovalModal.default, {
        user: users.firstName === "" ? "this account" : users.firstName,
        status: users.isApproved ? "disable" : "enable",
        onUpdateIsApprove: props.onUpdateIsApprove,
        users: users
      })))
    );
  });
  return _react.default.createElement(_reactstrap.Table, {
    hover: true,
    bordered: true,
    responsive: true,
    striped: true
  }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "First name"), _react.default.createElement("th", null, "Last name"), _react.default.createElement("th", null, "Email"), _react.default.createElement("th", null, "Company"), _react.default.createElement("th", null, "Contact"), _react.default.createElement("th", null, "Status"), _react.default.createElement("th", null, "Action"))), _react.default.createElement("tbody", null, content));
}

var _default = ApprovalTable;
exports.default = _default;

//# sourceMappingURL=ApprovalTable.js.map
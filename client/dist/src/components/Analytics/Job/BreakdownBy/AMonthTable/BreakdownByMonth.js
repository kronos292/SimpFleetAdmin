"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BreakdownByMonth =
/*#__PURE__*/
function (_Component) {
  _inherits(BreakdownByMonth, _Component);

  function BreakdownByMonth() {
    _classCallCheck(this, BreakdownByMonth);

    return _possibleConstructorReturn(this, _getPrototypeOf(BreakdownByMonth).apply(this, arguments));
  }

  _createClass(BreakdownByMonth, [{
    key: "render",
    value: function render() {
      var jobMonthCategory = this.props.jobMonthCategory;

      switch (jobMonthCategory) {
        case null:
          return _react.default.createElement("div", null);

        default:
          var jobMonthCategories = Object.keys(jobMonthCategory).map(function (key, index) {
            var jobs = jobMonthCategory[key];
            var itemCount = 0;
            var offlandItemCount = 0;
            var itemTimes = 0;
            var offlandItemTimes = 0;
            var cancelledJobs = [];
            var openJobs = [];
            var completedJobs = [];

            for (var i = 0; i < jobs.length; i++) {
              var job = jobs[i];

              if (job.isCancelled === "Confirmed") {
                cancelledJobs.push(job);
              } else {
                if (job.jobTrackers.length === 6) {
                  completedJobs.push(job);
                } else {
                  openJobs.push(job);
                }

                var jobItems = job.jobItems,
                    jobOfflandItems = job.jobOfflandItems;

                if (jobItems && jobItems.length > 0) {
                  itemTimes++;

                  for (var j = 0; j < jobItems.length; j++) {
                    var jobItem = jobItems[j];
                    itemCount += jobItem.quantity;
                  }
                }

                if (jobOfflandItems && jobOfflandItems.length > 0) {
                  offlandItemTimes++;

                  for (var _j = 0; _j < jobOfflandItems.length; _j++) {
                    var jobOfflandItem = jobOfflandItems[_j];
                    offlandItemCount += jobOfflandItem.quantity;
                  }
                }
              }
            }

            return _react.default.createElement("tr", {
              key: index
            }, _react.default.createElement("td", null, key), _react.default.createElement("td", null, jobs.length), _react.default.createElement("td", {
              style: {
                color: "red"
              }
            }, cancelledJobs.length), _react.default.createElement("td", null, openJobs.length), _react.default.createElement("td", null, completedJobs.length), _react.default.createElement("td", null, itemCount), _react.default.createElement("td", null, itemCount === 0 ? "0" : (itemCount / itemTimes).toFixed(2)), _react.default.createElement("td", null, offlandItemCount), _react.default.createElement("td", null, offlandItemCount === 0 ? "0" : (offlandItemCount / offlandItemTimes).toFixed(2)));
          });
          return _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
            cs: "12",
            md: {
              size: 12,
              offset: 0
            },
            className: "text-center"
          }, _react.default.createElement("h1", null, "Job breakdown by month")), _react.default.createElement(_reactstrap.Col, {
            cs: "12",
            md: {
              size: 12,
              offset: 0
            }
          }, _react.default.createElement(_reactstrap.Table, {
            striped: true,
            hover: true,
            bordered: true,
            responsive: true
          }, _react.default.createElement("thead", null, _react.default.createElement("tr", {
            style: {
              backgroundColor: "#49AE4B",
              color: "white",
              textAlign: "center"
            }
          }, _react.default.createElement("th", null, "Month"), _react.default.createElement("th", null, "Total jobs"), _react.default.createElement("th", {
            style: {
              color: "red"
            }
          }, "Cancelled jobs"), _react.default.createElement("th", null, "Ongoing jobs"), _react.default.createElement("th", null, "Completed jobs"), _react.default.createElement("th", null, "No. of Pallets (Delivery)"), _react.default.createElement("th", null, "Avg No. of Pallets per Delivery"), _react.default.createElement("th", null, "No. of Pallets (Offland)"), _react.default.createElement("th", null, "Avg No. of Pallets per Offland"))), _react.default.createElement("tbody", null, jobMonthCategories))));
      }
    }
  }]);

  return BreakdownByMonth;
}(_react.Component);

var _default = BreakdownByMonth;
exports.default = _default;

//# sourceMappingURL=BreakdownByMonth.js.map
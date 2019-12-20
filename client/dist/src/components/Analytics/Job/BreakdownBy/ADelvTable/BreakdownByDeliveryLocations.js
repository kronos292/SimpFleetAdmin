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

var BreakdownByDeliveryLocations =
/*#__PURE__*/
function (_Component) {
  _inherits(BreakdownByDeliveryLocations, _Component);

  function BreakdownByDeliveryLocations() {
    _classCallCheck(this, BreakdownByDeliveryLocations);

    return _possibleConstructorReturn(this, _getPrototypeOf(BreakdownByDeliveryLocations).apply(this, arguments));
  }

  _createClass(BreakdownByDeliveryLocations, [{
    key: "render",
    value: function render() {
      var jobDeliveryCategory = this.props.jobDeliveryCategory;

      switch (jobDeliveryCategory) {
        case null:
          return _react.default.createElement("div", null);

        default:
          var itemCountOthers = 0;
          var offlandItemCountOthers = 0;
          var itemall = 0;
          var itemofflandall = 0;
          var cancelledJobstotal = [];
          var openJobstotal = [];
          var completedJobstotal = [];
          var cancelledJobsOthers = [];
          var openJobsOthers = [];
          var completedJobsOthers = [];
          var jobDeliveryLocationsCategories = Object.keys(jobDeliveryCategory).map(function (key, index) {
            var jobs = jobDeliveryCategory[key];
            var itemCount = 0;
            var offlandItemCount = 0;
            var cancelledJobs = [];
            var openJobs = [];
            var completedJobs = [];

            if (key === "PSA" || key === "Jurong Port") {
              for (var i = 0; i < jobs.length; i++) {
                var job = jobs[i];

                if (job.isCancelled === "Confirmed") {
                  cancelledJobs.push(job);
                  cancelledJobstotal.push(job);
                } else {
                  if (job.jobTrackers.length === 6) {
                    completedJobs.push(job);
                    completedJobstotal.push(job);
                  } else {
                    openJobs.push(job);
                    openJobstotal.push(job);
                  }

                  var jobItems = job.jobItems,
                      jobOfflandItems = job.jobOfflandItems;

                  if (jobItems && jobItems.length > 0) {
                    for (var j = 0; j < jobItems.length; j++) {
                      var jobItem = jobItems[j];
                      itemCount += jobItem.quantity;
                      itemall += jobItem.quantity;
                    }
                  }

                  if (jobOfflandItems && jobOfflandItems.length > 0) {
                    for (var _j = 0; _j < jobOfflandItems.length; _j++) {
                      var jobOfflandItem = jobOfflandItems[_j];
                      offlandItemCount += jobOfflandItem.quantity;
                      itemofflandall += jobOfflandItem.quantity;
                    }
                  }
                }
              }

              return _react.default.createElement("tr", {
                key: index
              }, _react.default.createElement("td", null, key), _react.default.createElement("td", null, itemCount), _react.default.createElement("td", null, offlandItemCount), _react.default.createElement("td", null, openJobs.length), _react.default.createElement("td", null, completedJobs.length), _react.default.createElement("td", {
                style: {
                  color: "red"
                }
              }, cancelledJobs.length), _react.default.createElement("td", null, jobs.length));
            } else if (key !== "PSA" || key !== "Jurong Port") {
              for (var _i = 0; _i < jobs.length; _i++) {
                var _job = jobs[_i];

                if (_job.isCancelled === "Confirmed") {
                  cancelledJobsOthers.push(_job);
                } else {
                  if (_job.jobTrackers.length === 6) {
                    completedJobsOthers.push(_job);
                  } else {
                    openJobsOthers.push(_job);
                  }

                  var _jobItems = _job.jobItems,
                      _jobOfflandItems = _job.jobOfflandItems;

                  if (_jobItems && _jobItems.length > 0) {
                    for (var _j2 = 0; _j2 < _jobItems.length; _j2++) {
                      var _jobItem = _jobItems[_j2];
                      itemCountOthers += _jobItem.quantity;
                    }
                  }

                  if (_jobOfflandItems && _jobOfflandItems.length > 0) {
                    for (var _j3 = 0; _j3 < _jobOfflandItems.length; _j3++) {
                      var _jobOfflandItem = _jobOfflandItems[_j3];
                      offlandItemCountOthers += _jobOfflandItem.quantity;
                    }
                  }
                }
              }
            }
          });
          return _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
            cs: "12",
            md: {
              size: 12,
              offset: 0
            },
            className: "text-center"
          }, _react.default.createElement("h1", null, "Job breakdown by Delivery Locations")), _react.default.createElement(_reactstrap.Col, {
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
          }, _react.default.createElement("th", null, "Delivery Location"), _react.default.createElement("th", null, "No. of Pallets (Delivery)"), _react.default.createElement("th", null, "No. of Pallets (Offland)"), _react.default.createElement("th", null, "Ongoing Jobs"), _react.default.createElement("th", null, "Completed Jobs"), _react.default.createElement("th", {
            style: {
              color: "red"
            }
          }, "Cancelled Jobs"), _react.default.createElement("th", null, "Total Jobs"))), _react.default.createElement("tbody", null, jobDeliveryLocationsCategories, _react.default.createElement("tr", null, _react.default.createElement("td", null, "Others"), _react.default.createElement("td", null, itemCountOthers), _react.default.createElement("td", null, offlandItemCountOthers), _react.default.createElement("td", null, openJobsOthers.length), _react.default.createElement("td", null, completedJobsOthers.length), _react.default.createElement("td", {
            style: {
              color: "red"
            }
          }, cancelledJobsOthers.length), _react.default.createElement("td", null, openJobsOthers.length + completedJobsOthers.length + cancelledJobsOthers.length))), _react.default.createElement("br", null), _react.default.createElement("tfoot", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Total"), _react.default.createElement("th", null, itemCountOthers + itemall, " Pallets"), _react.default.createElement("th", null, offlandItemCountOthers + itemofflandall, " Pallets"), _react.default.createElement("th", null, openJobsOthers.length + openJobstotal.length, " Jobs"), _react.default.createElement("th", null, completedJobsOthers.length + completedJobstotal.length, " ", "Jobs"), _react.default.createElement("th", {
            style: {
              color: "red"
            }
          }, cancelledJobsOthers.length + cancelledJobstotal.length, " ", "jobs"), _react.default.createElement("th", null, openJobsOthers.length + completedJobsOthers.length + cancelledJobsOthers.length + (openJobstotal.length + completedJobstotal.length + cancelledJobstotal.length), " ", "Jobs"))))));
      }
    }
  }]);

  return BreakdownByDeliveryLocations;
}(_react.Component);

var _default = BreakdownByDeliveryLocations;
exports.default = _default;

//# sourceMappingURL=BreakdownByDeliveryLocations.js.map
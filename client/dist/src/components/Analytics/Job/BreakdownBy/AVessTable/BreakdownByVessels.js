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

var BreakdownByVessels =
/*#__PURE__*/
function (_Component) {
  _inherits(BreakdownByVessels, _Component);

  function BreakdownByVessels() {
    _classCallCheck(this, BreakdownByVessels);

    return _possibleConstructorReturn(this, _getPrototypeOf(BreakdownByVessels).apply(this, arguments));
  }

  _createClass(BreakdownByVessels, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          jobVesselsCategory = _this$props.jobVesselsCategory,
          Vessel = _this$props.Vessel;

      switch (jobVesselsCategory && Vessel) {
        case null:
          return _react.default.createElement("div", null);

        default:
          var jobSort = [];
          var o = 0;
          var cancelledJobstotal = [];
          var openJobstotal = [];
          var completedJobstotal = [];
          var cancelledJobsOthers = 0;
          var openJobsOthers = 0;
          var completedJobsOthers = 0;
          var vessels = Vessel.map(function (vessel) {
            var jobVesselCategories = Object.keys(jobVesselsCategory).map(function (key, index) {
              var jobs = jobVesselsCategory[key];
              var cancelledJobs = [];
              var openJobs = [];
              var completedJobs = [];

              if (key === vessel._id) {
                for (var i = 0; i < jobs.length; i++) {
                  var job = jobs[i];

                  if (job.isCancelled === "confirmed") {
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
                  }
                }

                var sortJob = {
                  id: "".concat(o++),
                  vessel: "".concat(vessel.vesselName),
                  vesselIMO: "".concat(vessel.vesselIMOID),
                  vesselCallsign: "".concat(vessel.vesselCallsign),
                  ongoing: "".concat(openJobs.length),
                  completed: "".concat(completedJobs.length),
                  cancelled: "".concat(cancelledJobs.length),
                  total: "".concat(openJobs.length + completedJobs.length + cancelledJobs.length)
                };
                jobSort.push(sortJob);
              }
            });
          });
          jobSort.sort(function (a, b) {
            return b.total - a.total;
          });
          var fillData = jobSort.map(function (job, index) {
            if (index < 50) {
              return _react.default.createElement("tr", {
                key: job.id
              }, _react.default.createElement("td", null, job.vessel ? job.vessel : "-"), _react.default.createElement("td", null, job.vesselIMO), _react.default.createElement("td", null, job.vesselCallsign ? job.vesselCallsign : "-"), _react.default.createElement("td", null, job.ongoing), _react.default.createElement("td", null, job.completed), _react.default.createElement("td", {
                style: {
                  color: "red"
                }
              }, job.cancelled), _react.default.createElement("td", null, job.total));
            } else {
              openJobsOthers += parseInt(job.ongoing);
              completedJobsOthers += parseInt(job.completed);
              cancelledJobsOthers += parseInt(job.cancelled);
            }
          });
          return _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
            cs: "12",
            md: {
              size: 12,
              offset: 0
            },
            className: "text-center"
          }, _react.default.createElement("h1", null, "Job breakdown by Vessels")), _react.default.createElement(_reactstrap.Col, {
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
          }, _react.default.createElement("th", null, "Vessels Name"), _react.default.createElement("th", null, "Vessels IMO"), _react.default.createElement("th", null, "Vessels Callsign"), _react.default.createElement("th", null, "Ongoing Jobs"), _react.default.createElement("th", null, "Completed Jobs"), _react.default.createElement("th", null, "Cancelled Jobs"), _react.default.createElement("th", null, "Total Jobs"))), _react.default.createElement("tbody", null, fillData, _react.default.createElement("tr", null, _react.default.createElement("td", null, "Others"), _react.default.createElement("td", null), _react.default.createElement("td", null), _react.default.createElement("td", null, openJobsOthers), _react.default.createElement("td", null, completedJobsOthers), _react.default.createElement("td", {
            style: {
              color: "red"
            }
          }, cancelledJobsOthers), _react.default.createElement("td", null, openJobsOthers + completedJobsOthers + cancelledJobsOthers))), _react.default.createElement("br", null), _react.default.createElement("tfoot", null, _react.default.createElement("tr", null, _react.default.createElement("th", {
            colSpan: "3"
          }, "Total"), _react.default.createElement("th", null, openJobstotal.length, " Jobs"), _react.default.createElement("th", null, completedJobstotal.length, " Jobs"), _react.default.createElement("th", {
            style: {
              color: "red"
            }
          }, cancelledJobstotal.length, " jobs"), _react.default.createElement("th", null, openJobstotal.length + completedJobstotal.length + cancelledJobstotal.length, " ", "Jobs"))))));
      }
    }
  }]);

  return BreakdownByVessels;
}(_react.Component);

var _default = BreakdownByVessels;
exports.default = _default;

//# sourceMappingURL=BreakdownByVessels.js.map
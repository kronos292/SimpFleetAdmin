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

var BreakdownByCompanies =
/*#__PURE__*/
function (_Component) {
  _inherits(BreakdownByCompanies, _Component);

  function BreakdownByCompanies() {
    _classCallCheck(this, BreakdownByCompanies);

    return _possibleConstructorReturn(this, _getPrototypeOf(BreakdownByCompanies).apply(this, arguments));
  }

  _createClass(BreakdownByCompanies, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          jobCompaniesCategory = _this$props.jobCompaniesCategory,
          Company = _this$props.Company;

      switch (jobCompaniesCategory && Company) {
        case null:
          return _react.default.createElement("div", null);

        default:
          var jobSort = [];
          var o = 0;
          var cancelledjobstotal = [];
          var openjobstotal = [];
          var completedjobstotal = [];
          var psaTotal = [];
          var jpTotal = [];
          var shipyardTotal = [];
          var othersTotal = [];
          var jobCompanieCategories = Object.keys(Company).map(function (uniq, index) {
            var companyData = Company[uniq][0].name;
            var cancelledJobs = [];
            var openJobs = [];
            var completedJobs = [];
            var psaJobs = [];
            var jpJobs = [];
            var shipyardJobs = [];
            var othersJobs = [];
            var jobData = Object.keys(jobCompaniesCategory).map(function (key, index) {
              var jobs = jobCompaniesCategory[key];

              if (uniq === key) {
                for (var i = 0; i < jobs.length; i++) {
                  var job = jobs[i];

                  if (job.vesselLoadingLocation !== undefined) {
                    if (job.vesselLoadingLocation !== null) {
                      if (job.vesselLoadingLocation.name !== undefined) {
                        if (job.vesselLoadingLocation.name !== null) {
                          if (job.vesselLoadingLocation.name === "PSA") {
                            psaJobs.push(job);
                            psaTotal.push(job);
                          } else if (job.vesselLoadingLocation.name === "Jurong Port") {
                            jpJobs.push(job);
                            jpTotal.push(job);
                          } else if (job.vesselLoadingLocation.name === "Shipyard") {
                            shipyardJobs.push(job);
                            shipyardTotal.push(job);
                          } else {
                            othersJobs.push(job);
                            othersTotal.push(job);
                          }
                        }
                      }
                    }
                  }

                  if (job.isCancelled === "Confirmed") {
                    cancelledJobs.push(job);
                    cancelledjobstotal.push(job);
                  } else {
                    if (job.jobTrackers.length === 6) {
                      completedJobs.push(job);
                      completedjobstotal.push(job);
                    } else {
                      openJobs.push(job);
                      openjobstotal.push(job);
                    }
                  }
                }
              }
            });
            var sortJob = {
              id: "".concat(o++),
              company: "".concat(companyData),
              ongoing: "".concat(openJobs.length),
              completed: "".concat(completedJobs.length),
              cancelled: "".concat(cancelledJobs.length),
              total: "".concat(openJobs.length + completedJobs.length + cancelledJobs.length),
              psa: "".concat(psaJobs.length),
              jp: "".concat(jpJobs.length),
              shipyard: "".concat(shipyardJobs.length),
              others: "".concat(othersJobs.length)
            };
            jobSort.push(sortJob);
          });
          jobSort.sort(function (a, b) {
            return b.total - a.total;
          });
          var fillData = jobSort.map(function (job) {
            return _react.default.createElement("tr", {
              key: job.id
            }, _react.default.createElement("td", null, job.company), _react.default.createElement("td", null, job.ongoing), _react.default.createElement("td", null, job.completed), _react.default.createElement("td", {
              style: {
                color: "red"
              }
            }, job.cancelled), _react.default.createElement("td", null, job.total), _react.default.createElement("td", null, job.psa), _react.default.createElement("td", null, job.jp), _react.default.createElement("td", null, job.shipyard), _react.default.createElement("td", null, job.others));
          });
          return _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
            cs: "12",
            md: {
              size: 12,
              offset: 0
            },
            className: "text-center"
          }, _react.default.createElement("h1", null, "Job breakdown by Companies")), _react.default.createElement(_reactstrap.Col, {
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
          }, _react.default.createElement("thead", {
            style: {
              backgroundColor: "#49AE4B",
              color: "white",
              textAlign: "center"
            }
          }, _react.default.createElement("tr", null, _react.default.createElement("th", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Companies"), _react.default.createElement("th", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Ongoing Jobs"), _react.default.createElement("th", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Completed Jobs"), _react.default.createElement("th", {
            style: {
              color: "red",
              verticalAlign: "middle"
            },
            rowSpan: "2"
          }, "Cancelled Jobs"), _react.default.createElement("th", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Total Jobs"), _react.default.createElement("th", {
            colSpan: "4"
          }, "Delivery Location")), _react.default.createElement("tr", null, _react.default.createElement("th", null, "PSA Port"), _react.default.createElement("th", null, "Jurong Port-LT"), _react.default.createElement("th", null, "Shipyard"), _react.default.createElement("th", null, "Others"))), _react.default.createElement("tbody", null, fillData), _react.default.createElement("br", null), _react.default.createElement("tfoot", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Total"), _react.default.createElement("th", null, openjobstotal.length, " Jobs"), _react.default.createElement("th", null, completedjobstotal.length, " Jobs"), _react.default.createElement("th", {
            style: {
              color: "red"
            }
          }, cancelledjobstotal.length, " Jobs"), _react.default.createElement("th", null, openjobstotal.length + completedjobstotal.length + cancelledjobstotal.length, " ", "Jobs"), _react.default.createElement("th", null, psaTotal.length, " Jobs"), _react.default.createElement("th", null, jpTotal.length, " Jobs"), _react.default.createElement("th", null, shipyardTotal.length, " Jobs"), _react.default.createElement("th", null, othersTotal.length, " Jobs"))))));
      }
    }
  }]);

  return BreakdownByCompanies;
}(_react.Component);

var _default = BreakdownByCompanies;
exports.default = _default;

//# sourceMappingURL=BreakdownByCompanies.js.map
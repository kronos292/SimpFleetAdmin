"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _reactChartjs = require("react-chartjs-2");

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

var Charts =
/*#__PURE__*/
function (_Component) {
  _inherits(Charts, _Component);

  function Charts() {
    _classCallCheck(this, Charts);

    return _possibleConstructorReturn(this, _getPrototypeOf(Charts).apply(this, arguments));
  }

  _createClass(Charts, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          jobMonthAnalys = _this$props.jobMonthAnalys,
          jobDeliveryCategory = _this$props.jobDeliveryCategory;

      switch (jobMonthAnalys && jobDeliveryCategory) {
        case null:
          return _react.default.createElement("div", null);

        default:
          var monthOfmap = [];
          var psajob = [];
          var jpjob = [];
          var shipyardjob = [];
          var Others = [];
          var psaItems = [];
          var jpItems = [];
          var shipyardItems = [];
          var OthersItems = [];
          var MonthMap = Object.keys(jobMonthAnalys).map(function (key, index) {
            var psaitems = 0;
            var jpitems = 0;
            var shipyarditems = 0;
            var othersitems = 0;
            var jobPSA = [];
            var jobjp = [];
            var jobshipyard = [];
            var jobOthers = [];
            var DeliveryLocations = Object.keys(jobDeliveryCategory).map(function (uniq) {
              var jobs = jobDeliveryCategory[uniq];

              if (uniq === "PSA") {
                for (var i = 0; i < jobs.length; i++) {
                  var job = jobs[i];

                  if (key === "".concat(new Date(job.jobBookingDateTime).getMonth() + 1, "/").concat(new Date(job.jobBookingDateTime).getFullYear()) && job.jobItems.length !== 0 && job.isCancelled !== "Confirmed") {
                    for (var j = 0; j < job.jobItems.length; j++) {
                      psaitems += job.jobItems[j].quantity;
                    }

                    jobPSA.push(job);
                  }
                }
              } else if (uniq === "Jurong Port") {
                for (var _i = 0; _i < jobs.length; _i++) {
                  var _job = jobs[_i];

                  if (key === "".concat(new Date(_job.jobBookingDateTime).getMonth() + 1, "/").concat(new Date(_job.jobBookingDateTime).getFullYear()) && _job.jobItems.length !== 0 && _job.isCancelled !== "Confirmed") {
                    for (var _j = 0; _j < _job.jobItems.length; _j++) {
                      jpitems += _job.jobItems[_j].quantity;
                    }

                    jobjp.push(_job);
                  }
                }
              } else if (uniq === "Shipyard") {
                for (var _i2 = 0; _i2 < jobs.length; _i2++) {
                  var _job2 = jobs[_i2];

                  if (key === "".concat(new Date(_job2.jobBookingDateTime).getMonth() + 1, "/").concat(new Date(_job2.jobBookingDateTime).getFullYear()) && _job2.jobItems.length !== 0 && _job2.isCancelled !== "Confirmed") {
                    for (var _j2 = 0; _j2 < _job2.jobItems.length; _j2++) {
                      shipyarditems += _job2.jobItems[_j2].quantity;
                    }

                    jobshipyard.push(_job2);
                  }
                }
              } else {
                for (var _i3 = 0; _i3 < jobs.length; _i3++) {
                  var _job3 = jobs[_i3];

                  if (key === "".concat(new Date(_job3.jobBookingDateTime).getMonth() + 1, "/").concat(new Date(_job3.jobBookingDateTime).getFullYear()) && _job3.jobItems.length !== 0 && _job3.isCancelled !== "Confirmed") {
                    for (var _j3 = 0; _j3 < _job3.jobItems.length; _j3++) {
                      othersitems += _job3.jobItems[_j3].quantity;
                    }

                    jobOthers.push(_job3);
                  }
                }
              }
            });

            if ("".concat(key.charAt(0)).concat(key.charAt(1)) === "1/") {
              monthOfmap.push("Jan");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "2/") {
              monthOfmap.push("Feb");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "3/") {
              monthOfmap.push("Mar");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "4/") {
              monthOfmap.push("Apr");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "5/") {
              monthOfmap.push("May");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "6/") {
              monthOfmap.push("Jun");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "7/") {
              monthOfmap.push("Jul");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "8/") {
              monthOfmap.push("Aug");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "9/") {
              monthOfmap.push("Sep");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "10") {
              monthOfmap.push("Oct");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "11") {
              monthOfmap.push("Nov");
            } else if (String("".concat(key.charAt(0)).concat(key.charAt(1))) === "12") {
              monthOfmap.push("Dec");
            }

            psaItems.push(psaitems);
            jpItems.push(jpitems);
            shipyardItems.push(shipyarditems);
            OthersItems.push(othersitems);
            psajob.push(jobPSA.length);
            jpjob.push(jobjp.length);
            shipyardjob.push(jobshipyard.length);
            Others.push(jobOthers.length);
          });
          var chartDataOfmonth = {
            labels: monthOfmap,
            datasets: [{
              label: "PSA Port",
              stack: "Stack 0",
              data: psajob,
              backgroundColor: "rgb(161, 217, 180)"
            }, {
              label: "JP-LT",
              stack: "Stack 0",
              data: jpjob,
              backgroundColor: "rgb(28, 201, 140)"
            }, {
              label: "Shipyard",
              stack: "Stack 0",
              data: shipyardjob,
              backgroundColor: "rgb(13, 140, 100)"
            }, {
              label: "Others",
              stack: "Stack 0",
              data: Others,
              backgroundColor: "rgb(10, 92, 60)"
            }]
          };
          var chartDataOfItems = {
            labels: monthOfmap,
            datasets: [{
              label: "PSA Port",
              stack: "Stack 0",
              data: psajob,
              backgroundColor: "rgb(161, 217, 180)"
            }, {
              label: "JP-LT",
              stack: "Stack 0",
              data: jpjob,
              backgroundColor: "rgb(28, 201, 140)"
            }, {
              label: "Shipyard",
              stack: "Stack 0",
              data: shipyardjob,
              backgroundColor: "rgb(13, 140, 100)"
            }, {
              label: "Others",
              stack: "Stack 0",
              data: Others,
              backgroundColor: "rgb(10, 92, 60)"
            }]
          };
          return _react.default.createElement(_reactstrap.Row, {
            style: {
              marginBottom: "15px"
            }
          }, _react.default.createElement(_reactstrap.Col, {
            cs: "6",
            md: {
              size: 6,
              offset: 0
            }
          }, _react.default.createElement(_reactstrap.Card, null, _react.default.createElement(_reactstrap.CardBody, null, _react.default.createElement(_reactstrap.CardTitle, {
            style: {
              textDecoration: "bold"
            }
          }, "No Of Deliveries"), _react.default.createElement(_reactstrap.CardText, null, _react.default.createElement(_reactChartjs.Bar, {
            data: chartDataOfmonth,
            options: {
              legend: {
                display: true,
                position: "bottom"
              },
              scales: {
                yAxes: [{
                  ticks: {
                    callback: function callback(value, index, values) {
                      return value + " Deliveries";
                    },
                    beginAtZero: true
                  }
                }]
              }
            }
          }))))), _react.default.createElement(_reactstrap.Col, {
            cs: "6",
            md: {
              size: 6,
              offset: 0
            }
          }, _react.default.createElement(_reactstrap.Card, null, _react.default.createElement(_reactstrap.CardBody, null, _react.default.createElement(_reactstrap.CardTitle, null, "No Of Items"), _react.default.createElement(_reactstrap.CardText, null, _react.default.createElement(_reactChartjs.Bar, {
            data: chartDataOfItems,
            options: {
              legend: {
                display: true,
                position: "bottom"
              },
              scales: {
                yAxes: [{
                  ticks: {
                    callback: function callback(value, index, values) {
                      return value + " Items";
                    },
                    beginAtZero: true
                  }
                }]
              }
            }
          }))))));
      }
    }
  }]);

  return Charts;
}(_react.Component);

var _default = Charts;
exports.default = _default;

//# sourceMappingURL=Charts.js.map
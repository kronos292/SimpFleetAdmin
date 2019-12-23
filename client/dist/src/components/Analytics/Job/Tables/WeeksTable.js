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

var WeeksTable =
/*#__PURE__*/
function (_Component) {
  _inherits(WeeksTable, _Component);

  function WeeksTable() {
    _classCallCheck(this, WeeksTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(WeeksTable).apply(this, arguments));
  }

  _createClass(WeeksTable, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          WeeksData = _this$props.WeeksData,
          Company = _this$props.Company;

      switch (WeeksData) {
        case null:
          return _react.default.createElement("div", null);

        default:
          var jobMap = Object.keys(WeeksData).map(function (key, index) {
            var jobs = WeeksData[key];
            var topclient = [];
            var price = 0;
            var palletitemCount = 0;
            var bundleitemCount = 0;
            var cartonitemCount = 0;
            var bluebinitemCount = 0;
            var palletofflanditemCount = 0;
            var bundleofflanditemCount = 0;
            var cartonofflanditemCount = 0;
            var bluebinofflanditemCount = 0;
            var palletitemTimes = 0;
            var bundleitemTimes = 0;
            var cartonitemTimes = 0;
            var bluebinitemTimes = 0;
            var palletofflanditemTimes = 0;
            var bundleofflanditemTimes = 0;
            var cartonofflanditemTimes = 0;
            var bluebinofflanditemTimes = 0;
            var psaPallet = 0;
            var psaBundle = 0;
            var psaCarton = 0;
            var psaBluebin = 0;
            var jpPallet = 0;
            var jpBundle = 0;
            var jpCarton = 0;
            var jpBluebin = 0;
            var shipyardPallet = 0;
            var shipyardBundle = 0;
            var shipyardCarton = 0;
            var shipyardBluebin = 0;
            var otherPallet = 0;
            var otherBundle = 0;
            var otherCarton = 0;
            var otherBluebin = 0;
            var cancelledJobs = [];
            var openJobs = [];
            var completedJobs = [];
            var psaJob = [];
            var jpJob = [];
            var shipyardJob = [];
            var otherJob = [];

            var _loop = function _loop(i) {
              var job = jobs[i];

              if (job.isCancelled === "Confirmed") {
                cancelledJobs.push(job);
              } else {
                if (job.jobTrackers.length === 6) {
                  completedJobs.push(job);
                } else {
                  openJobs.push(job);
                }

                if (job.vesselLoadingLocation === "PSA") {
                  psaJob.push(job);
                  var jobItems = job.jobItems,
                      jobOfflandItems = job.jobOfflandItems;

                  if (jobItems && jobItems.length > 0) {
                    for (var j = 0; j < jobItems.length; j++) {
                      var jobItem = jobItems[j];

                      if (jobItem.uom === "Pallet") {
                        palletitemTimes++;
                        palletitemCount += jobItem.quantity;
                        price += jobItem.price;
                        psaPallet += jobItem.quantity;
                      } else if (jobItem.uom === "Bundle") {
                        bundleitemTimes++;
                        bundleitemCount += jobItem.quantity;
                        price += jobItem.price;
                        psaBundle += jobItem.quantity;
                      } else if (jobItem.uom === "Carton") {
                        cartonitemTimes++;
                        cartonitemCount += jobItem.quantity;
                        price += jobItem.price;
                        psaCarton += jobItem.quantity;
                      } else if (jobItem.uom === "Bluebin") {
                        bluebinitemTimes++;
                        bluebinitemCount += jobItem.quantity;
                        price += jobItem.price;
                        psaBluebin += jobItem.quantity;
                      }
                    }
                  }

                  if (jobOfflandItems && jobOfflandItems.length > 0) {
                    for (var _j = 0; _j < jobOfflandItems.length; _j++) {
                      var jobOfflandItem = jobOfflandItems[_j];

                      if (jobOfflandItem.uom === "Pallet") {
                        palletofflanditemTimes++;
                        palletofflanditemCount += jobOfflandItem.quantity;
                        price += jobOfflandItem.price;
                        psaPallet += jobOfflandItem.quantity;
                      } else if (jobOfflandItem.uom === "Bundle") {
                        bundleofflanditemTimes++;
                        bundleofflanditemCount += jobOfflandItem.quantity;
                        price += jobOfflandItem.price;
                        psaBundle += jobOfflandItem.quantity;
                      } else if (jobOfflandItem.uom === "Carton") {
                        cartonofflanditemTimes++;
                        cartonofflanditemCount += jobOfflandItem.quantity;
                        price += jobOfflandItem.price;
                        psaCarton += jobOfflandItem.quantity;
                      } else if (jobOfflandItem.uom === "Bluebin") {
                        bluebinofflanditemTimes++;
                        bluebinofflanditemCount += jobOfflandItem.quantity;
                        price += jobOfflandItem.price;
                        psaBluebin += jobOfflandItem.quantity;
                      }
                    }
                  }
                } else if (job.vesselLoadingLocation === "Jurong Port") {
                  jpJob.push(job);
                  var _jobItems = job.jobItems,
                      _jobOfflandItems = job.jobOfflandItems;

                  if (_jobItems && _jobItems.length > 0) {
                    for (var _j2 = 0; _j2 < _jobItems.length; _j2++) {
                      var _jobItem = _jobItems[_j2];

                      if (_jobItem.uom === "Pallet") {
                        palletitemTimes++;
                        palletitemCount += _jobItem.quantity;
                        price += _jobItem.price;
                        jpPallet += _jobItem.quantity;
                      } else if (_jobItem.uom === "Bundle") {
                        bundleitemTimes++;
                        bundleitemCount += _jobItem.quantity;
                        price += _jobItem.price;
                        jpBundle += _jobItem.quantity;
                      } else if (_jobItem.uom === "Carton") {
                        cartonitemTimes++;
                        cartonitemCount += _jobItem.quantity;
                        price += _jobItem.price;
                        jpCarton += _jobItem.quantity;
                      } else if (_jobItem.uom === "Bluebin") {
                        bluebinitemTimes++;
                        bluebinitemCount += _jobItem.quantity;
                        price += _jobItem.price;
                        jpBluebin += _jobItem.quantity;
                      }
                    }
                  }

                  if (_jobOfflandItems && _jobOfflandItems.length > 0) {
                    for (var _j3 = 0; _j3 < _jobOfflandItems.length; _j3++) {
                      var _jobOfflandItem = _jobOfflandItems[_j3];

                      if (_jobOfflandItem.uom === "Pallet") {
                        palletofflanditemTimes++;
                        palletofflanditemCount += _jobOfflandItem.quantity;
                        price += _jobOfflandItem.price;
                        jpPallet += _jobOfflandItem.quantity;
                      } else if (_jobOfflandItem.uom === "Bundle") {
                        bundleofflanditemTimes++;
                        bundleofflanditemCount += _jobOfflandItem.quantity;
                        price += _jobOfflandItem.price;
                        jpBundle += _jobOfflandItem.quantity;
                      } else if (_jobOfflandItem.uom === "Carton") {
                        cartonofflanditemTimes++;
                        cartonofflanditemCount += _jobOfflandItem.quantity;
                        price += _jobOfflandItem.price;
                        jpCarton += _jobOfflandItem.quantity;
                      } else if (_jobOfflandItem.uom === "Bluebin") {
                        bluebinofflanditemTimes++;
                        bluebinofflanditemCount += _jobOfflandItem.quantity;
                        price += _jobOfflandItem.price;
                        jpBluebin += _jobOfflandItem.quantity;
                      }
                    }
                  }
                } else if (job.vesselLoadingLocation === "Shipyard") {
                  shipyardJob.push(job);
                  var _jobItems2 = job.jobItems,
                      _jobOfflandItems2 = job.jobOfflandItems;

                  if (_jobItems2 && _jobItems2.length > 0) {
                    for (var _j4 = 0; _j4 < _jobItems2.length; _j4++) {
                      var _jobItem2 = _jobItems2[_j4];

                      if (_jobItem2.uom === "Pallet") {
                        palletitemTimes++;
                        palletitemCount += _jobItem2.quantity;
                        price += _jobItem2.price;
                        shipyardPallet += _jobItem2.quantity;
                      } else if (_jobItem2.uom === "Bundle") {
                        bundleitemTimes++;
                        bundleitemCount += _jobItem2.quantity;
                        price += _jobItem2.price;
                        shipyardBundle += _jobItem2.quantity;
                      } else if (_jobItem2.uom === "Carton") {
                        cartonitemTimes++;
                        cartonitemCount += _jobItem2.quantity;
                        price += _jobItem2.price;
                        shipyardCarton += _jobItem2.quantity;
                      } else if (_jobItem2.uom === "Bluebin") {
                        bluebinitemTimes++;
                        bluebinitemCount += _jobItem2.quantity;
                        price += _jobItem2.price;
                        shipyardBluebin += _jobItem2.quantity;
                      }
                    }
                  }

                  if (_jobOfflandItems2 && _jobOfflandItems2.length > 0) {
                    for (var _j5 = 0; _j5 < _jobOfflandItems2.length; _j5++) {
                      var _jobOfflandItem2 = _jobOfflandItems2[_j5];

                      if (_jobOfflandItem2.uom === "Pallet") {
                        palletofflanditemTimes++;
                        palletofflanditemCount += _jobOfflandItem2.quantity;
                        price += _jobOfflandItem2.price;
                        shipyardPallet += _jobOfflandItem2.quantity;
                      } else if (_jobOfflandItem2.uom === "Bundle") {
                        bundleofflanditemTimes++;
                        bundleofflanditemCount += _jobOfflandItem2.quantity;
                        price += _jobOfflandItem2.price;
                        shipyardBundle += _jobOfflandItem2.quantity;
                      } else if (_jobOfflandItem2.uom === "Carton") {
                        cartonofflanditemTimes++;
                        cartonofflanditemCount += _jobOfflandItem2.quantity;
                        price += _jobOfflandItem2.price;
                        shipyardCarton += _jobOfflandItem2.quantity;
                      } else if (_jobOfflandItem2.uom === "Bluebin") {
                        bluebinofflanditemTimes++;
                        bluebinofflanditemCount += _jobOfflandItem2.quantity;
                        price += _jobOfflandItem2.price;
                        shipyardBluebin += _jobOfflandItem2.quantity;
                      }
                    }
                  }
                } else {
                  otherJob.push(job);
                  var _jobItems3 = job.jobItems,
                      _jobOfflandItems3 = job.jobOfflandItems;

                  if (_jobItems3 && _jobItems3.length > 0) {
                    for (var _j6 = 0; _j6 < _jobItems3.length; _j6++) {
                      var _jobItem3 = _jobItems3[_j6];

                      if (_jobItem3.uom === "Pallet") {
                        palletitemTimes++;
                        palletitemCount += _jobItem3.quantity;
                        price += _jobItem3.price;
                        otherPallet += _jobItem3.quantity;
                      } else if (_jobItem3.uom === "Bundle") {
                        bundleitemTimes++;
                        bundleitemCount += _jobItem3.quantity;
                        price += _jobItem3.price;
                        otherBundle += _jobItem3.quantity;
                      } else if (_jobItem3.uom === "Carton") {
                        cartonitemTimes++;
                        cartonitemCount += _jobItem3.quantity;
                        price += _jobItem3.price;
                        otherCarton += _jobItem3.quantity;
                      } else if (_jobItem3.uom === "Bluebin") {
                        bluebinitemTimes++;
                        bluebinitemCount += _jobItem3.quantity;
                        price += _jobItem3.price;
                        otherBluebin += _jobItem3.quantity;
                      }
                    }
                  }

                  if (_jobOfflandItems3 && _jobOfflandItems3.length > 0) {
                    for (var _j7 = 0; _j7 < _jobOfflandItems3.length; _j7++) {
                      var _jobOfflandItem3 = _jobOfflandItems3[_j7];

                      if (_jobOfflandItem3.uom === "Pallet") {
                        palletofflanditemTimes++;
                        palletofflanditemCount += _jobOfflandItem3.quantity;
                        price += _jobOfflandItem3.price;
                        otherPallet += _jobOfflandItem3.quantity;
                      } else if (_jobOfflandItem3.uom === "Bundle") {
                        bundleofflanditemTimes++;
                        bundleofflanditemCount += _jobOfflandItem3.quantity;
                        price += _jobOfflandItem3.price;
                        otherBundle += _jobOfflandItem3.quantity;
                      } else if (_jobOfflandItem3.uom === "Carton") {
                        cartonofflanditemTimes++;
                        cartonofflanditemCount += _jobOfflandItem3.quantity;
                        price += _jobOfflandItem3.price;
                        otherCarton += _jobOfflandItem3.quantity;
                      } else if (_jobOfflandItem3.uom === "Bluebin") {
                        bluebinofflanditemTimes++;
                        bluebinofflanditemCount += _jobOfflandItem3.quantity;
                        price += _jobOfflandItem3.price;
                        otherBluebin += _jobOfflandItem3.quantity;
                      }
                    }
                  }
                }
              }

              if (job.user.userCompany !== null) {
                var compCompare = Object.keys(Company).map(function (uniq, index) {
                  var companyName = Company[uniq][0].name;

                  if (job.user.userCompany === uniq) {
                    var clientlist = topclient[companyName];

                    if (!clientlist) {
                      clientlist = [];
                      topclient[companyName] = clientlist;
                    }

                    clientlist.push(job);
                  }
                });
              }
            };

            for (var i = 0; i < jobs.length; i++) {
              _loop(i);
            }

            topclient.sort(function (a, b) {
              return a.length - b.length;
            });
            var client = Object.keys(topclient);
            return _react.default.createElement("tr", {
              key: index
            }, _react.default.createElement("td", null, key), _react.default.createElement("td", null, client[0]), _react.default.createElement("td", null, openJobs.length), _react.default.createElement("td", null, cancelledJobs.length), _react.default.createElement("td", null, completedJobs.length), _react.default.createElement("td", null, openJobs.length + cancelledJobs.length + completedJobs.length), _react.default.createElement("td", null, palletitemCount), _react.default.createElement("td", null, palletitemCount === 0 ? "0" : (palletitemCount / palletitemTimes).toFixed(2)), _react.default.createElement("td", null, bundleitemCount), _react.default.createElement("td", null, bundleitemCount === 0 ? "0" : (bundleitemCount / bundleitemTimes).toFixed(2)), _react.default.createElement("td", null, cartonitemCount), _react.default.createElement("td", null, cartonitemCount === 0 ? "0" : (cartonitemCount / cartonitemTimes).toFixed(2)), _react.default.createElement("td", null, bluebinitemCount), _react.default.createElement("td", null, bluebinitemCount === 0 ? "0" : (bluebinitemCount / bluebinitemTimes).toFixed(2)), _react.default.createElement("td", null, palletofflanditemCount), _react.default.createElement("td", null, palletofflanditemCount === 0 ? "0" : (palletofflanditemCount / palletofflanditemTimes).toFixed(2)), _react.default.createElement("td", null, bundleofflanditemCount), _react.default.createElement("td", null, bundleofflanditemCount === 0 ? "0" : (bundleofflanditemCount / bundleofflanditemTimes).toFixed(2)), _react.default.createElement("td", null, cartonofflanditemCount), _react.default.createElement("td", null, cartonofflanditemCount === 0 ? "0" : (cartonofflanditemCount / cartonofflanditemTimes).toFixed(2)), _react.default.createElement("td", null, bluebinofflanditemCount), _react.default.createElement("td", null, bluebinofflanditemCount === 0 ? "0" : (bluebinofflanditemCount / bluebinofflanditemTimes).toFixed(2)), _react.default.createElement("td", null, psaJob.length), _react.default.createElement("td", null, psaPallet), _react.default.createElement("td", null, psaBundle), _react.default.createElement("td", null, psaCarton), _react.default.createElement("td", null, psaBluebin), _react.default.createElement("td", null, jpJob.length), _react.default.createElement("td", null, jpPallet), _react.default.createElement("td", null, jpBundle), _react.default.createElement("td", null, jpCarton), _react.default.createElement("td", null, jpBluebin), _react.default.createElement("td", null, shipyardJob.length), _react.default.createElement("td", null, shipyardPallet), _react.default.createElement("td", null, shipyardBundle), _react.default.createElement("td", null, shipyardCarton), _react.default.createElement("td", null, shipyardBluebin), _react.default.createElement("td", null, otherJob.length), _react.default.createElement("td", null, otherPallet), _react.default.createElement("td", null, otherBundle), _react.default.createElement("td", null, otherCarton), _react.default.createElement("td", null, otherBluebin), _react.default.createElement("td", null, _react.default.createElement("i", null, "$ ", price, ".")));
          });
          return _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Table, {
            striped: true,
            bordered: true,
            responsive: true,
            size: "sm",
            style: {
              minWidth: "7100px"
            }
          }, _react.default.createElement("thead", {
            style: {
              backgroundColor: "#49AE4B",
              color: "white",
              textAlign: "center"
            }
          }, _react.default.createElement("tr", null, _react.default.createElement("td", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Week"), _react.default.createElement("td", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Top Client"), _react.default.createElement("td", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Ongoing Jobs"), _react.default.createElement("td", {
            rowSpan: "2",
            style: {
              color: "red",
              verticalAlign: "middle"
            }
          }, "Cancelled Jobs"), _react.default.createElement("td", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Completed Jobs"), _react.default.createElement("td", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Total Jobs"), _react.default.createElement("td", {
            colSpan: "8"
          }, "Delivery"), _react.default.createElement("td", {
            colSpan: "8"
          }, "Offland"), _react.default.createElement("td", {
            colSpan: "5"
          }, "PSA"), _react.default.createElement("td", {
            colSpan: "5"
          }, "Jurong Port-LT"), _react.default.createElement("td", {
            colSpan: "5"
          }, "Shipyard"), _react.default.createElement("td", {
            colSpan: "5"
          }, "Others"), _react.default.createElement("td", {
            rowSpan: "2",
            style: {
              verticalAlign: "middle"
            }
          }, "Billing ($)")), _react.default.createElement("tr", null, _react.default.createElement("td", null, "Number Of Pallets"), _react.default.createElement("td", null, "Average number of pallets per delivery"), _react.default.createElement("td", null, "Number Of Bundles"), _react.default.createElement("td", null, "Average number of bundles per delivery"), _react.default.createElement("td", null, "Number Of Cartons"), _react.default.createElement("td", null, "Average number of cartons per delivery"), _react.default.createElement("td", null, "Number Of Bluebins"), _react.default.createElement("td", null, "Average number of bluebins per delivery"), _react.default.createElement("td", null, "Number Of Pallets"), _react.default.createElement("td", null, "Average number of pallets per delivery"), _react.default.createElement("td", null, "Number Of Bundles"), _react.default.createElement("td", null, "Average number of bundles per delivery"), _react.default.createElement("td", null, "Number Of Cartons"), _react.default.createElement("td", null, "Average number of cartons per delivery"), _react.default.createElement("td", null, "Number Of Bluebins"), _react.default.createElement("td", null, "Average number of bluebins per delivery"), _react.default.createElement("td", null, "Number Of Trips"), _react.default.createElement("td", null, "Number Of Pallets"), _react.default.createElement("td", null, "Number Of Bundles"), _react.default.createElement("td", null, "Number Of Cartons"), _react.default.createElement("td", null, "Number Of Bluebins"), _react.default.createElement("td", null, "Number Of Trips"), _react.default.createElement("td", null, "Number Of Pallets"), _react.default.createElement("td", null, "Number Of Bundles"), _react.default.createElement("td", null, "Number Of Cartons"), _react.default.createElement("td", null, "Number Of Bluebins"), _react.default.createElement("td", null, "Number Of Trips"), _react.default.createElement("td", null, "Number Of Pallets"), _react.default.createElement("td", null, "Number Of Bundles"), _react.default.createElement("td", null, "Number Of Cartons"), _react.default.createElement("td", null, "Number Of Bluebins"), _react.default.createElement("td", null, "Number Of Trips"), _react.default.createElement("td", null, "Number Of Pallets"), _react.default.createElement("td", null, "Number Of Bundles"), _react.default.createElement("td", null, "Number Of Cartons"), _react.default.createElement("td", null, "Number Of Bluebins"))), _react.default.createElement("tbody", null, jobMap))));
      }
    }
  }]);

  return WeeksTable;
}(_react.Component);

var _default = WeeksTable;
exports.default = _default;

//# sourceMappingURL=WeeksTable.js.map
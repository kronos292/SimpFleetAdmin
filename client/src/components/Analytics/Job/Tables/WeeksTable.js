import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class WeeksTable extends Component {
  render() {
    const { WeeksData } = this.props;
    switch (WeeksData) {
      case null:
        return <div></div>;
      default:
        const jobMap = Object.keys(WeeksData).map((key, index) => {
          const jobs = WeeksData[key];
          let topclient = [];
          let price = 0;
          let palletitemCount = 0;
          let bundleitemCount = 0;
          let cartonitemCount = 0;
          let bluebinitemCount = 0;
          let palletofflanditemCount = 0;
          let bundleofflanditemCount = 0;
          let cartonofflanditemCount = 0;
          let bluebinofflanditemCount = 0;
          let palletitemTimes = 0;
          let bundleitemTimes = 0;
          let cartonitemTimes = 0;
          let bluebinitemTimes = 0;
          let palletofflanditemTimes = 0;
          let bundleofflanditemTimes = 0;
          let cartonofflanditemTimes = 0;
          let bluebinofflanditemTimes = 0;
          let psaPallet = 0;
          let psaBundle = 0;
          let psaCarton = 0;
          let psaBluebin = 0;
          let jpPallet = 0;
          let jpBundle = 0;
          let jpCarton = 0;
          let jpBluebin = 0;
          let shipyardPallet = 0;
          let shipyardBundle = 0;
          let shipyardCarton = 0;
          let shipyardBluebin = 0;
          let otherPallet = 0;
          let otherBundle = 0;
          let otherCarton = 0;
          let otherBluebin = 0;
          const cancelledJobs = [];
          const openJobs = [];
          const completedJobs = [];
          const psaJob = [];
          const jpJob = [];
          const shipyardJob = [];
          const otherJob = [];
          for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];

            if (job.isCancelled === "Confirmed") {
              cancelledJobs.push(job);
            } else {
              if (job.jobTrackers.length === 6) {
                completedJobs.push(job);
              } else {
                openJobs.push(job);
              }
              console.log(job.vesselLoadingLocation);
              if (job.vesselLoadingLocation === "PSA") {
                psaJob.push(job);
                const { jobItems, jobOfflandItems } = job;
                if (jobItems && jobItems.length > 0) {
                  for (let j = 0; j < jobItems.length; j++) {
                    const jobItem = jobItems[j];
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
                  for (let j = 0; j < jobOfflandItems.length; j++) {
                    const jobOfflandItem = jobOfflandItems[j];
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
                const { jobItems, jobOfflandItems } = job;
                if (jobItems && jobItems.length > 0) {
                  for (let j = 0; j < jobItems.length; j++) {
                    const jobItem = jobItems[j];
                    if (jobItem.uom === "Pallet") {
                      palletitemTimes++;
                      palletitemCount += jobItem.quantity;
                      price += jobItem.price;
                      jpPallet += jobItem.quantity;
                    } else if (jobItem.uom === "Bundle") {
                      bundleitemTimes++;
                      bundleitemCount += jobItem.quantity;
                      price += jobItem.price;
                      jpBundle += jobItem.quantity;
                    } else if (jobItem.uom === "Carton") {
                      cartonitemTimes++;
                      cartonitemCount += jobItem.quantity;
                      price += jobItem.price;
                      jpCarton += jobItem.quantity;
                    } else if (jobItem.uom === "Bluebin") {
                      bluebinitemTimes++;
                      bluebinitemCount += jobItem.quantity;
                      price += jobItem.price;
                      jpBluebin += jobItem.quantity;
                    }
                  }
                }
                if (jobOfflandItems && jobOfflandItems.length > 0) {
                  for (let j = 0; j < jobOfflandItems.length; j++) {
                    const jobOfflandItem = jobOfflandItems[j];
                    if (jobOfflandItem.uom === "Pallet") {
                      palletofflanditemTimes++;
                      palletofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      jpPallet += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Bundle") {
                      bundleofflanditemTimes++;
                      bundleofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      jpBundle += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Carton") {
                      cartonofflanditemTimes++;
                      cartonofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      jpCarton += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Bluebin") {
                      bluebinofflanditemTimes++;
                      bluebinofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      jpBluebin += jobOfflandItem.quantity;
                    }
                  }
                }
              } else if (job.vesselLoadingLocation === "Shipyard") {
                shipyardJob.push(job);
                const { jobItems, jobOfflandItems } = job;
                if (jobItems && jobItems.length > 0) {
                  for (let j = 0; j < jobItems.length; j++) {
                    const jobItem = jobItems[j];
                    if (jobItem.uom === "Pallet") {
                      palletitemTimes++;
                      palletitemCount += jobItem.quantity;
                      price += jobItem.price;
                      shipyardPallet += jobItem.quantity;
                    } else if (jobItem.uom === "Bundle") {
                      bundleitemTimes++;
                      bundleitemCount += jobItem.quantity;
                      price += jobItem.price;
                      shipyardBundle += jobItem.quantity;
                    } else if (jobItem.uom === "Carton") {
                      cartonitemTimes++;
                      cartonitemCount += jobItem.quantity;
                      price += jobItem.price;
                      shipyardCarton += jobItem.quantity;
                    } else if (jobItem.uom === "Bluebin") {
                      bluebinitemTimes++;
                      bluebinitemCount += jobItem.quantity;
                      price += jobItem.price;
                      shipyardBluebin += jobItem.quantity;
                    }
                  }
                }
                if (jobOfflandItems && jobOfflandItems.length > 0) {
                  for (let j = 0; j < jobOfflandItems.length; j++) {
                    const jobOfflandItem = jobOfflandItems[j];
                    if (jobOfflandItem.uom === "Pallet") {
                      palletofflanditemTimes++;
                      palletofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      shipyardPallet += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Bundle") {
                      bundleofflanditemTimes++;
                      bundleofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      shipyardBundle += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Carton") {
                      cartonofflanditemTimes++;
                      cartonofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      shipyardCarton += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Bluebin") {
                      bluebinofflanditemTimes++;
                      bluebinofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      shipyardBluebin += jobOfflandItem.quantity;
                    }
                  }
                }
              } else {
                otherJob.push(job);
                const { jobItems, jobOfflandItems } = job;
                if (jobItems && jobItems.length > 0) {
                  for (let j = 0; j < jobItems.length; j++) {
                    const jobItem = jobItems[j];
                    if (jobItem.uom === "Pallet") {
                      palletitemTimes++;
                      palletitemCount += jobItem.quantity;
                      price += jobItem.price;
                      otherPallet += jobItem.quantity;
                    } else if (jobItem.uom === "Bundle") {
                      bundleitemTimes++;
                      bundleitemCount += jobItem.quantity;
                      price += jobItem.price;
                      otherBundle += jobItem.quantity;
                    } else if (jobItem.uom === "Carton") {
                      cartonitemTimes++;
                      cartonitemCount += jobItem.quantity;
                      price += jobItem.price;
                      otherCarton += jobItem.quantity;
                    } else if (jobItem.uom === "Bluebin") {
                      bluebinitemTimes++;
                      bluebinitemCount += jobItem.quantity;
                      price += jobItem.price;
                      otherBluebin += jobItem.quantity;
                    }
                  }
                }
                if (jobOfflandItems && jobOfflandItems.length > 0) {
                  for (let j = 0; j < jobOfflandItems.length; j++) {
                    const jobOfflandItem = jobOfflandItems[j];
                    if (jobOfflandItem.uom === "Pallet") {
                      palletofflanditemTimes++;
                      palletofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      otherPallet += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Bundle") {
                      bundleofflanditemTimes++;
                      bundleofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      otherBundle += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Carton") {
                      cartonofflanditemTimes++;
                      cartonofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      otherCarton += jobOfflandItem.quantity;
                    } else if (jobOfflandItem.uom === "Bluebin") {
                      bluebinofflanditemTimes++;
                      bluebinofflanditemCount += jobOfflandItem.quantity;
                      price += jobOfflandItem.price;
                      otherBluebin += jobOfflandItem.quantity;
                    }
                  }
                }
              }
            }

            if (
              job.user.userCompany !== null &&
              job.user.userCompany.name !== null
            ) {
              let clientlist = topclient[job.user.userCompany.name];
              if (!clientlist) {
                clientlist = [];
                topclient[job.user.userCompany.name] = clientlist;
              }
              clientlist.push(job);
            }
          }
          topclient.sort((a, b) => {
            return a.length - b.length;
          });
          const client = Object.keys(topclient);
          return (
            <tr key={index}>
              <td>{key}</td>
              <td>{client[0]}</td>
              <td>{openJobs.length}</td>
              <td>{cancelledJobs.length}</td>
              <td>{completedJobs.length}</td>
              <td>
                {openJobs.length + cancelledJobs.length + completedJobs.length}
              </td>
              <td>{palletitemCount}</td>
              <td>
                {palletitemCount === 0
                  ? "0"
                  : (palletitemCount / palletitemTimes).toFixed(2)}
              </td>
              <td>{bundleitemCount}</td>
              <td>
                {bundleitemCount === 0
                  ? "0"
                  : (bundleitemCount / bundleitemTimes).toFixed(2)}
              </td>
              <td>{cartonitemCount}</td>
              <td>
                {cartonitemCount === 0
                  ? "0"
                  : (cartonitemCount / cartonitemTimes).toFixed(2)}
              </td>
              <td>{bluebinitemCount}</td>
              <td>
                {bluebinitemCount === 0
                  ? "0"
                  : (bluebinitemCount / bluebinitemTimes).toFixed(2)}
              </td>
              <td>{palletofflanditemCount}</td>
              <td>
                {palletofflanditemCount === 0
                  ? "0"
                  : (palletofflanditemCount / palletofflanditemTimes).toFixed(
                      2
                    )}
              </td>
              <td>{bundleofflanditemCount}</td>
              <td>
                {bundleofflanditemCount === 0
                  ? "0"
                  : (bundleofflanditemCount / bundleofflanditemTimes).toFixed(
                      2
                    )}
              </td>
              <td>{cartonofflanditemCount}</td>
              <td>
                {cartonofflanditemCount === 0
                  ? "0"
                  : (cartonofflanditemCount / cartonofflanditemTimes).toFixed(
                      2
                    )}
              </td>
              <td>{bluebinofflanditemCount}</td>
              <td>
                {bluebinofflanditemCount === 0
                  ? "0"
                  : (bluebinofflanditemCount / bluebinofflanditemTimes).toFixed(
                      2
                    )}
              </td>
              <td>{psaJob.length}</td>
              <td>{psaPallet}</td>
              <td>{psaBundle}</td>
              <td>{psaCarton}</td>
              <td>{psaBluebin}</td>
              <td>{jpJob.length}</td>
              <td>{jpPallet}</td>
              <td>{jpBundle}</td>
              <td>{jpCarton}</td>
              <td>{jpBluebin}</td>
              <td>{shipyardJob.length}</td>
              <td>{shipyardPallet}</td>
              <td>{shipyardBundle}</td>
              <td>{shipyardCarton}</td>
              <td>{shipyardBluebin}</td>
              <td>{otherJob.length}</td>
              <td>{otherPallet}</td>
              <td>{otherBundle}</td>
              <td>{otherCarton}</td>
              <td>{otherBluebin}</td>
              <td>
                <i>$ {price}.</i>
              </td>
            </tr>
          );
        });

        return (
          <Row>
            <Col>
              <Table
                striped
                bordered
                responsive
                size="sm"
                style={{ minWidth: "7100px" }}
              >
                <thead
                  style={{
                    backgroundColor: "#49AE4B",
                    color: "white",
                    textAlign: "center"
                  }}
                >
                  <tr>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Week
                    </td>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Top Client
                    </td>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Ongoing Jobs
                    </td>
                    <td
                      rowSpan="2"
                      style={{ color: "red", verticalAlign: "middle" }}
                    >
                      Cancelled Jobs
                    </td>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Completed Jobs
                    </td>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Total Jobs
                    </td>
                    <td colSpan="8">Delivery</td>
                    <td colSpan="8">Offland</td>
                    <td colSpan="5">PSA</td>
                    <td colSpan="5">Jurong Port-LT</td>
                    <td colSpan="5">Shipyard</td>
                    <td colSpan="5">Others</td>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Billing ($)
                    </td>
                  </tr>
                  <tr>
                    <td>Number Of Pallets</td>
                    <td>Average number of pallets per delivery</td>
                    <td>Number Of Bundles</td>
                    <td>Average number of bundles per delivery</td>
                    <td>Number Of Cartons</td>
                    <td>Average number of cartons per delivery</td>
                    <td>Number Of Bluebins</td>
                    <td>Average number of bluebins per delivery</td>
                    <td>Number Of Pallets</td>
                    <td>Average number of pallets per delivery</td>
                    <td>Number Of Bundles</td>
                    <td>Average number of bundles per delivery</td>
                    <td>Number Of Cartons</td>
                    <td>Average number of cartons per delivery</td>
                    <td>Number Of Bluebins</td>
                    <td>Average number of bluebins per delivery</td>
                    <td>Number Of Trips</td>
                    <td>Number Of Pallets</td>
                    <td>Number Of Bundles</td>
                    <td>Number Of Cartons</td>
                    <td>Number Of Bluebins</td>
                    <td>Number Of Trips</td>
                    <td>Number Of Pallets</td>
                    <td>Number Of Bundles</td>
                    <td>Number Of Cartons</td>
                    <td>Number Of Bluebins</td>
                    <td>Number Of Trips</td>
                    <td>Number Of Pallets</td>
                    <td>Number Of Bundles</td>
                    <td>Number Of Cartons</td>
                    <td>Number Of Bluebins</td>
                    <td>Number Of Trips</td>
                    <td>Number Of Pallets</td>
                    <td>Number Of Bundles</td>
                    <td>Number Of Cartons</td>
                    <td>Number Of Bluebins</td>
                  </tr>
                </thead>
                <tbody>{jobMap}</tbody>
              </Table>
            </Col>
          </Row>
        );
    }
  }
}
export default WeeksTable;

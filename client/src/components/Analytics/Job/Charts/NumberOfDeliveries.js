import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Bar, Line } from "react-chartjs-2";
import { isNullOrUndefined } from "util";
class NumberOfDeliveries extends Component {
  render() {
    const { jobMonthAnalityc, jobDeliveryCategory } = this.props;
    switch (jobMonthAnalityc && jobDeliveryCategory) {
      case null:
        return <div></div>;
      default:
        let monthOfmap = [];
        const psajob = [];
        const jpjob = [];
        const shipyardjob = [];
        const Others = [];
        const psaItems = [];
        const jpItems = [];
        const shipyardItems = [];
        const OthersItems = [];
        const MonthMap = Object.keys(jobMonthAnalityc).map((key, index) => {
          let psaitems = 0;
          let jpitems = 0;
          let shipyarditems = 0;
          let othersitems = 0;
          const jobPSA = [];
          const jobjp = [];
          const jobshipyard = [];
          const jobOthers = [];
          const DeliveryLocations = Object.keys(jobDeliveryCategory).map(
            uniq => {
              const jobs = jobDeliveryCategory[uniq];
              if (uniq === "PSA") {
                for (let i = 0; i < jobs.length; i++) {
                  let job = jobs[i];
                  if (
                    key ===
                      `${new Date(job.jobBookingDateTime).getMonth() + 1}` &&
                    job.jobItems.length !== 0
                  ) {
                    for (let j = 0; j < job.jobItems.length; j++) {
                      psaitems += job.jobItems[j].quantity;
                    }
                    jobPSA.push(job);
                  }
                }
              } else if (uniq === "Jurong Port") {
                for (let i = 0; i < jobs.length; i++) {
                  let job = jobs[i];
                  if (
                    key ===
                      `${new Date(job.jobBookingDateTime).getMonth() + 1}` &&
                    job.jobItems.length !== 0
                  ) {
                    for (let j = 0; j < job.jobItems.length; j++) {
                      jpitems += job.jobItems[j].quantity;
                    }
                    jobjp.push(job);
                  }
                }
              } else if (uniq === "Shipyard") {
                for (let i = 0; i < jobs.length; i++) {
                  let job = jobs[i];
                  if (
                    key ===
                      `${new Date(job.jobBookingDateTime).getMonth() + 1}` &&
                    job.jobItems.length !== 0
                  ) {
                    for (let j = 0; j < job.jobItems.length; j++) {
                      shipyarditems += job.jobItems[j].quantity;
                    }
                    jobshipyard.push(job);
                  }
                }
              } else {
                for (let i = 0; i < jobs.length; i++) {
                  let job = jobs[i];
                  if (
                    key ===
                      `${new Date(job.jobBookingDateTime).getMonth() + 1}` &&
                    job.jobItems.length !== 0
                  ) {
                    for (let j = 0; j < job.jobItems.length; j++) {
                      othersitems += job.jobItems[j].quantity;
                    }
                    jobOthers.push(job);
                  }
                }
              }
            }
          );
          if (key === "1") {
            monthOfmap.push("Jan");
          } else if (key === "2") {
            monthOfmap.push("Feb");
          } else if (key === "3") {
            monthOfmap.push("Mar");
          } else if (key === "4") {
            monthOfmap.push("Apr");
          } else if (key === "5") {
            monthOfmap.push("May");
          } else if (key === "6") {
            monthOfmap.push("Jun");
          } else if (key === "7") {
            monthOfmap.push("Jul");
          } else if (key === "8") {
            monthOfmap.push("Aug");
          } else if (key === "9") {
            monthOfmap.push("Sep");
          } else if (key === "10") {
            monthOfmap.push("Oct");
          } else if (key === "11") {
            monthOfmap.push("Nov");
          } else if (key === "12") {
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
        const chartDataOfmonth = {
          labels: monthOfmap,
          datasets: [
            {
              label: "PSA Port",
              stack: "Stack 0",
              data: psajob,
              backgroundColor: "rgb(161, 217, 180)"
            },
            {
              label: "JP-LT",
              stack: "Stack 0",
              data: jpjob,
              backgroundColor: "rgb(28, 201, 86)"
            },
            {
              label: "Shipyard",
              stack: "Stack 0",
              data: shipyardjob,
              backgroundColor: "rgb(13, 140, 55)"
            },
            {
              label: "Others",
              stack: "Stack 0",
              data: Others,
              backgroundColor: "rgb(10, 92, 37)"
            }
          ]
        };
        const chartDataOfItems = {
          labels: monthOfmap,
          datasets: [
            {
              label: "PSA Port",
              stack: "Stack 0",
              data: psaItems,
              backgroundColor: "rgb(161, 217, 180)"
            },
            {
              label: "JP-LT",
              stack: "Stack 0",
              data: jpItems,
              backgroundColor: "rgb(28, 201, 86)"
            },
            {
              label: "Shipyard",
              stack: "Stack 0",
              data: shipyardItems,
              backgroundColor: "rgb(13, 140, 55)"
            },
            {
              label: "Others",
              stack: "Stack 0",
              data: OthersItems,
              backgroundColor: "rgb(10, 92, 37)"
            }
          ]
        };
        return (
          <Row style={{ marginBottom: "15px" }}>
            <Col cs="6" md={{ size: 6, offset: 0 }}>
              <Card>
                <CardBody>
                  <CardTitle style={{ textDecoration: "bold" }}>
                    No Of Deliveries
                  </CardTitle>
                  <CardText>
                    <Bar
                      data={chartDataOfmonth}
                      options={{
                        legend: {
                          display: true,
                          position: "bottom"
                        },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                callback: function(value, index, values) {
                                  return value + " Deliveries";
                                },
                                beginAtZero: true
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col cs="6" md={{ size: 6, offset: 0 }}>
              <Card>
                <CardBody>
                  <CardTitle>No Of Items</CardTitle>
                  <CardText>
                    <Bar
                      data={chartDataOfItems}
                      options={{
                        legend: {
                          display: true,
                          position: "bottom"
                        },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                callback: function(value, index, values) {
                                  return value + " Items";
                                },
                                beginAtZero: true
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        );
    }
  }
}
export default NumberOfDeliveries;

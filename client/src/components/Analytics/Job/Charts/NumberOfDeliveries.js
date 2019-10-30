import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Bar, Line } from "react-chartjs-2";
class NumberOfDeliveries extends Component {
  render() {
    const { jobMonthAnalityc } = this.props;
    switch (jobMonthAnalityc) {
      case null:
        return <div></div>;
      default:
        let monthOfmap = [];
        const MonthMap = Object.keys(jobMonthAnalityc).map((key, index) => {
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
        });
        const chartDataOfmonth = {
          labels: monthOfmap,
          datasets: [
            {
              label: "PSA Port",
              stack: "Stack 0",
              data: [2, 4, 6, 8, 12, 200, 2, 4, 6, 8, 12, 200],
              backgroundColor: "rgb(161, 217, 180)"
            },
            {
              label: "JP-LT",
              stack: "Stack 0",
              data: [99, 0, 66, 9, 24, 19, 99, 0, 66, 9, 24, 19],
              backgroundColor: "rgb(28, 201, 86)"
            },
            {
              label: "Shipyards",
              stack: "Stack 0",
              data: [9, 0, 3, 9, 11, 33, 9, 0, 3, 9, 11, 33],
              backgroundColor: "rgb(13, 140, 55)"
            },
            {
              label: "Others",
              stack: "Stack 0",
              data: [7, 7, 3, 9, 11, 22, 9, 0, 3, 9, 11, 33],
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
                                }
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
                  <CardTitle>No Of Deliveries</CardTitle>
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
                                }
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

import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class WeeksTable extends Component {
  render() {
    const {} = this.props;
    switch (this.props) {
      case null:
        return <div></div>;
      default:
        return (
          <Row>
            <Col>
              <Table
                bordered
                responsive
                size="sm"
                style={{ minWidth: "7000px", textAlign: "center" }}
              >
                <thead
                  style={{
                    backgroundColor: "#49AE4B",
                    color: "white"
                  }}
                >
                  <tr>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Week
                    </td>
                    <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Client
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
                <tbody>
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        );
    }
  }
}
export default WeeksTable;

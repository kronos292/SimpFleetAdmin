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
              <Table bordered responsive size="lg">
                <thead
                  style={{
                    backgroundColor: "#49AE4B",
                    color: "white"
                  }}
                >
                  <tr>
                    <td rowSpan="2" scope="row">
                      Week
                    </td>
                    <td rowSpan="2">Client</td>
                    <td rowSpan="2">Ongoing Jobs</td>
                    <td rowSpan="2" style={{ color: "red" }}>
                      Cancelled Jobs
                    </td>
                    <td rowSpan="2">Completed Jobs</td>
                    <td rowSpan="2">Total Jobs</td>
                    <td colSpan="8">
                      <center>Delivery</center>
                    </td>
                    <td colSpan="8">
                      <center>Offland</center>
                    </td>
                    <td colSpan="5">
                      <center>PSA</center>
                    </td>
                    <td colSpan="5">
                      <center>Jurong Port-LT</center>
                    </td>
                    <td colSpan="5">
                      <center>Shipyard</center>
                    </td>
                    <td colSpan="5">
                      <center>Others</center>
                    </td>
                    <td rowSpan="2">
                      <center>Billing ($)</center>
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

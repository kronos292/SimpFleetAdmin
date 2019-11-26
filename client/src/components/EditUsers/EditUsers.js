import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import MaterialTable, { MTableBodyRow } from "material-table";

class EditUsers extends Component {
  state = {
    columns: [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Birth Year", field: "birthYear", type: "numeric" },
      {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
      }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34
      }
    ]
  };
  componentDidMount() {}

  render() {
    return (
      <div className="job-summary-table-padding ml-3 mr-3">
        {/* title */}
        <h3 className="job-summary-header">Edit Users</h3>
        <MaterialTable
          columns={this.state.columns}
          data={this.state.data}
          components={{
            Container: props => <Paper {...props} elevation={0} />,
            Row: props => <MTableBodyRow {...props} className="rows" />
          }}
          options={{
            sorting: true,
            paging: false,
            padding: "dense",
            showTitle: false,
            headerStyle: {
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#707070"
            },
            actionsColumnIndex: 12
          }}
        />
      </div>
    );
  }
}
export default EditUsers;

import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import MaterialTable, { MTableBodyRow } from "material-table";
import Axios from "axios";

class EditUsers extends Component {
  state = {
    columns: [
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Email", field: "email" },
      { title: "Contact Number", field: "contactNumber" },
      { title: "Company Name", field: "userCompany.name", editable: "never" },
      { title: "User Type", field: "userType", editable: "never" }
    ],
    logisticsColumns: [
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Email", field: "email" },
      { title: "Contact Number", field: "contactNumber" },
      { title: "Company Name", field: "company.name", editable: "never" },
      { title: "User Type", field: "userType", editable: "never" }
    ],
    data: [],
    logisticsData: []
  };

  componentDidMount() {
    /* get user */
    Axios.get("api/users").then(res =>
      this.setState({
        data: res.data
      })
    );
    /* get logistic user */
    Axios.get("api/logistics_users").then(res =>
      this.setState({
        logisticsData: res.data
      })
    );
  }

  render() {
    return (
      <div className="ml-3 mr-3">
        {/* title */}
        <h3 className="job-summary-header">Edit Users</h3>
        {/* user */}
        <MaterialTable
          title="User"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                    /* update db */
                    Axios.put("/api/users/update", { newData });
                  }
                }, 600);
              })
          }}
          components={{
            Container: props => <Paper {...props} elevation={0} />,
            Row: props => <MTableBodyRow {...props} className="rows" />
          }}
          options={{
            sorting: true,
            padding: "dense",
            headerStyle: {
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#707070"
            },
            actionsColumnIndex: 12
          }}
        />
        {/* logistics user */}
        <MaterialTable
          title="Logistics User"
          columns={this.state.logisticsColumns}
          data={this.state.logisticsData}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState(prevState => {
                      const logisticsData = [...prevState.logisticsData];
                      logisticsData[logisticsData.indexOf(oldData)] = newData;
                      return { ...prevState, logisticsData };
                    });
                    /* update db */
                    Axios.put("/api/logistics_users/update", { newData });
                  }
                }, 600);
              })
          }}
          components={{
            Container: props => <Paper {...props} elevation={0} />,
            Row: props => <MTableBodyRow {...props} className="rows" />
          }}
          options={{
            sorting: true,
            padding: "dense",
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

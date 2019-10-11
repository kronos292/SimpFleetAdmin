import React, { Component } from "react";
import axios from "axios";
import BreakdownByMonth from "./BreakdownBy/BreakdownByMonth";
import BreakdownByDeliveryLocations from "./BreakdownBy/BreakdownByDeliveryLocations";
import BreakdownByVessels from "./BreakdownBy/BreakdownByVessels";
import BreakdownByCompanies from "./BreakdownBy/BreakdownByCompanies";
class JobAnalytics extends Component {
  state = {
    jobMonthCategories: null
  };

  componentDidMount() {
    // Get all jobs
    axios
      .get(
        `/api/jobs?user_only=false&numLimit=false&archive_only=false&non_archive_only=false`
      )
      .then(res => {
        let jobs = res.data;
        let jobMonthCategories = {};
        for (let i = 0; i < jobs.length; i++) {
          const job = jobs[i];
          const monthOfJob = `${new Date(job.jobBookingDateTime).getMonth() +
            1}/${new Date(job.jobBookingDateTime).getFullYear()}`;
          let jobList = jobMonthCategories[monthOfJob];
          if (!jobList) {
            jobList = [];
            jobMonthCategories[monthOfJob] = jobList;
          }
          jobList.push(job);
        }
        this.setState({
          jobMonthCategories
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <BreakdownByMonth jobMonthCategory={this.state.jobMonthCategories} />
        <BreakdownByDeliveryLocations
          jobMonthCategory={this.state.jobMonthCategories}
        />
        <BreakdownByVessels jobMonthCategory={this.state.jobMonthCategories} />
        <BreakdownByCompanies
          jobMonthCategory={this.state.jobMonthCategories}
        />
      </div>
    );
  }
}

export default JobAnalytics;

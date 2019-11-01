import React, { Component } from "react";
import axios from "axios";
import BreakdownByMonth from "./BreakdownBy/BreakdownByMonth";
import BreakdownByDeliveryLocations from "./BreakdownBy/BreakdownByDeliveryLocations";
import BreakdownByVessels from "./BreakdownBy/BreakdownByVessels";
import BreakdownByCompanies from "./BreakdownBy/BreakdownByCompanies";
import Charts from "./Charts/Charts";
class JobAnalytics extends Component {
  state = {
    userCompany: null,
    vessel: null,
    jobMonthCategories: null,
    jobDeliveryCategories: null,
    jobCompaniesCategories: null,
    AnalysData: null,
    jobVesselsCategories: null
  };

  componentDidMount() {
    /* get user company */
    axios.get("/api/company/usercompany").then(res => {
      let Company = res.data;
      let CompanyCategories = {};
      for (let i = 0; i < Company.length; i++) {
        const cmp = Company[i];
        const Companies = cmp.name;
        let ListCompany = CompanyCategories[Companies];
        if (!ListCompany) {
          ListCompany = [];
          CompanyCategories[Companies] = ListCompany;
        }
      }
      this.setState({
        userCompany: CompanyCategories
      });
    });
    /* get vessel */
    axios.get("/api/vessels").then(res => {
      this.setState({ vessel: res.data });
    });
    // Get all jobs
    axios
      .get(
        `/api/jobs?user_only=false&numLimit=false&archive_only=false&non_archive_only=false&page=false&limit=false`
      )
      .then(res => {
        let jobs = res.data;
        let jobMonthCategories = {};
        let jobDeliveryCategories = {};
        let jobCompaniesCategories = {};
        let jobVesselsCategories = {};
        let jobAnalys = {};
        for (let i = 0; i < jobs.length; i++) {
          const job = jobs[i];
          const monthOfJob = `${new Date(job.jobBookingDateTime).getMonth() +
            1}/${new Date(job.jobBookingDateTime).getFullYear()}`;

          let jobListMonth = jobMonthCategories[monthOfJob];
          if (!jobListMonth) {
            jobListMonth = [];
            jobMonthCategories[monthOfJob] = jobListMonth;
          }
          let jobListLocation =
            jobDeliveryCategories[job.vesselLoadingLocation];
          if (!jobListLocation) {
            jobListLocation = [];
            jobDeliveryCategories[job.vesselLoadingLocation] = jobListLocation;
          }
          if (
            job.user.userCompany !== null &&
            job.user.userCompany.name !== null
          ) {
            let jobListCompanies =
              jobCompaniesCategories[job.user.userCompany.name];
            if (!jobListCompanies) {
              jobListCompanies = [];
              jobCompaniesCategories[
                job.user.userCompany.name
              ] = jobListCompanies;
            }
            jobListCompanies.push(job);
          }

          if (job.vessel !== null && job.vessel.vesselName !== null) {
            let jobListVessels = jobVesselsCategories[job.vessel._id];
            if (!jobListVessels) {
              jobListVessels = [];
              jobVesselsCategories[job.vessel._id] = jobListVessels;
            }
            jobListVessels.push(job);
          }

          jobListMonth.push(job);
          jobListLocation.push(job);
        }

        jobs.sort((a, b) => {
          return (
            new Date(a.jobBookingDateTime.toString()) -
            new Date(b.jobBookingDateTime.toString())
          );
        });

        for (let i = 0; i < jobs.length; i++) {
          const job = jobs[i];
          const month = `${new Date(job.jobBookingDateTime).getMonth() +
            1}/${new Date(job.jobBookingDateTime).getFullYear()}`;
          let jobListMonth = jobAnalys[month];
          if (!jobListMonth) {
            jobListMonth = [];
            jobAnalys[month] = jobListMonth;
          }
          jobListMonth.push(job);
        }
        this.setState({
          jobMonthCategories: jobMonthCategories,
          jobDeliveryCategories: jobDeliveryCategories,
          jobCompaniesCategories: jobCompaniesCategories,
          AnalysData: jobAnalys,
          jobVesselsCategories: jobVesselsCategories
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Charts
          jobMonthAnalys={this.state.AnalysData}
          jobDeliveryCategory={this.state.jobDeliveryCategories}
        />
        <BreakdownByMonth jobMonthCategory={this.state.jobMonthCategories} />
        <BreakdownByDeliveryLocations
          jobDeliveryCategory={this.state.jobDeliveryCategories}
        />
        <BreakdownByVessels
          jobVesselsCategory={this.state.jobVesselsCategories}
          Vessel={this.state.vessel}
        />
        <BreakdownByCompanies
          jobCompaniesCategory={this.state.jobCompaniesCategories}
          Company={this.state.userCompany}
        />
      </div>
    );
  }
}

export default JobAnalytics;

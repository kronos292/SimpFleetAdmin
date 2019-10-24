import React, { Component } from "react";
import axios from "axios";
import BreakdownByMonth from "./BreakdownBy/BreakdownByMonth";
import BreakdownByDeliveryLocations from "./BreakdownBy/BreakdownByDeliveryLocations";
import BreakdownByVessels from "./BreakdownBy/BreakdownByVessels";
import BreakdownByCompanies from "./BreakdownBy/BreakdownByCompanies";
class JobAnalytics extends Component {
  state = {
    userCompany: null,
    jobMonthCategories: null,
    jobDeliveryCategories: null,
    jobCompaniesCategories: null,
    jobVesselCategories: null
  };

  componentDidMount() {
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
    // Get all jobs
    axios
      .get(
        `/api/jobs?user_only=false&numLimit=false&archive_only=false&non_archive_only=false`
      )
      .then(res => {
        let jobs = res.data;
        let jobMonthCategories = {};
        let jobDeliveryCategories = {};
        let jobCompaniesCategories = {};
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

          jobListMonth.push(job);
          jobListLocation.push(job);
        }
        this.setState({
          jobMonthCategories: jobMonthCategories,
          jobDeliveryCategories: jobDeliveryCategories,
          jobCompaniesCategories: jobCompaniesCategories
        });
      })
      .catch(err => {
        console.log(err);
      });

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
  }

  render() {
    return (
      <div>
        <BreakdownByMonth jobMonthCategory={this.state.jobMonthCategories} />
        <BreakdownByDeliveryLocations
          jobDeliveryCategory={this.state.jobDeliveryCategories}
        />
        <BreakdownByVessels
          jobVesselCategory={this.state.jobVesselCategories}
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

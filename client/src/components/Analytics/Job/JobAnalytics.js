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
    jobCompaniesCategories: null
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
        let jobDeliveryCategories = {};
        let jobCompaniesCategories = {};
        for (let i = 0; i < jobs.length; i++) {
          const job = jobs[i];
          const monthOfJob = `${new Date(job.jobBookingDateTime).getMonth() +
            1}/${new Date(job.jobBookingDateTime).getFullYear()}`;
          const LocationsOfJob = job.vesselLoadingLocation;
          const CompaniesOfJob = job.user.userCompany.name;

          let jobListMonth = jobMonthCategories[monthOfJob];
          if (!jobListMonth) {
            jobListMonth = [];
            jobMonthCategories[monthOfJob] = jobListMonth;
          }
          let jobListLocation = jobDeliveryCategories[LocationsOfJob];
          if (!jobListLocation) {
            jobListLocation = [];
            jobDeliveryCategories[LocationsOfJob] = jobListLocation;
          }
          let jobListCompanies = jobCompaniesCategories[CompaniesOfJob];
          if (!jobListCompanies) {
            jobListCompanies = [];
            jobCompaniesCategories[CompaniesOfJob] = jobListCompanies;
          }
          jobListMonth.push(job);
          jobListLocation.push(job);
          jobListCompanies.push(job);
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
        <BreakdownByVessels jobMonthCategory={this.state.jobMonthCategories} />
        <BreakdownByCompanies
          jobCompaniesCategory={this.state.jobCompaniesCategories}
          Company={this.state.userCompany}
        />
      </div>
    );
  }
}

export default JobAnalytics;

import React, { Component } from "react";
import axios from "axios";
import BreakdownByMonth from "./BreakdownBy/BreakdownByMonth";
import BreakdownByDeliveryLocations from "./BreakdownBy/BreakdownByDeliveryLocations";
import BreakdownByVessels from "./BreakdownBy/BreakdownByVessels";
import BreakdownByCompanies from "./BreakdownBy/BreakdownByCompanies";
import Charts from "./Charts/Charts";
import WeeksTable from "./Tables/WeeksTable";
class JobAnalytics extends Component {
  state = {
    userCompany: null,
    vessel: null,
    jobMonthCategories: null,
    jobDeliveryCategories: null,
    jobCompaniesCategories: null,
    AnalysData: null,
    jobVesselsCategories: null,
    jobWeeks: null
  };

  componentDidMount() {
    /* get user company */
    axios.get("/api/company/usercompany").then(res => {
      let Company = res.data;
      let CompanyCategories = {};
      for (let i = 0; i < Company.length; i++) {
        const cmp = Company[i];
        const Companies = cmp._id;
        let ListCompany = CompanyCategories[Companies];
        if (!ListCompany) {
          ListCompany = [];
          CompanyCategories[Companies] = ListCompany;
        }
        ListCompany.push(cmp);
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
        let jobweekdata = {};
        for (let i = 0; i < jobs.length; i++) {
          const job = jobs[i];
          const monthOfJob = `${new Date(job.jobBookingDateTime).getMonth() +
            1}/${new Date(job.jobBookingDateTime).getFullYear()}`;
          let weekDate = "";
          if (new Date(job.jobBookingDateTime).getFullYear() % 4 === 0) {
            if (new Date(job.jobBookingDateTime).getDay() !== 1) {
              let firstdateOfweek = 0;
              if (new Date(job.jobBookingDateTime).getDay() === 0) {
                firstdateOfweek =
                  parseInt(new Date(job.jobBookingDateTime).getDate()) + 1;
              } else {
                firstdateOfweek =
                  parseInt(new Date(job.jobBookingDateTime).getDate()) -
                  parseInt(new Date(job.jobBookingDateTime).getDay() - 1);
              }
              let lastdateOfweek = firstdateOfweek + 6;
              let monthOfweek = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let monthOflast = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let yearOfweek = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );
              let lastyearOfweek = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );

              if (firstdateOfweek < 1) {
                if (monthOfweek === 1) {
                  firstdateOfweek += 31;
                  monthOfweek = 12;
                  yearOfweek -= 1;
                } else if (monthOfweek === 2) {
                  firstdateOfweek += 31;
                  monthOfweek = 1;
                } else if (monthOfweek === 3) {
                  firstdateOfweek += 29;
                  monthOfweek = 2;
                } else if (monthOfweek === 4) {
                  firstdateOfweek += 31;
                  monthOfweek = 3;
                } else if (monthOfweek === 5) {
                  firstdateOfweek += 30;
                  monthOfweek = 4;
                } else if (monthOfweek === 6) {
                  firstdateOfweek += 31;
                  monthOfweek = 5;
                } else if (monthOfweek === 7) {
                  firstdateOfweek += 30;
                  monthOfweek = 6;
                } else if (monthOfweek === 8) {
                  firstdateOfweek += 31;
                  monthOfweek = 7;
                } else if (monthOfweek === 9) {
                  firstdateOfweek += 31;
                  monthOfweek = 8;
                } else if (monthOfweek === 10) {
                  firstdateOfweek += 30;
                  monthOfweek = 9;
                } else if (monthOfweek === 11) {
                  firstdateOfweek += 31;
                  monthOfweek = 10;
                } else if (monthOfweek === 12) {
                  firstdateOfweek += 30;
                  monthOfweek = 11;
                }
              }
              if (monthOfweek === 2 && lastdateOfweek > 28) {
                lastdateOfweek -= 29;
                monthOflast = 3;
              } else if (lastdateOfweek > 31) {
                if (monthOfweek === 1) {
                  lastdateOfweek -= 31;
                  monthOflast = 2;
                } else if (monthOfweek === 3) {
                  lastdateOfweek -= 31;
                  monthOflast = 4;
                } else if (monthOfweek === 4) {
                  lastdateOfweek -= 30;
                  monthOflast = 5;
                } else if (monthOfweek === 5) {
                  lastdateOfweek -= 31;
                  monthOflast = 6;
                } else if (monthOfweek === 6) {
                  lastdateOfweek -= 30;
                  monthOflast = 7;
                } else if (monthOfweek === 7) {
                  lastdateOfweek -= 31;
                  monthOflast = 8;
                } else if (monthOfweek === 8) {
                  lastdateOfweek -= 31;
                  monthOflast = 9;
                } else if (monthOfweek === 9) {
                  lastdateOfweek -= 30;
                  monthOflast = 10;
                } else if (monthOfweek === 10) {
                  lastdateOfweek -= 31;
                  monthOflast = 11;
                } else if (monthOfweek === 11) {
                  lastdateOfweek -= 30;
                  monthOflast = 12;
                } else if (monthOfweek === 12) {
                  lastdateOfweek -= 31;
                  monthOflast = 1;
                  lastyearOfweek += 1;
                }
              }
              weekDate = `${firstdateOfweek}/${monthOfweek}/${yearOfweek} - ${lastdateOfweek}/${monthOflast}/${lastyearOfweek}`;
            } else {
              let datest = parseInt(new Date(job.jobBookingDateTime).getDate());
              let datels = datest + 6;
              let monthst = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let monthls = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let yearst = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );
              let yearls = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );

              if (monthst === 2 && datels > 28) {
                datels -= 29;
                monthls = 3;
              } else if (datels > 31) {
                if (monthst === 1) {
                  datels -= 31;
                  monthls = 2;
                } else if (monthst === 3) {
                  datels -= 31;
                  monthls = 4;
                } else if (monthst === 4) {
                  datels -= 30;
                  monthls = 5;
                } else if (monthst === 5) {
                  datels -= 31;
                  monthls = 6;
                } else if (monthst === 6) {
                  datels -= 30;
                  monthls = 7;
                } else if (monthst === 7) {
                  datels -= 31;
                  monthls = 8;
                } else if (monthst === 8) {
                  datels -= 31;
                  monthls = 9;
                } else if (monthst === 9) {
                  datels -= 30;
                  monthls = 10;
                } else if (monthst === 10) {
                  datels -= 31;
                  monthls = 11;
                } else if (monthst === 11) {
                  datels -= 30;
                  monthls = 12;
                } else if (monthst === 12) {
                  datels -= 31;
                  monthls = 1;
                  yearls += 1;
                }
              }
              weekDate = `${datest}/${monthst}/${yearst} - ${datels}/${monthls}/${yearls}`;
            }
          } else {
            if (new Date(job.jobBookingDateTime).getDay() !== 1) {
              let firstdateOfweek = 0;
              if (new Date(job.jobBookingDateTime).getDay() === 0) {
                firstdateOfweek =
                  parseInt(new Date(job.jobBookingDateTime).getDate()) + 1;
              } else {
                firstdateOfweek =
                  parseInt(new Date(job.jobBookingDateTime).getDate()) -
                  parseInt(new Date(job.jobBookingDateTime).getDay() - 1);
              }
              let lastdateOfweek = firstdateOfweek + 6;
              let monthOfweek = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let monthOflast = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let yearOfweek = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );
              let lastyearOfweek = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );

              if (firstdateOfweek < 1) {
                if (monthOfweek === 1) {
                  firstdateOfweek += 31;
                  monthOfweek = 12;
                  yearOfweek -= 1;
                } else if (monthOfweek === 2) {
                  firstdateOfweek += 31;
                  monthOfweek = 1;
                } else if (monthOfweek === 3) {
                  firstdateOfweek += 28;
                  monthOfweek = 2;
                } else if (monthOfweek === 4) {
                  firstdateOfweek += 31;
                  monthOfweek = 3;
                } else if (monthOfweek === 5) {
                  firstdateOfweek += 30;
                  monthOfweek = 4;
                } else if (monthOfweek === 6) {
                  firstdateOfweek += 31;
                  monthOfweek = 5;
                } else if (monthOfweek === 7) {
                  firstdateOfweek += 30;
                  monthOfweek = 6;
                } else if (monthOfweek === 8) {
                  firstdateOfweek += 31;
                  monthOfweek = 7;
                } else if (monthOfweek === 9) {
                  firstdateOfweek += 31;
                  monthOfweek = 8;
                } else if (monthOfweek === 10) {
                  firstdateOfweek += 30;
                  monthOfweek = 9;
                } else if (monthOfweek === 11) {
                  firstdateOfweek += 31;
                  monthOfweek = 10;
                } else if (monthOfweek === 12) {
                  firstdateOfweek += 30;
                  monthOfweek = 11;
                }
              }
              if (monthOfweek === 2 && lastdateOfweek > 28) {
                lastdateOfweek -= 28;
                monthOflast = 3;
              } else if (lastdateOfweek > 31) {
                if (monthOfweek === 1) {
                  lastdateOfweek -= 31;
                  monthOflast = 2;
                } else if (monthOfweek === 3) {
                  lastdateOfweek -= 31;
                  monthOflast = 4;
                } else if (monthOfweek === 4) {
                  lastdateOfweek -= 30;
                  monthOflast = 5;
                } else if (monthOfweek === 5) {
                  lastdateOfweek -= 31;
                  monthOflast = 6;
                } else if (monthOfweek === 6) {
                  lastdateOfweek -= 30;
                  monthOflast = 7;
                } else if (monthOfweek === 7) {
                  lastdateOfweek -= 31;
                  monthOflast = 8;
                } else if (monthOfweek === 8) {
                  lastdateOfweek -= 31;
                  monthOflast = 9;
                } else if (monthOfweek === 9) {
                  lastdateOfweek -= 30;
                  monthOflast = 10;
                } else if (monthOfweek === 10) {
                  lastdateOfweek -= 31;
                  monthOflast = 11;
                } else if (monthOfweek === 11) {
                  lastdateOfweek -= 30;
                  monthOflast = 12;
                } else if (monthOfweek === 12) {
                  lastdateOfweek -= 31;
                  monthOflast = 1;
                  lastyearOfweek += 1;
                }
              }
              weekDate = `${firstdateOfweek}/${monthOfweek}/${yearOfweek} - ${lastdateOfweek}/${monthOflast}/${lastyearOfweek}`;
            } else {
              let datest = parseInt(new Date(job.jobBookingDateTime).getDate());
              let datels = datest + 6;
              let monthst = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let monthls = parseInt(
                new Date(job.jobBookingDateTime).getMonth() + 1
              );
              let yearst = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );
              let yearls = parseInt(
                new Date(job.jobBookingDateTime).getFullYear()
              );

              if (monthst === 2 && datels > 28) {
                datels -= 29;
                monthls = 3;
              } else if (datels > 31) {
                if (monthst === 1) {
                  datels -= 31;
                  monthls = 2;
                } else if (monthst === 3) {
                  datels -= 31;
                  monthls = 4;
                } else if (monthst === 4) {
                  datels -= 30;
                  monthls = 5;
                } else if (monthst === 5) {
                  datels -= 31;
                  monthls = 6;
                } else if (monthst === 6) {
                  datels -= 30;
                  monthls = 7;
                } else if (monthst === 7) {
                  datels -= 31;
                  monthls = 8;
                } else if (monthst === 8) {
                  datels -= 31;
                  monthls = 9;
                } else if (monthst === 9) {
                  datels -= 30;
                  monthls = 10;
                } else if (monthst === 10) {
                  datels -= 31;
                  monthls = 11;
                } else if (monthst === 11) {
                  datels -= 30;
                  monthls = 12;
                } else if (monthst === 12) {
                  datels -= 31;
                  monthls = 1;
                  yearls += 1;
                }
              }
              weekDate = `${datest}/${monthst}/${yearst} - ${datels}/${monthls}/${yearls}`;
            }
          }
          let jobListweek = jobweekdata[weekDate];
          if (!jobListweek) {
            jobListweek = [];
            jobweekdata[weekDate] = jobListweek;
          }
          let jobListMonth = jobMonthCategories[monthOfJob];
          if (!jobListMonth) {
            jobListMonth = [];
            jobMonthCategories[monthOfJob] = jobListMonth;
          }
          if (job.vesselLoadingLocation !== undefined) {
            if (job.vesselLoadingLocation !== null) {
              if (job.vesselLoadingLocation.name !== undefined) {
                if (job.vesselLoadingLocation.name !== null) {
                  let jobListLocation =
                    jobDeliveryCategories[job.vesselLoadingLocation.name];
                  if (!jobListLocation) {
                    jobListLocation = [];
                    jobDeliveryCategories[
                      job.vesselLoadingLocation.name
                    ] = jobListLocation;
                  }
                  jobListLocation.push(job);
                }
              }
            }
          }
          if (job.user.userCompany !== null) {
            let jobListCompanies = jobCompaniesCategories[job.user.userCompany];
            if (!jobListCompanies) {
              jobListCompanies = [];
              jobCompaniesCategories[job.user.userCompany] = jobListCompanies;
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
          jobListweek.push(job);
          jobListMonth.push(job);
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
          jobVesselsCategories: jobVesselsCategories,
          jobWeeks: jobweekdata
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
        <WeeksTable
          WeeksData={this.state.jobWeeks}
          Company={this.state.userCompany}
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

import React, {Component} from 'react';
import axios from "axios";
import {Row, Table, Col} from "reactstrap";

class JobAnalytics extends Component {
    state = {
        jobMonthCategories: null
    };

    componentDidMount() {
        // Get all jobs
        axios.get(`/api/jobs?user_only=false&numLimit=false&archive_only=false&non_archive_only=false`).then(res => {
            let jobs = res.data;
            let jobMonthCategories = {};
            for(let i = 0; i < jobs.length; i++) {
                const job = jobs[i];
                const monthOfJob = `${new Date(job.jobBookingDateTime).getMonth() + 1}/${new Date(job.jobBookingDateTime).getFullYear()}`;
                let jobList = jobMonthCategories[monthOfJob];
                if(!jobList) {
                    jobList = [];
                    jobMonthCategories[monthOfJob] = jobList;
                }
                jobList.push(job);
            }
            this.setState({
                jobMonthCategories
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        switch(this.state.jobMonthCategories) {
            case null:
                return(
                    <div></div>
                );
            default:
                const jobMonthCategories = Object.keys(this.state.jobMonthCategories).map((key, index) => {
                    const jobs = this.state.jobMonthCategories[key];
                    let itemCount = 0;
                    let offlandItemCount = 0;
                    let itemTimes = 0;
                    let offlandItemTimes = 0;
                    const cancelledJobs = [];
                    const openJobs = [];
                    const completedJobs = [];
                    for(let i = 0; i < jobs.length; i++) {
                        const job = jobs[i];

                        if(job.isCancelled === 'Confirmed') {
                            cancelledJobs.push(job);
                        } else {
                            if(job.jobTrackers.length === 6) {
                                completedJobs.push(job);
                            } else {
                                openJobs.push(job);
                            }

                            const {jobItems, jobOfflandItems} = job;
                            if(jobItems && jobItems.length > 0) {
                                itemTimes++;
                                for(let j = 0; j < jobItems.length; j++) {
                                    const jobItem = jobItems[j];
                                    itemCount += jobItem.quantity;
                                }
                            }
                            if(jobOfflandItems && jobOfflandItems.length > 0) {
                                offlandItemTimes++;
                                for(let j = 0; j < jobOfflandItems.length; j++) {
                                    const jobOfflandItem = jobOfflandItems[j];
                                    offlandItemCount += jobOfflandItem.quantity;
                                }
                            }
                        }
                    }

                    return(
                        <tr key={index}>
                            <td>{key}</td>
                            <td>
                                {
                                    jobs.length
                                }
                            </td>
                            <td style={{'color': 'red'}}>{cancelledJobs.length}</td>
                            <td>{openJobs.length}</td>
                            <td>{completedJobs.length}</td>
                            <td>{itemCount}</td>
                            <td>{itemCount === 0? '0': (itemCount/itemTimes).toFixed(2)}</td>
                            <td>{offlandItemCount}</td>
                            <td>{offlandItemCount === 0? '0': (offlandItemCount/offlandItemTimes).toFixed(2)}</td>
                        </tr>
                    );
                });

                return(
                    <Row>
                        <Col cs="12" md={{size: 12, offset: 0}} className="text-center">
                            <h1>Job breakdown by month</h1>
                        </Col>
                        <Col cs="12" md={{size: 12, offset: 0}}>
                            <Table striped hover bordered responsive>
                                <tr>
                                    <th>Month</th>
                                    <th>Total jobs</th>
                                    <th style={{'color': 'red'}}>Cancelled jobs</th>
                                    <th>Ongoing jobs</th>
                                    <th>Completed jobs</th>
                                    <th>No. of Pallets (Delivery)</th>
                                    <th>Avg No. of Pallets per Delivery</th>
                                    <th>No. of Pallets (Offland)</th>
                                    <th>Avg No. of Pallets per Offland</th>
                                </tr>
                                {
                                    jobMonthCategories
                                }
                            </Table>
                        </Col>
                    </Row>
                );
        }
    }
}

export default JobAnalytics;
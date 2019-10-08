import React, {Component} from 'react';
import {Container} from "reactstrap";

import JobAnalytics from "./Job/JobAnalytics";

class Analytics extends Component {
    render() {
        return(
            <Container fluid>
                <br/>
                <JobAnalytics/>
            </Container>
        );
    }
}

export default Analytics;
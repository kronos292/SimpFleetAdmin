import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";

import MobileView from "./MobileView";
import UserGuideStepper from "./UserGuideStepper";
import UserGuideStepperLeft from './UserGuideStepperLeft';
import UserGuideStepperRight from './UserGuideStepperRight';
import TruckView from './TruckView';

import HorizontalUserGuideStepper from './HorizontalUserGuideStepper'
import HorizontalUserGuideStepperContent from './HorizontalUserGuideStepperContent'

import MediaQuery from 'react-responsive';

import './UserGuideSection.css';


class UserGuideSection extends Component {
    state = {
        step: 0
    };

    render() {
        return (
            <div className='guide-padding'>
                <h1 className='section-title'>How it Works?</h1>
                <MediaQuery query="(min-width: 769px)">
                    <Container>
                        <Row>
                            <Col xs="12" md={{ size: 5 }}>
                                <MobileView step={this.state.step} />
                            </Col>
                            <Col xs="12" md={{ size: 2 }}>
                                <UserGuideStepperLeft step={this.state.step} />
                            </Col>
                            <Col xs="12" md={{ size: 1 }} >
                                <div className='d-flex justify-content-center'>
                                    <UserGuideStepper step={this.state.step} setStep={(step) => this.setState({ step })} />
                                </div>
                            </Col>
                            <Col xs="12" md={{ size: 2 }}>
                                <UserGuideStepperRight step={this.state.step} />
                            </Col>
                            <Col xs="12" md={{ size: 2 }}>
                                <TruckView step={this.state.step} />
                            </Col>
                        </Row>
                    </Container>
                </MediaQuery>
                <MediaQuery query="(max-width: 768px)">
                    <Container>
                        <Row>
                            <Col>
                                <HorizontalUserGuideStepper  step={this.state.step} setStep={(step) => this.setState({ step })} />
                            </Col>
                        </Row>
                        <Row className='mobile-margin'>
                            <Col>
                                <HorizontalUserGuideStepperContent  step={this.state.step}/>
                            </Col>
                        </Row>
                        <Row className='mobile-margin'>
                            <Col xs={{size:10, offset:1}}>
                                <MobileView step={this.state.step} />
                            </Col>
                        </Row>
                    </Container>
                </MediaQuery>
            </div>
        );
    }
}

export default UserGuideSection;
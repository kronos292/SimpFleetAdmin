import React, { Component } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';


import './UserGuideStepperRight.css';


function getSteps() {
    return ['', '', '', 'Drop and Go', 'Delivery'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return;
        case 1:
            return;
        case 2:
            return;
        case 3:
            return "Deliver your items to our Logistic Hub.";
        case 4:
            return 'SimpFleet will deliver the items from our logistics Hub directly to the vessel' ;
        default:
            return 'Unknown step';
    }
}


class UserGuideStepperRight extends Component {

    render() {
        const steps = getSteps();
        const activeStep = this.props.step;

        return (
            <div>
                <Stepper activeStep={activeStep} orientation="vertical" connector={false}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label} nonLinear> 
                                <StepContent className='no-border stepper-right-padding'>
                                    <h2 className='title-stepper'>{label}</h2>
                                    <p className='content-stepper'>{getStepContent(index)}</p>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

export default UserGuideStepperRight;
import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import './UserGuideStepper.css';

function getSteps() {
    return ['', '', '', 'Send your items to our Logistic Hub.', 'Delivery of items '];
}

class UserGuideStepper extends Component {
    handleStep = (step) => {
        this.props.setStep(step);

    };

    render() {
        const steps = getSteps();
        const activeStep = this.props.step;

        return (
            <div>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label} nonLinear>
                                <StepButton onClick={() => {
                                    this.handleStep(index)
                                }} disabled={false} disableRipple={true} className='stepperButton'>
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

export default UserGuideStepper;
import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import './HorizontalUserGuideStepper.css';

function getSteps() {
    return ['1', '2', '3', '4', '5'];
}

class HorizontalUserGuideStepper extends Component {
    handleStep = (step) => {
        this.props.setStep(step);

    };

    render() {
        const steps = getSteps();
        const activeStep = this.props.step;

        return (
            <div>
                <Stepper activeStep={activeStep}>
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

export default HorizontalUserGuideStepper;
import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';

import './UserGuideStepperLeft.css';

function getSteps() {
    return ['Sign Up', 'Verification', 'Login', 'Create a Job', 'Track Your Jobs'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Sign up on our platform to get started on our service. Once done, our customer service will get in touch with you.`;
        case 1:
            return `After your account has been verified, you will receive a confirmation email from us.`
        case 2:
            return `Login to view your dashboard and get started.`;
        case 3:
            return 'Fill up the booking form with your vessel and item details, we will handle the delivery for you.';
        case 4:
            return `You can keep track of your jobs that you have booked with us in real-time.`;
        default:
            return 'Unknown step';
    }
}


class UserGuideStepperLeft extends Component {
    handleStep = (step) => {
        this.props.setStep(step);

    };

    render() {
        const steps = getSteps();
        const activeStep = this.props.step;

        return (
            <div>
                <Stepper activeStep={activeStep} orientation="vertical" connector={false}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label} nonLinear> 
                                <StepContent className='no-border end'>
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

export default UserGuideStepperLeft;
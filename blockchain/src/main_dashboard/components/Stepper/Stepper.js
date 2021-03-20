import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function CustomStepper(props) {
    const classes = useStyles();
    const content = props.getStepContent(props.activeStep)
    return (
        <div className={classes.root}>
            <Stepper activeStep={props.activeStep} alternativeLabel>
                {props.getSteps().map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Typography className={classes.instructions}>{content}</Typography>
            </div>
        </div>
    );
}

import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../header/Header';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function PackageDetails() {
  const classes = useStyles();

  return (
    <Router>
        <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", justify: "center", maxHeight: '500px', }}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">Package Details</Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="input-raw-material" label="Raw Material/ Medicine" name="input-raw-material"/>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="transporter-no" label="Transporter Number/Type" name="transporter-no"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="contract-address" label="Contract Address" name="contract-address"/>
                </Grid>
                        
                </Grid>
                <Button
                type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                Submit
                </Button>
            
            </form>
            </div>
        </Container>
        </Grid>
    </Router>
  );
}
export default withRouter(PackageDetails);
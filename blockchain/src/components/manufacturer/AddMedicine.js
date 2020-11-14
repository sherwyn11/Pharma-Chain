import React, { Component } from 'react'
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

function AddMedicine() {
  const classes = useStyles();

  return (
    <Router>
        <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", justify: "center", maxHeight: '660px',maxWidth: 400 }}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">Enter Medicine Details</Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="medicine-description" label="Medicine Desription" name="medicine-description"/>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="quantity" label="Product Quantity" name="quantity"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="raw-material-location" label="Location of Raw Material" name="raw-material-location"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="manufacturer-location" label="Manufacturer Location" name="manufacturer-location"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="transporter-address" label="Transporter Location" name="transporter-address"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="wholesaler-address" label="Wholesaler Location" name="wholesaler-location"/>
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
export default withRouter(AddMedicine);
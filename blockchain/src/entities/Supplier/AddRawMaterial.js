import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

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

function AddRawMaterial(props) {
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [address, setAddress] = useState("");
  const [supplyChain] = useState(props.supplyChain);
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");
  const [locationx, setLocationX] = useState("");
  const [locationy, setLocationY] = useState("");
  const [role, setRole] = useState("");

  const classes = useStyles();

  return (
    <Router>
      <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            
            <Typography component="h1" variant="h5"> Add Raw Material</Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth  id="description" label="Material Description" name="description"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth  id="quantity" label="Material Quantity" name="quantity"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth  id="locationx" label="Location - x" name="supplier-location"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth  id="locationy" label="Location - y" name="supplier-location"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth  id="transport-address" label="Transport Address" name="transport-address"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth  id="manufacturer-address" label="Manufacturer Address" name="manufacturer-address"/>
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
export default AddRawMaterial;

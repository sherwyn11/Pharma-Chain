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

export default function AddRawMaterial(props) {
  // const [account] = useState(props.account);
  // const [web3, setWeb3] = useState(props.web3);
  // const [transporterAddress, setTransporterAddress] = useState("");
  // const [manufacturerAddress, setManufacturerAddress] = useState("");
  // const [supplyChain] = useState(props.supplyChain);
  // const [loading, isLoading] = useState(false);
  // const [description, setDescription] = useState("");
  // const [locationx, setLocationX] = useState("");
  // const [locationy, setLocationY] = useState("");
  // const [quantity, setQuantity] = useState("");

  const classes = useStyles();

  // const handleInputChange = (e) => {
  //   if (e.target.id === 'description') {
  //      setDescription(e.target.value);     
  //   } else if(e.target.id === 'locationx') {
  //       setLocationX(e.target.value);     
  //   } else if(e.target.id === 'locationy') {
  //       setLocationY(e.target.value);
  //   } else if(e.target.id === 'quantity') {
  //       setQuantity(e.target.value);
  //   } else if(e.target.id === 'transport-address') {
  //     setTransporterAddress(e.target.value);
  //   } else if(e.target.id === 'manufacturer-address') {
  //     setManufacturerAddress(e.target.value);
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   isLoading(true);
  //   var d = web3.utils.padRight(web3.utils.fromAscii(description), 64);
  //   supplyChain.methods.supplierCreatesRawPackage(d, locationx, locationy, quantity, transporterAddress, manufacturerAddress).send({ from: account })
  //   .once('receipt', async (receipt) => {
  //       console.log(receipt);
  //       isLoading(false);
  //   })
  // }


  return (
    <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5"> Add Raw Material</Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField variant="outlined" 
                // onChange={ handleInputChange } 
                required fullWidth  id="description" label="Material Description" name="description"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" 
                // onChange={ handleInputChange } 
                required fullWidth  id="quantity" label="Material Quantity" name="quantity"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined"
                //  onChange={ handleInputChange } 
                 required fullWidth  id="locationx" label="Location - x" name="supplier-location"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined"
                //  onChange={ handleInputChange }
                  required fullWidth  id="locationy" label="Location - y" name="supplier-location"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" 
                // onChange={ handleInputChange } 
                required fullWidth  id="transport-address" label="Transporter Address" name="transport-address"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" 
                // onChange={ handleInputChange } 
                required fullWidth  id="manufacturer-address" label="Manufacturer Address" name="manufacturer-address"/>
            </Grid>
            
            </Grid>
            <Button
              type="submit" fullWidth variant="contained" color="primary"
              //  className={classes.submit} onClick={ handleSubmit }
                >
              Submit
            </Button>
          
          </form>
        </div>
      </Container>
    </Grid>
  );
}

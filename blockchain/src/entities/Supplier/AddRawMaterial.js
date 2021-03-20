import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Transactions from '../../build/Transactions.json';
import RawMaterial from '../../build/RawMaterial.json';
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
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [transporterAddress, setTransporterAddress] = useState("");
  // const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [supplyChain] = useState(props.supplyChain);
  const [loading, isLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  console.log([account]);
  console.log("Supp SupplyChain");
  console.log([supplyChain]); 
  
  const classes = useStyles();

  const handleInputChange = (e) => {
    if (e.target.id === 'description') {
       setDescription(e.target.value);     
    } else if(e.target.id === 'quantity') {
        setQuantity(e.target.value);
    } else if(e.target.id === 'transport-address') {
      setTransporterAddress(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoading(true);
    var d = web3.utils.padRight(web3.utils.fromAscii(description), 64);
    supplyChain.methods.createRawMaterialPackage(d, quantity, transporterAddress, account).send({ from: account })
    .once('receipt', async (receipt) => {
      var rawMaterialAddresses = await supplyChain.methods.getAllPackages().call({from: account});
      let rawMaterialAddress = rawMaterialAddresses[rawMaterialAddresses.length - 1];
      const rawMaterial = new web3.eth.Contract(RawMaterial.abi, rawMaterialAddress);
      let data = await rawMaterial.methods.getSuppliedRawMaterials().call({from: account});
      let txnContractAddress = data[6];
      let txnHash = receipt.transactionHash;
      const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
      transactions.methods.createTxnEntry(txnHash, account, rawMaterialAddress, txnHash, '10', '10').send({ from: account }); //TODO: get user location -> (latitude, longitude)
      isLoading(false);
    });
  }

  return (
    <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5"> Add Raw Material</Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="description" label="Material Description" name="description"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="quantity" label="Material Quantity" name="quantity"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="transport-address" label="Transporter Address" name="transport-address"/>
            </Grid>
            </Grid>
            <Button
              type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={ handleSubmit } >
              Submit
            </Button>
          
          </form>
        </div>
      </Container>
    </Grid>
  );
}

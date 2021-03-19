import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Transactions from '../../build/Transactions.json';
import Medicine from '../../build/Medicine.json';

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

export default function CreateMedicine(props) {
  console.log(props);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [loading, isLoading] = useState(false);
  const [supplyChain] = useState(props.supplyChain);

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rawMatAddress, setRawMatAddress] = useState([]);
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [transporterAddress, setTransporterAddress] = useState("");
  const [wholesalerAddress, setWholesalerAddress] = useState(""); 

  const classes = useStyles();

  const handleInputChange = (e) => {
    if (e.target.id === 'description') {
       setDescription(e.target.value);     
    } else if(e.target.id === 'quantity') {
        setQuantity(e.target.value);     
    } else if(e.target.id === 'rawMatAddress') {
        setRawMatAddress(e.target.value);
    } else if(e.target.id === 'manufacturerAddress') {
        setManufacturerAddress(e.target.value);
    } else if(e.target.id === 'transporterAddress') {
        setTransporterAddress(e.target.value);
    } else if(e.target.id === 'wholesalerAddress') {
        setWholesalerAddress(e.target.value);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    isLoading(true);
    var d = web3.utils.padRight(web3.utils.fromAscii(description), 64);
    supplyChain.methods.manufacturerCreatesMedicine(manufacturerAddress, d, [rawMatAddress], quantity, [transporterAddress]).send({ from: account })
    .once('receipt', async (receipt) => {
      console.log(receipt);
      var medicineAddresses = await supplyChain.methods.getAllCreatedMedicines().call({ from: account });
      let medicineAddress = medicineAddresses[medicineAddresses.length - 1];
      const medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
      let data = await medicine.methods.getMedicineInfo().call({ from: account });
      let txnContractAddress = data[7];
      let txnHash = receipt.transactionHash;
      const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
      transactions.methods.createTxnEntry(txnHash, account, medicineAddress, txnHash, '10', '10').send({ from: account }); //TODO: get user location -> (latitude, longitude)
      isLoading(false);
    })
  }


  return (
    <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5">Create New Medicine </Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="description" label="Medicine Description" name="description"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="quantity" label="Medicine Quantity" name="quantity"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="rawMatAddress" label="Raw Material Address" name="rawMatAddress"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="manufacturerAddress" label="Manufacturer Address" name="manufacturerAddress"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="transporterAddress" label="Transporter Address" name="transporterAddress"/>
            </Grid>
              {/* <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="wholesalerAddress" label="Wholesaler Address" name="wholesalerAddress"/>
            </Grid> */}
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

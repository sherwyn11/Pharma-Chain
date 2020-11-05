import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function AddNewUser(props) {
    const classes = useStyles();
    const [account] = useState(props.account);
    const [web3, setWeb3] = useState(props.web3);
    const [supplyChain] = useState(props.supplyChain);
    const [name, setName] = useState("");
    const [locationx, setLocationX] = useState("");
    const [locationy, setLocationY] = useState("");
    const [role, setRole] = useState("");
    const [address, setAddress] = useState("");
    const [loading, isLoading] = useState(false);

    const handleInputChange = (e) => {
        if (e.target.id === '') {
           setName(e.target.value);     
        } else if(e.target.id === 'locationx') {
            setLocationX(e.target.value);     
        } else if(e.target.id === 'locationy') {
            setLocationY(e.target.value);
        } else if(e.target.id === 'role') {
            setRole(e.target.value);
        } else if(e.target.id === 'address') {
            setAddress(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isLoading(true);
        var n = web3.utils.padRight(web3.utils.fromAscii(name), 64);
        var loc = [String(locationx), String(locationy)];
        supplyChain.methods.registerUser(n, loc, Number(role), address).send({ from: account })
        .once('receipt', (receipt) => {
            console.log(receipt);
            isLoading(false);
        })
    }

    if(loading) {
        return <Loader></Loader>;
    }
    return (
        <form className={classes.root} noValidate autoComplete="on">
            <TextField id="name" label="Name" variant="outlined" onChange={ handleInputChange } /><br></br>
            <TextField id="locationx" label="Locationx" variant="outlined" onChange={ handleInputChange }/><br></br>
            <TextField id="locationy" label="Locationy" variant="outlined" onChange={ handleInputChange }/><br></br>
            <TextField id="role" label="Role" variant="outlined" onChange={ handleInputChange }/><br></br>
            <TextField id="address" label="Account" variant="outlined" onChange={ handleInputChange }/><br></br>
            <Button variant="contained" color="primary" onClick={ handleSubmit } >
                Submit
            </Button>    
        </form>
    );
}
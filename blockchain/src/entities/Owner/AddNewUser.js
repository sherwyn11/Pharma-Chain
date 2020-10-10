import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    const [ account ] = useState(props.account);
    const [ supplyChain ] = useState(props.supplyChain);
    const [ name, setName ] = useState("");
    const [ locationx, setLocationX ] = useState("");
    const [ locationy, setLocationY ] = useState("");
    const [ role, setRole ] = useState("");
    const [ address, setAddress ] = useState("");

    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
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
        console.log(name);
        console.log(locationx);
        console.log(locationy);
        console.log(role);
        console.log(address);
    }

    return (
        <form className={classes.root} noValidate autoComplete="on">
            <TextField id="name" label="Name" variant="outlined" onChange={ handleInputChange } /><br></br>
            <TextField id="locationx" label="Locationx" variant="outlined" onChange={ handleInputChange }/><br></br>
            <TextField id="locationy" label="Locationy" variant="outlined" onChange={ handleInputChange }/><br></br>
            <TextField id="role" label="Role" variant="outlined" onChange={ handleInputChange }/><br></br>
            <TextField id="address" label="Address" variant="outlined" onChange={ handleInputChange }/><br></br>
            <Button variant="contained" color="primary" onClick={ handleSubmit } >
                Submit
            </Button>    
        </form>
    );
}
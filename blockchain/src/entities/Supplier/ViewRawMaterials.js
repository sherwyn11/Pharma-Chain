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

export default function ViewRawMaterials(props) {
  const classes = useStyles();
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [loading, isLoading] = useState(false);

  async function handleSubmit() {
    var test = await supplyChain.methods.getNoOfPackagesOfSupplier().call();
    
    console.log(test);
    isLoading(true);
  }

  if (loading) { 
    return (
      <div>
        <p>{ test }</p>
      </div>
    );
  } else{
    handleSubmit();
    return (
        <p>Getting addresses</p>    
    );
  }

} 
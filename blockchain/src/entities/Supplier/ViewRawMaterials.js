import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';

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
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [loading, isLoading] = useState(false);

  async function handleSubmit() {
    var test = await supplyChain.methods.supplierGetRawMaterialAddresses().call();
    console.log(test);
    console.log(account);
    // var contract = new web3.eth.Contract(RawMaterial.abi, test);
    // console.log(contract);
    // let weiRaisedValue = await contract.methods.getSuppliedRawMaterials().call()
    // console.log(weiRaisedValue);
    isLoading(true);
  }

  if (loading) { 
    return (
      <div>
      </div>
    );
  } else{
    handleSubmit();
    return (
        <p>Getting addresses</p>    
    );
  }

} 
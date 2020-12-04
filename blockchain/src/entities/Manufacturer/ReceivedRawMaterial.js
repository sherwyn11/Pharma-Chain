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
export default function ReceivedRawMaterial(props) {
    const classes = useStyles();
    const [account] = useState(props.location.query.account);
    const [rawMaterialAddress] = useState(props.location.query.address);
    const [web3, setWeb3] = useState(props.location.query.web3);
    const [details, setDetails] = useState({});
    const [loading, isLoading] = useState(true);
  
    async function getRawMaterialData() {
      const rawMaterial = new web3.eth.Contract(RawMaterial.abi, rawMaterialAddress);
      let data = await rawMaterial.methods.receivedPackage().call({from: account});
      let status = await rawMaterial.methods.getRawMaterialStatus().call();
      if(status == 0) {
        status = 'At Supplier';
      } else if(status == 1) {
        status = 'Collected by Transporter';
      } else {
        status = 'Delivered to Manufacturer';
      }
      data[1] = web3.utils.hexToUtf8(data[1])
      let display = <div>
        <p>Generated Product ID: {data[0]}</p>
        <p>Description: {data[1]}</p>
        <p>Product Location: {data[2][0] + ', ' + data[2][1]}</p>
        <p>Product Quantity: {data[3]}</p>
        <p>Product Supplier: {data[4]}</p>
        <p>Product Transporter: {data[5]}</p>
        <p>Product Manufacturer: {data[6]}</p>
        <p>Product Status: {status}</p>
      </div>;
      setDetails(display);
      isLoading(false);
    }
  
    if(loading) {
      getRawMaterialData();
      return (
        <Loader></Loader>
      );
    } else {
      return (
        <div>
        <h1>Product Details</h1>
        <p>{details}</p>
        </div>
      );
    }
  } 
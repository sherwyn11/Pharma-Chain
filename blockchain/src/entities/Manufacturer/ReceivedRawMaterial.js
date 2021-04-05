import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import Transactions from '../../build/Transactions.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomStepper from '../../main_dashboard/components/Stepper/Stepper';
import axios from 'axios';

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
      let data = await rawMaterial.methods.getSuppliedRawMaterials().call({from: account});
      let status = await rawMaterial.methods.getRawMaterialStatus().call();
      let activeStep = Number(status);

      data[1] = web3.utils.hexToUtf8(data[1])
      let display = <div>
        <p>Generated Product ID: {rawMaterialAddress}</p>
        <p>Description: {data[1]}</p>
        <p>Product Quantity: {data[2]}</p>
        <p>Product Supplier: {data[3]}</p>
        <p>Product Transporter: {data[4]}</p>
        <p>Product Manufacturer: {data[5]}</p>
        <p>Product Transaction contract address: <Link to={{ pathname: `/manufacturer/view-transaction/${data[6]}`, query: { address: data[6], account: account, web3: web3 } }}>{data[6]}</Link>
        </p>
        <CustomStepper
          getSteps={getSupplyChainSteps}
          activeStep={activeStep}
          getStepContent={getSupplyChainStepContent}
        />
      </div>;
      setDetails(display);
      isLoading(false);
    }
  
  function getSupplyChainSteps() {
    return ['At Supplier', 'Collected by Transporter', 'Delivered to Manufacturer'];
  }

  function getSupplyChainStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Raw Material is at supplier stage in the supply chain.';
      case 1:
        return 'Raw Material collected by the Transporter is on its way to the Manufacturer.';
      case 2:
        return 'Raw Material currently with the Manufacturer';
      default:
        return 'Unknown stepIndex';
    }
  }

  async function saveRawMaterialDetails() {
    isLoading(true);
    let rawMaterial = new web3.eth.Contract(RawMaterial.abi, rawMaterialAddress);
    let rawMaterialInfoData = await rawMaterial.methods.getSuppliedRawMaterials().call({ from: account });

    let transaction = new web3.eth.Contract(Transactions.abi, rawMaterialInfoData[6]);
    let txns = await transaction.methods.getAllTransactions().call({ from: account });

    let fromAddresses = [];
    let toAddresses = [];
    let hash = [];
    let previousHash = [];
    let geoPoints = [];
    let timestamps = [];

    for (let txn of txns) {
      fromAddresses.push(txn[1]);
      toAddresses.push(txn[2]);
      hash.push(txn[0]);
      previousHash.push(txn[3]);
      geoPoints.push([Number(txn[4]), Number(txn[5])]);
      timestamps.push(Number(txn[6]));
    }

    axios.post('http://localhost:8000/api/raw-material/save-details', {
      'description': web3.utils.hexToUtf8(rawMaterialInfoData[1]),
      'quantity': Number(rawMaterialInfoData[2]),
      'rawMaterialAddress': rawMaterialAddress
    }).then((response) => {
      console.log(response.data);
      axios.post('http://localhost:8000/api/transaction/save-details', {
        'medicineAddress': rawMaterialAddress,
        'fromAddresses': fromAddresses,
        'toAddresses': toAddresses,
        'hash': hash,
        'previousHash': previousHash,
        'geoPoints': geoPoints,
        'timestamps': timestamps,
      }).then((response) => {
        isLoading(false);
        alert('Raw Material Info is saved to Database successfully!');
        console.log(response.data);
      }).catch((e) => {
        isLoading(false);
        console.log(e);
      })
    }).catch((e) => {
      isLoading(false);
      console.log(e);
    })
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
          <Button variant="contained" color="primary" onClick={saveRawMaterialDetails}>Save Raw Material Info to Database</Button>
        </div>
      );
    }
  } 
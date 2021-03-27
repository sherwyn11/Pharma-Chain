import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import Transactions from '../../build/Transactions.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomStepper from '../../main_dashboard/components/Stepper/Stepper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function RawMaterialInfo(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [rawMaterialAddress] = useState(props.location.query.address);
  const [web3] = useState(props.location.query.web3);
  const [supplyChain] = useState(props.location.query.supplyChain);
  const [manufacturer, setManufacturer] = useState("");
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getRawMaterialData() {
    let rawMaterial = new web3.eth.Contract(RawMaterial.abi, rawMaterialAddress);
    let data = await rawMaterial.methods.getSuppliedRawMaterials().call({ from: account });
    let status = await rawMaterial.methods.getRawMaterialStatus().call({ from: account });
    let activeStep = Number(status);

    if (status === 2) {
      activeStep = 3
    } else if (status === 3) {
      activeStep = 2
    }
    data[1] = web3.utils.hexToUtf8(data[1]);
    setManufacturer(data[5]);

    let display = <div>
      <p>Generated Product ID: {rawMaterialAddress}</p>
      <p>Description: {data[1]}</p>
      <p>Product Quantity: {data[2]}</p>
      <p>Product Supplier: {data[3]}</p>
      <p>Product Transporter: {data[4]}</p>
      <p>Product Manufacturer: {data[5]}</p>
      <p>Product Transaction contract address: <Link to={{ pathname: `/supplier/view-transaction/${data[6]}`, query: { address: data[6], account: account, web3: web3 } }}>{data[6]}</Link>
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

  function sendPackage() {
    let rawMaterial = new web3.eth.Contract(RawMaterial.abi, rawMaterialAddress);
    let signature = prompt('Enter signature');
    supplyChain.methods.sendPackageToEntity(manufacturer, account, rawMaterialAddress, signature).send({ from: account })
      .once('receipt', async (receipt) => {
        let data = await rawMaterial.methods.getSuppliedRawMaterials().call({ from: account });
        let txnContractAddress = data[6];
        let transporterAddress = data[4];
        let txnHash = receipt.transactionHash;
        const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
        let txns = await transactions.methods.getAllTransactions().call({ from: account });
        let prevTxn = txns[txns.length - 1][0];
        transactions.methods.createTxnEntry(txnHash, account, transporterAddress, prevTxn, '10', '10').send({ from: account });
      });
  }

  useEffect(() => {
    getRawMaterialData();
  }, []);

  if (loading) {
    return (
      <Loader></Loader>
    );
  } else {
    return (
      <div>
        <h1>Product Details</h1>
        <p>{details}</p>
        <Button variant="contained" color="primary" ><Link to={{ pathname: `/supplier/view-request/${rawMaterialAddress}`, query: { address: rawMaterialAddress, account: account, web3: web3, supplyChain: supplyChain } }}>View Requests</Link></Button>&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={sendPackage}>Send Package</Button>
      </div>
    );
  }
}
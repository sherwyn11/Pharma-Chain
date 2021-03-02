import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import Medicine from '../../build/Medicine.json';
import Transactions from '../../build/Transactions.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MedicineInfo(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [medicineAddress] = useState(props.location.query.address);
  const [web3] = useState(props.location.query.web3);
  const [supplyChain] = useState(props.location.query.supplyChain);
  const [manufacturer, setManufacturer] = useState("");
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getMedicineData() {
    let medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
    let data = await medicine.methods.getMedicineInfo().call({from: account});
    let status = data[6];
    let txt = "";
    if(status == 0) {
      txt = 'At Manufacturer';
    } else if(status == 1) {
      txt = 'Collected by Transporter';
    } else {
      txt = 'Delivered to Wholesaler';
    }
    data[1] = web3.utils.hexToUtf8(data[1]);
    setManufacturer(data[5]);

    let display = <div>
      <p>Product Manufacturer: {data[0]}</p>
      <p>Description: {data[1]}</p>
      <p>Product Raw Materials: {data[2]}</p>
      <p>Product Quantity: {data[3]}</p>
      <p>Product Transporter: {data[4]}</p>
      <p>Product Wholesaler: {data[8]}</p>
      <p>Product Distributor: {data[5]}</p>
      <p>Product Transaction contract address: <Link to={{pathname: `/manufacturer/view-transactions/${data[7]}`, query: {address: data[7], account: account, web3: web3}}}>{data[7]}</Link>
      </p>
      <p>Product Status: {txt}</p>
    </div>;
    setDetails(display);
    isLoading(false);
  }

  function sendPackage() {
    let medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
    let signature = prompt('Enter signature');
    supplyChain.methods.sendPackageToEntity(manufacturer, account, medicineAddress, signature).send({from: account})
    .once('receipt', async (receipt) => {
      let data = await medicine.methods.getSuppliedRawMaterials().call({from: account});
      let txnContractAddress = data[6];
      let transporterAddress = data[4];
      let txnHash = receipt.transactionHash;
      const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
      let txns = await transactions.methods.getAllTransactions().call({from: account});
      let prevTxn = txns[txns.length - 1][0];
      transactions.methods.createTxnEntry(txnHash, account, transporterAddress, prevTxn, '10', '10').send({from: account});
    });
  }

  useEffect(() => {
    getMedicineData();
  }, []);

  if(loading) {
    return (
      <Loader></Loader>
    );
  } else {
    return (
      <div>
        <h1>Product Details</h1>
        <p>{details}</p>
        <Button variant="contained" color="primary" ><Link to={{pathname: `/manufacturer/view-requests/${medicineAddress}`, query: {address: medicineAddress, account: account, web3: web3, supplyChain: supplyChain}}}>View Requests</Link></Button>&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={sendPackage}>Send Package</Button>
      </div>
    );
  }
} 
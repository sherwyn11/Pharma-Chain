import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import Medicine from '../../build/Medicine.json';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import styles from "../../main_dashboard/assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function ViewRequests(props) {
  const classes = useStyles();
  const [ address ] = useState(props.location.query.address);
  const [ account ] = useState(props.location.query.account);
  const [ web3 ] = useState(props.location.query.web3);
  const [ supplyChain ] = useState(props.location.query.supplyChain);
  const [ details, setDetails ] = useState({});
  const [ loading, isLoading ] = useState(true);

  async function verifySignature(buyerAddress, signature) {
    let v = '0x' + signature.slice(130, 132).toString();
    let r = signature.slice(0, 66).toString();
    let s = '0x' + signature.slice(66, 130).toString();
    let messageHash = web3.eth.accounts.hashMessage(address);
    let verificationOutput = await supplyChain.methods.verify(buyerAddress, messageHash, v, r, s).call({ from: account });
    if (verificationOutput) {
      alert('Buyer is verified successfully!');
      signature = prompt('Enter signature');
      supplyChain.methods.respondToEntity(buyerAddress, account, address, signature).send({ from: account })
      const data = await supplyChain.methods.getUserInfo(account).call();
      const role = data[ 'role' ];

      if (role === "1") {
        const rawMaterial = new web3.eth.Contract(RawMaterial.abi, address);
        rawMaterial.methods.updateManufacturerAddress(buyerAddress).send({ from: account });
        alert('Response sent to manufacturer');
      } else if (role === "3") {
        const medicine = new web3.eth.Contract(Medicine.abi, address);
        medicine.methods.updateWholesalerAddress(buyerAddress).send({ from: account });
        alert('Response sent to wholesaler');
      } else if (role === "4") {
        const medicine = new web3.eth.Contract(Medicine.abi, address);
        medicine.methods.updateDistributorAddress(buyerAddress).send({ from: account });
        alert('Response sent to distributor');
      } else {
        console.log('error');
      }
    } else {
      alert('Buyer is not verified!');
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    let events = await supplyChain.getPastEvents('buyEvent', { filter: { packageAddr: address }, fromBlock: 0, toBlock: 'latest' });
    // let events = await supplyChain.getPastEvents('buyEvent', {fromBlock: 0, toBlock: 'latest'});
    events = events.filter((event) => {
      return event.returnValues.packageAddr === address && event.returnValues.seller === account;
    });

    const lst = events.map(data => {
      return (
        <TableRow className={classes.tableBodyRow}>
          <TableCell className={classes.tableCell}>{data.returnValues[ 0 ]}</TableCell>
          <TableCell className={classes.tableCell}>{data.returnValues[ 1 ]}</TableCell>
          <TableCell className={classes.tableCell}>{data.returnValues[ 2 ]}</TableCell>
          <TableCell className={classes.tableCell}>{data.returnValues[ 3 ]}</TableCell>
          <TableCell className={classes.tableCell}>{new Date(data.returnValues[ 4 ] * 1000).toString()}</TableCell>
          <TableCell className={classes.tableCell}><Button variant="contained" color="secondary" onClick={() => verifySignature(data.returnValues[ 0 ], data.returnValues[ 3 ])}>Verify Signature</Button></TableCell>
        </TableRow>
      )
    });

    setDetails(lst);
    isLoading(false);
  }

  if (loading) {
    return (
      <Loader></Loader>
    );
  } else {
    return (
      <div className="container">
        <div className={classes.tableResponsive}>
          <Table border="1" className={classes.table} style={{ marginTop: 20 }}>
            <TableHead className={classes[ "purpleTableHeader" ]}>
              <TableRow className={classes.tableHeadRow}>
                <TableCell className={classes.tableCell + " " + classes.tableHeadCell} scope="col-xs-2">Buyer Address</TableCell>
                <TableCell TableCell className={classes.tableCell + " " + classes.tableHeadCell} scope="col-xs-2">Seller Address</TableCell>
                <TableCell TableCell className={classes.tableCell + " " + classes.tableHeadCell} scope="col-xs-2">Package Address</TableCell>
                <TableCell TableCell className={classes.tableCell + " " + classes.tableHeadCell} scope="col-xs-2">Signature</TableCell>
                <TableCell TableCell className={classes.tableCell + " " + classes.tableHeadCell} scope="col-xs-2">Timestamp</TableCell>
                <TableCell TableCell className={classes.tableCell + " " + classes.tableHeadCell} scope="col-xs-2">Verify</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import Medicine from '../../build/Medicine.json';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import styles from "../../main_dashboard/assets/jss/material-dashboard-react/components/tableStyle.js";
import CardBody from '../../main_dashboard/components/Card/CardBody';
import CardHeader from '../../main_dashboard/components/Card/CardHeader';
import Card from '../../main_dashboard/components/Card/Card';

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
        <TableRow hover key={data.returnValues[ 0 ]} className={classes.tableBodyRow}>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 0 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 1 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 2 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "20px" }}>{data.returnValues[ 3 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "20px" }}>{new Date(data.returnValues[ 4 ] * 1000).toString()}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "40px" }}><Button variant="contained" color="secondary" onClick={() => verifySignature(data.returnValues[ 0 ], data.returnValues[ 3 ])}>Verify Signature</Button></TableCell>
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
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>View Requests</h4>
        </CardHeader>
        <CardBody>
          <div className={classes.tableResponsive}>
            <Table stickyHeader className={classes.table}>
              <TableHead className={classes[ "primaryTableHeader" ]}>
                <TableRow className={classes.tableHeadRow}>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Buyer Address</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Seller Address</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Package Address</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Signature</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Timestamp</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Verify</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    );
  }
}
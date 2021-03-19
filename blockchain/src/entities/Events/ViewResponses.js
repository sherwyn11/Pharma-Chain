import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import styles from "../../main_dashboard/assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function ViewResponse(props) {
  const classes = useStyles();
  const [ account ] = useState(props.account);
  const [ web3 ] = useState(props.web3);
  const [ supplyChain ] = useState(props.supplyChain);
  const [ details, setDetails ] = useState({});
  const [ loading, isLoading ] = useState(true);

  async function verifySignature(sellerAddress, address, signature) {
    let v = '0x' + signature.slice(130, 132).toString();
    let r = signature.slice(0, 66).toString();
    let s = '0x' + signature.slice(66, 130).toString();
    let messageHash = web3.eth.accounts.hashMessage(address);

    let verificationOutput = await supplyChain.methods.verify(sellerAddress, messageHash, v, r, s).call({ from: account });
    if (verificationOutput) {
      alert('Seller is Verified successfully!');
    } else {
      alert('Buyer is NOT Verified!');
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    let events = await supplyChain.getPastEvents('respondEvent', { filter: { buyer: account }, fromBlock: 0, toBlock: 'latest' });
    // let events = await supplyChain.getPastEvents('respondEvent', {fromBlock: 0, toBlock: 'latest'});
    events = events.filter((event) => {
      return event.returnValues.buyer == account;
    });

    const lst = events.map(data => {
      return (
        <tr key={data.returnValues[ 0 ]} style={{ height: 100 }}>
          <td>{data.returnValues[ 0 ]}</td>
          <td>{data.returnValues[ 1 ]}</td>
          <td>{data.returnValues[ 2 ]}</td>
          <td>{data.returnValues[ 3 ]}</td>
          <td>{new Date(data.returnValues[ 4 ] * 1000).toString()}</td>
          <td><Button variant="contained" color="secondary" onClick={() => verifySignature(data.returnValues[ 1 ], data.returnValues[ 2 ], data.returnValues[ 3 ])}>Verify Signature</Button></td>
        </tr>
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
        <div className={classes.tableResponsive}>            <table border="1" className="table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th scope="col-xs-2">Buyer Address</th>
              <th scope="col-xs-2">Seller Address</th>
              <th scope="col-xs-2">Package Address</th>
              <th scope="col-xs-2">Signature</th>
              <th scope="col-xs-2">Timestamp</th>
              <th scope="col-xs-2">Verify</th>
            </tr>
          </thead>
          <tbody>
            {details}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
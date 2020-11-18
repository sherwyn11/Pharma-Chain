import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import Transactions from '../../build/Transactions.json';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewTransactions(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [txnAddress] = useState(props.location.query.address);
  const [web3, setWeb3] = useState(props.location.query.web3);
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getTxnData() {
    const transaction = new web3.eth.Contract(Transactions.abi, txnAddress);
    let txns = await transaction.methods.getAllTransactions().call({from: account});
    const txnsList = txns.map(data => {
        return(
            <tr key={data[0]} style={{height: 100}}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
                <td>{data[5]}</td>
                <td>{new Date(data[6] * 1000).toString()}</td>
            </tr>
        )
    });
    setDetails(txnsList);
    isLoading(false);
  }

  if(loading) {
    getTxnData();
    return (
      <Loader></Loader>
    );
  } else {
    return (
        <div className="container">
        <div className="table-responsive">
            <table border="1" className="table" style={{marginTop: 20}}>
                <thead>
                    <tr>
                    <th scope="col-xs-2">TxnHash</th>
                    <th scope="col-xs-2">From</th>
                    <th scope="col-xs-2">To</th>
                    <th scope="col-xs-5">Previous TxnHash</th>
                    <th scope="col-xs-3">Latitude</th>
                    <th scope="col-xs-2">Longitude</th>
                    <th scope="col-xs-2">Timestamp</th>
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
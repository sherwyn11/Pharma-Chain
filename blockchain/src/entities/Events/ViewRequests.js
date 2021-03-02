import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import Medicine from '../../build/Medicine.json';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewRequests(props) {
  const classes = useStyles();
  const [address] = useState(props.location.query.address);
  const [account] = useState(props.location.query.account);
  const [web3] = useState(props.location.query.web3);
  const [supplyChain] = useState(props.location.query.supplyChain);
  const [details, setDetails] = useState({});
  const [role, setRole] = useState(0);
  const [loading, isLoading] = useState(true);

  async function verifySignature(buyerAddress, signature) {
    let v = '0x' + signature.slice(130, 132).toString();
    let r = signature.slice(0, 66).toString();
    let s = '0x' + signature.slice(66, 130).toString();
    let messageHash = web3.eth.accounts.hashMessage(address);
    let verificationOutput = await supplyChain.methods.verify(buyerAddress, messageHash, v, r, s).call({from: account});
    if(verificationOutput) {
      alert('Buyer is verified successfully!');
      signature = prompt('Enter signature');
      supplyChain.methods.respondToEntity(buyerAddress, account, address, signature).send({ from: account })
      if (role === 1) {
        const rawMaterial = new web3.eth.Contract(RawMaterial.abi, address);
        rawMaterial.methods.updateManufacturerAddress(buyerAddress).send({ from: account });
        alert('Response sent to manufacturer');
      } else if(role === 3) {
        const medicine = new web3.eth.Contract(Medicine.abi, address);
        medicine.methods.updateWholesalerAddress(buyerAddress).send({ from: account });
        alert('Response sent to wholesaler');
      } else if (role === 4) {
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

    var test = await supplyChain.methods.getUserInfo(address).call();
    setRole(test.role);
    console.log(test.role);

    let events = await supplyChain.getPastEvents('buyEvent', {filter: {packageAddr: address}, fromBlock: 0, toBlock: 'latest'});
    // let events = await supplyChain.getPastEvents('buyEvent', {fromBlock: 0, toBlock: 'latest'});
    events = events.filter((event) => {
        return event.returnValues.packageAddr == address;
    });

    const lst = events.map(data => {
        return(
            <tr key={data.returnValues[0]} style={{height: 100}}>
                <td>{data.returnValues[0]}</td>
                <td>{data.returnValues[1]}</td>
                <td>{data.returnValues[2]}</td>
                <td>{data.returnValues[3]}</td>
                <td>{new Date(data.returnValues[4] * 1000).toString()}</td>
                <td><Button variant="contained" color="secondary" onClick={() => verifySignature(data.returnValues[0], data.returnValues[3])}>Verify Signature</Button></td>
            </tr>
        )
    });
    setDetails(lst);
    isLoading(false);
  }

  if(loading) {
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
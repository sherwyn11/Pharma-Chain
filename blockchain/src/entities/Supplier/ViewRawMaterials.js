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
  const [addresses, setAddresses] = useState([]);

  function handleAddressClick(e) {
    console.log(e.target.id);
  }

  async function handleSubmit() {
    var rawMaterialAddresses = await supplyChain.methods.supplierGetRawMaterialAddresses().call({from: account});
    var components = rawMaterialAddresses.map((addr) => {
      return <div><ul><li><p key={addr} id={addr} onClick={handleAddressClick}>{ addr }</p></li></ul></div>;
    });
    setAddresses(components);
    isLoading(true);
  }

  if (loading) { 
    return (
      <div>
          <h4>Raw Material addresses created by Supplier</h4>
          { addresses }
      </div>
    );
  } else{
    handleSubmit();
    return (
        <p>Getting addresses</p>    
    );
  }

} 
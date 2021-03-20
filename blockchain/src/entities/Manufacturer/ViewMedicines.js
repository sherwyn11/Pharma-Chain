import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MedicineInfo from './MedicineInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function ViewMedicines(props) {
    const classes = useStyles();
    const [ account ] = useState(props.account);
    const [ web3, setWeb3 ] = useState(props.web3);
    const [ supplyChain ] = useState(props.supplyChain);
    const [ loading, isLoading ] = useState(false);
    const [ addresses, setAddresses ] = useState([]);

    async function handleSubmit() {
        var rawMaterialAddresses = await supplyChain.methods.getAllCreatedMedicines().call({ from: account });
        var components = rawMaterialAddresses.map((addr) => {
            return <div><ul><li>
                <Link to={{ pathname: `/manufacturer/view-medicine/${addr}`, query: { address: addr, account: account, web3: web3, supplyChain: supplyChain } }}>{addr}</Link>
            </li></ul></div>;
        });
        setAddresses(components);
        isLoading(true);
    }

    if (loading) {
        return (
            <div>
                <h4>Medicines created by Manufacturer</h4>
                { addresses}
            </div>
        );
    } else {
        handleSubmit();
        return (
            <p>Getting addresses</p>
        );
    }
}
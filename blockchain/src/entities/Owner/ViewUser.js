import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewUser(props) {
    const classes = useStyles();
    const [account] = useState(props.account);
    const [web3, setWeb3] = useState(props.web3);
    const [supplyChain] = useState(props.supplyChain);
    const [name, setName] = useState("");
    const [locationx, setLocationX] = useState("");
    const [locationy, setLocationY] = useState("");
    const [role, setRole] = useState("");
    const [address, setAddress] = useState("");
    const [loading, isLoading] = useState(false);

    return <Loader></Loader>;
}
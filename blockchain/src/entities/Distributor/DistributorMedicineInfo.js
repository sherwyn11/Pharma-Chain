import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import Medicine from '../../build/Medicine.json';
import Transactions from '../../build/Transactions.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomStepper from '../../main_dashboard/components/Stepper/Stepper';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function DistributorMedicineInfo(props) {
    const classes = useStyles();
    const [account] = useState(props.location.query.account);
    const [medicineAddress] = useState(props.location.query.address);
    const [web3] = useState(props.location.query.web3);
    const [supplyChain] = useState(props.location.query.supplyChain);
    const [distributor, setDistributor] = useState("");
    const [details, setDetails] = useState({});
    const [loading, isLoading] = useState(true);

    async function getMedicineData() {
        let medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
        let data = await medicine.methods.getMedicineInfo().call({ from: account });
        let subcontractAddressWD = await supplyChain.methods.getSubContractWD(medicineAddress).call({ from: account });
        let subcontractAddressDC = await supplyChain.methods.getSubContractDC(medicineAddress).call({ from: account });
        let status = data[6];
        console.log(status);
        let txt = "NA";
        let activeStep = Number(status);
        console.log(status);

        if (status === 2) {
            activeStep = 3
        } else if (status === 3) {
            activeStep = 2
            // txt = 'Delivered to Wholesaler';
        }
        data[1] = web3.utils.hexToUtf8(data[1]);
        setDistributor(data[5]);

        let display = <div>
            <p>Product Address: {medicineAddress}</p>
            <p>Product Manufacturer: {data[0]}</p>
            <p>Description: {data[1]}</p>
            <p>Product Raw Materials: {data[2]}</p>
            <p>Product Quantity: {data[3]}</p>
            <p>Product Transporter: {data[4]}</p>
            <p>Product Wholesaler: {data[8]}</p>
            <p>Product Distributor: {data[5]}</p>
            <p>Product Transaction contract address: <Link to={{ pathname: `/distributor/view-transaction/${data[7]}`, query: { address: data[7], account: account, web3: web3 } }}>{data[7]}</Link>
            </p>
            <p>Subcontract Address W-D: {subcontractAddressWD}</p>
            <p>Subcontract Address D-C: {subcontractAddressDC}</p>
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
        return ['At Manufacturer', 'Collected by Transporter', 'Delivered to Wholesaler', 'Collected by Transporter', 'Delivered to Distributor', 'Collected by Transporter', 'Medicine Delivered'];
    }

    function getSupplyChainStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Medicine at manufacturing stage in the supply chain.';
            case 1:
                return 'Medicine collected by the Transporter is on its way to you.';
            case 2:
                return 'Wholesaler, the medicine is currently with you!';
            case 3:
                return 'Medicine is collected by the Transporter! On its way to the Distributor.';
            case 4:
                return 'Medicine is delivered to the Distributor';
            case 5:
                return 'Medicine collected by Transporter is on its way to the pharmacy/customer.';
            case 6:
                return 'Medicine Delivered Successfully!';
            default:
                return 'Unknown stepIndex';
        }
    }

    function sendPackage() {
        let medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
        let signature = prompt('Enter signature');
        supplyChain.methods.sendPackageToEntity(distributor, account, medicineAddress, signature).send({ from: account })
            .once('receipt', async (receipt) => {
                let data = await medicine.methods.getMedicineInfo().call({ from: account });
                let txnContractAddress = data[7];
                let transporterAddress = data[4][data[4].length - 1];
                let txnHash = receipt.transactionHash;
                const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
                let txns = await transactions.methods.getAllTransactions().call({ from: account });
                let prevTxn = txns[txns.length - 1][0];
                transactions.methods.createTxnEntry(txnHash, account, transporterAddress, prevTxn, '10', '10').send({ from: account });
            });
    }

    async function saveMedicineDetails() {
        isLoading(true);
        let medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
        let data = await medicine.methods.getMedicineInfo().call({ from: account });

        let transaction = new web3.eth.Contract(Transactions.abi, data[7]);
        let txns = await transaction.methods.getAllTransactions().call({ from: account });

        let fromAddresses = [];
        let toAddresses = [];
        let hash = [];
        let previousHash = [];
        let geoPoints = [];
        let timestamps = [];

        for (let txn of txns) {
            fromAddresses.push(txn[1]);
            toAddresses.push(txn[2]);
            hash.push(txn[0]);
            previousHash.push(txn[3]);
            geoPoints.push([Number(txn[4]), Number(txn[5])]);
            timestamps.push(Number(txn[6]));
        }

        axios.post('http://localhost:8000/api/medicine/save-details', {
            'medicineAddress': medicineAddress,
            'description': web3.utils.hexToUtf8(data[1]),
            'quantity': Number(data[3]),
            'rawMaterialAddress': data[2][0]
        }).then((response) => {
            console.log(response.data);
            axios.post('http://localhost:8000/api/transaction/save-details', {
                'medicineAddress': medicineAddress,
                'fromAddresses': fromAddresses,
                'toAddresses': toAddresses,
                'hash': hash,
                'previousHash': previousHash,
                'geoPoints': geoPoints,
                'timestamps': timestamps,
            }).then((response) => {
                isLoading(false);
                alert('Medicine Info is saved to Database successfully!');
                console.log(response.data);
            }).catch((e) => {
                isLoading(false);
                console.log(e);
            })            
        }).catch((e) => {
            isLoading(false);
            console.log(e);
        })
    }


    useEffect(() => {
        getMedicineData();
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
                <Button variant="contained" color="primary" ><Link to={{ pathname: `/distributor/view-requests/${medicineAddress}`, query: { address: medicineAddress, account: account, web3: web3, supplyChain: supplyChain } }}>View Requests</Link></Button>&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={sendPackage}>Send Package</Button>&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={saveMedicineDetails}>Save Medicine Info to Database</Button>
            </div>
        );
    }
}
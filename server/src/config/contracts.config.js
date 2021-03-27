import Web3 from 'web3';
import { SUPPLY_CHAIN_CONTRACT_ADDRESS, SUPPLY_CHAIN_OWNER_ADDRESS } from './constants.config';
import SupplyChain from '../contracts/SupplyChain.json';

let accounts;
let supplyChain;
var web3;

const initContract = async () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    }

    supplyChain = new web3.eth.Contract(SupplyChain.abi, SUPPLY_CHAIN_CONTRACT_ADDRESS);
    // var test = await supplyChain.methods.getUserInfo('0x03641Da51B024a9e386B1fB1AA6434833aCc274e').call({ from: SUPPLY_CHAIN_OWNER_ADDRESS});
}

const getContractandAccounts = () => {
    return { accounts, supplyChain };
}

export { initContract, getContractandAccounts };
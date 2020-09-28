pragma solidity ^0.6.6;

import './MedicineW_D.sol';
import './Medicine.sol'

contract Wholesaler {
    
    mapping(address => address[]) public MedicinesAtWholesaler;
    mapping(address => address[]) public MedicineWtoD;
    mapping(address => address) public MedicineWtoDTxContract;
    
    constructor() public {}
    
    function medicineReceived(
        address _address,
        address cid
    ) internal {

        uint rtype = Medicine(batchid).receivedPackage(msg.sender);
        if(rtype == 1){
            MedicinesAtWholesaler[msg.sender].push(_address);
        }else if( rtype == 2){
            MedicinesAtWholesaler[msg.sender].push(_address);
            if(Madicine(batchid).getWDP()[0] != address(0)){
                MedicineW_D(cid).receiveWD(batchid, msg.sender);
            }
        }
    }
    
    function transferMedicineWtoD(
        address _address,
        address transporter,
        address receiver
    ) internal {
        
        MedicineW_D wd = new MedicineW_D(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        MedicineWtoD[msg.sender].push(address(wd));
        MedicineWtoDTxContract[_address] = address(wd);
    }
}
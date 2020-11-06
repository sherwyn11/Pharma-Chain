pragma solidity ^0.6.6;

import './MedicineW_D.sol';
import './Medicine.sol';
import './MedicineD_C.sol';

contract Distributor {
    
    mapping(address => address[]) public MedicinesAtDistributor;
    mapping(address => address[]) public MedicineDtoC;
    mapping(address => address) public MedicineDtoCTxContract;
    
    function medicineRecievedAtDistributor(
        address _address, 
        address cid
        ) public {
            
        uint rtype = Medicine(_address).receivedMedicine(msg.sender);
        if(rtype == 2){
            MedicinesAtDistributor[msg.sender].push(_address);
            if(Medicine(_address).getWDC()[0] != address(0)){
                MedicineW_D(cid).receiveWD(_address, msg.sender);
            }
        }
    }


    function transferMedicineDtoC(
        address _address,
        address transporter,
        address receiver
    ) public {
        MedicineD_C dp = new MedicineD_C(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        MedicineDtoC[msg.sender].push(address(dp));
        MedicineDtoCTxContract[_address] = address(dp);
    }

}
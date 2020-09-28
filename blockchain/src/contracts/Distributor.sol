pragma solidity ^0.6.6;

import './Medicine.sol';
import './MedicineD_C.sol';


contract Distributor {
    
    mapping(address => address[]) MedicineBatchAtDistributor;
    mapping(address => address[]) MedicineDtoC;
    mapping(address => address) MedicineDtoCTxContract;


    function transferMedicineDtoC(
        address _address,
        address transporter,
        address receiver
    ) internal {
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
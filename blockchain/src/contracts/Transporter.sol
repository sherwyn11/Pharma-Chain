pragma solidity ^0.6.6;

import './RawMaterial.sol';
import './Medicine.sol';

contract Transporter {
    
    function handlePackage(
        address _addr,
        uint transportertype
        // address cid
        ) public {

        if(transportertype == 1) { 
            /// Supplier -> Manufacturer
            RawMaterial(_addr).pickPackage(msg.sender);
        } 
        else if(transportertype == 2) { 
            /// Manufacturer -> Wholesaler
            Medicine(_addr).pickMedicine(msg.sender);
        }
    }    
}
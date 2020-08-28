pragma solidity ^0.6.6;

import './RawMaterial.sol';

contract Transporter {
    
    function handlePackage(
        address _addr,
        uint transportertype
        ) public {

        if(transportertype == 1) { 
            /// Supplier -> Manufacturer
            RawMaterial(_addr).pickPackage(msg.sender);
        } 
        else if(transportertype == 2) { 
            /// Manufacturer -> Wholesaler
            Medicine(_addr).pickPackage(msg.sender);
        }
    } 
}
pragma solidity ^0.6.6;

import './RawMaterial.sol';
import './Medicine.sol';
import './MedicineW_D.sol';
import './MedicineD_C.sol';

contract Transporter {
    
    function handlePackage(
        address _addr,
        uint transportertype,
        address cid
        ) public {

        if(transportertype == 1) { 
            /// Supplier -> Manufacturer
            RawMaterial(_addr).pickPackage(msg.sender);
        } else if(transportertype == 2) { 
            /// Manufacturer -> Wholesaler
            Medicine(_addr).pickMedicine(msg.sender);
        } else if(transportertype == 3) {   
            // Wholesaler to Distributer
            MedicineW_D(cid).pickWD(_addr, msg.sender);
        } else if(transportertype == 4) {   
            // Distrubuter to Customer
            MedicineD_C(cid).pickDC(_addr, msg.sender);
        }
    }
    
    
}
pragma solidity ^0.6.6;

import './RawMaterial.sol';
import './Medicine.sol';

contract Manufacturer {
    
    mapping (address => address[]) public manufacturerRawMaterials;
    mapping (address => address[]) public manufacturerMedicines;

    
    function manufacturerReceivedPackage(
        address _addr,
        address _manufacturerAddress
        ) internal {
            
        RawMaterial(_addr).receivedPackage(_manufacturerAddress);
        manufacturerRawMaterials[_manufacturerAddress].push(_addr);
    }
    
    
    function manufacturerCreatesMedicine(
        address _manufacturerAddr,
        bytes32 _description,
        address[] _rawAddr,
        uint _quantity,
        address _transporterAddr,
        address _recieverAddr,
        uint RcvrType
        ) internal {
            
        Medicine _medicine = new Medicine(
            _manufacturerAddr,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr,
            _recieverAddr,
            RcvrType
        );
        
        manufacturerMedicines[_manufacturerAddr].push(address(_medicine));
        
    }
    
}
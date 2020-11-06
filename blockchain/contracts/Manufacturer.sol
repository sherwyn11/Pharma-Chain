pragma solidity ^0.6.6;

import './RawMaterial.sol';
import './Medicine.sol';

contract Manufacturer {
    
    mapping (address => address[]) public manufacturerRawMaterials;
    mapping (address => address[]) public manufacturerMedicines;

    constructor() public {}
    
    function manufacturerReceivedPackage(
        address _addr,
        address _manufacturerAddress
        ) public {
            
        RawMaterial(_addr).receivedPackage(_manufacturerAddress);
        manufacturerRawMaterials[_manufacturerAddress].push(_addr);
    }
    
    
    function manufacturerCreatesMedicine(
        address _manufacturerAddr,
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr,
        address _recieverAddr,
        uint RcvrType
        ) public {
            
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
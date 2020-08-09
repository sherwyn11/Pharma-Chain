pragma solidity ^0.6.6;

import './Product.sol';

contract Manufacturer {

    struct manufacturer {
        string addressName;
        string name;
        uint mid;
        uint pNo;
    }

    mapping (address => manufacturer) public manufacturerMap;
    mapping (address => mapping(uint => address)) public manuProductMap;

    constructor() {}

    function createManufacturer(string memory _name, string memory _addressName, string memory _mid) {
        manufacturerMap[msg.sender] = manufacturer(_addressName, _name, _mid, 0);
    }

    function addProductToManufacturer(string memory _itemName, string memory _latitude, string memory _longitude) {
        manuProductMap[msg.sender][manufacturerMap[msg.sender].pNo] = createProduct(_itemName, _latitude, _longitude);
        manufacturerMap[msg.sender].pNo += 1;
    }

    
}
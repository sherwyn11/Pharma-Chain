pragma solidity ^0.6.6;

import './Product.sol';

contract Manufacturer is Product {

    struct manufacturer {
        string locationAddress;
        string manufacturerName;
        address mid;
        uint pNo;
    }

    mapping (address => manufacturer) public manufacturerMap;
    mapping (address => mapping(uint => address)) public manuProductMap;

    constructor() public {}

    function createManufacturer(string mexmory _name, string memory _addressName) public {
        address _mid = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        manufacturerMap[msg.sender] = manufacturer(_addressName, _name, _mid, 0);
    }

    function addProductToManufacturer(string memory _itemName, string memory _latitude, string memory _longitude, uint _quantity) public returns(address) {
        address _id = createProduct(_itemName, _latitude, _longitude, _quantity);
        manuProductMap[msg.sender][manufacturerMap[msg.sender].pNo] = _id;
        manufacturerMap[msg.sender].pNo += 1;

        return _id;
    }
    
    function getAllProducts() public view returns (address[] memory) {
        address[] memory ret = new address[](manufacturerMap[msg.sender].pNo);
        for (uint i = 0; i < manufacturerMap[msg.sender].pNo; i++) {
            ret[i] = manuProductMap[msg.sender][i];
        }
        return ret;
    }
}
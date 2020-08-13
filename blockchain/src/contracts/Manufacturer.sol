pragma solidity ^0.6.6;

import './Product.sol';

contract Manufacturer is Product {

    struct manufacturer {
        string locationAddress;
        string manufacturerName;
        address[] productsArr;
    }

    mapping (address => manufacturer) public manufacturerMap;

    constructor() public {}

    function createManufacturer(address _addr, string memory _name, string memory _addressName) internal {
        manufacturerMap[_addr].locationAddress = _addressName;
        manufacturerMap[_addr].manufacturerName = _name;
    }


    function addProductToManufacturer(string memory _itemName, uint _quantity) public returns(address) {
        address _id = createProduct(_itemName, _quantity);
        manufacturerMap[msg.sender].productsArr.push(_id);

        return _id;
    }


    function createComposite(address _uniqueId, address _compositeId) public returns(string memory){
        addComposite(_uniqueId, _compositeId);
        
        return 'Composite added';
    }
    
    function getItems() public view returns (address[] memory) {
        address[] memory ret = new address[](manufacturerMap[msg.sender].productsArr.length);
        for (uint i = 0; i < manufacturerMap[msg.sender].productsArr.length; i++) {
            ret[i] = manufacturerMap[msg.sender].productsArr[i];
        }
        return ret;
    }
    
    
}
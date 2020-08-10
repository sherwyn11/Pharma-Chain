pragma solidity ^0.6.6;

import './Product.sol';

contract Distributor is Product {
    
    struct distributor {
        address distributorAddress;
        string distributorName;
        string distributorContact;
    }
    
    mapping (address => distributor) public distributorMap;
    
    constructor () public {}
    
    function createDistributor(string memory _distributorName, string memory _distributorContact) public {
        distributorMap[msg.sender] = distributor(msg.sender, _distributorName, _distributorContact);
    }
    
    function distributorUpdateProductStatus(address uniqueId, 
                                            uint _no, string memory _status, 
                                            string memory _latitude, 
                                            string memory _longitude) public{
        updateProductStatus(uniqueId, _no, _status, _latitude, _longitude);
    }
}
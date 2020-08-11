pragma solidity ^0.6.6;

import './Product.sol';

contract Distributor is Product {
    
    struct distributor {
        string distributorName;
        string distributorContact;
    }
    
    mapping (address => distributor) public distributorMap;
    
    constructor () public {}
    
    function createDistributor(address addr, string memory _distributorName, string memory _distributorContact) internal {
        distributorMap[addr] = distributor(_distributorName, _distributorContact);
    }
}
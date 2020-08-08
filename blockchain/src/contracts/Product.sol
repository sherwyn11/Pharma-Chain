pragma solidity ^0.6.6;


contract Product {

    struct product {
        bool isUidGenerated;
        uint itemId;
        string itemName;
        // string transitstatus;
        // uint orderstatus;
    }

    mapping (address => product) public products;

    constructor(){}

    function createProduct(uint _itemId, string memory _itemName) public returns(address){
        address uniqueId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        products[uniqueId].isUidGenerated = true;
        products[uniqueId].itemId = _itemId;
        products[uniqueId].itemName = _itemName;

        return uniqueId;
    }
}
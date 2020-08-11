pragma solidity ^0.6.6;


contract Product {

    struct product {
        bool isUidGenerated;
        string itemName;
        uint compositeNo;
        uint quantityMg;
        composites[] compositesArr;
    }

    struct composites {
        address uniqueId;
    }

    mapping (address => product) public productMap;

    constructor() public {}

    function createProduct(string memory _itemName, uint _quantityMg) internal returns(address) {
        address uniqueId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        productMap[uniqueId].isUidGenerated = true;
        productMap[uniqueId].itemName = _itemName;
        productMap[uniqueId].quantityMg = _quantityMg;

        return uniqueId;
    }


    function addComposite(address _uniqueId, address _compositeId) internal {
        productMap[_uniqueId].compositesArr.push(composites(_compositeId));
    }
}
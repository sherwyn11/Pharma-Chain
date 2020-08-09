pragma solidity ^0.6.6;


contract Product {

    struct product {
        bool isUidGenerated;
        string itemName;
        uint locationNo;
        uint compositeNo;
        string statusMessage;
        uint statusNo;
    }

    struct location {
        string latitude;
        string longitude;
    }

    struct composites {
        uint uniqueId;
    }

    mapping (address => product) public productMap;
    mapping (address => mapping (uint => location)) public locationMap;
    mapping (address => mapping (uint => composites)) public compositeMap;

    constructor() public {}

    function createProduct(string memory _itemName, string memory _latitude, string memory _longitude) public returns(address) {
        address uniqueId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        productMap[uniqueId].isUidGenerated = true;
        productMap[uniqueId].itemName = _itemName;
        productMap[uniqueId].locationNo = 1;
        productMap[uniqueId].statusMessage = 'Product Created!';
        productMap[uniqueId].statusNo = 0;
        productMap[uniqueId].compositeNo = 0;

        locationMap[uniqueId][0] = location(_latitude, _longitude);

        return uniqueId;
    }

    function updateProductStatus(address uniqueId, uint _no, string memory _status, string memory _latitude, string memory _longitude) returns(string memory){
        productMap[uniqueId].status = _no;
        productMap[uniqueId].statusMessage = _status;
        locationMap[uniqueId][productMap[uniqueId].locationNo] = location(_latitude, _longitude);
        productMap[uniqueId].locationNo += 1;
        
        return 'Status updated sucessfully!';
    }

    function addComposite(address uniqueId, address _compositeId) {
        productMap[uniqueId][productMap[uniqueId].compositeNo] = composites(_compositeId);
        productMap[uniqueId].composite += 1;
    }
}
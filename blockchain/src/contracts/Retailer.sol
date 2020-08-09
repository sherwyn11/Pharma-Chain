pragma solidity ^0.6.6;


contract Retailer {

    struct retailer {
        string locationAddress;
        string retailerName;
        address rid;
        uint pNo; 
    }

    mapping (address => retailer) public retailerMap;
    mapping (address => mapping (uint => address)) public retailProductMap;

    constructor() public {}

    function createRetailer(string mexmory _name, string memory _addressName) public {
        address _rid = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        retailerMap[msg.sender] = retailer(_addressName, _name, _rid, 0);
    }

    function addProductToRetailer(string memory _itemName, string memory _latitude, string memory _longitude, uint _quantity) public returns(address) {
        address _id = createProduct(_itemName, _latitude, _longitude, _quantity);
        retailProductMap[msg.sender][retailerMap[msg.sender].pNo] = _id;
        retailerMap[msg.sender].pNo += 1;

        return _id;
    }
}
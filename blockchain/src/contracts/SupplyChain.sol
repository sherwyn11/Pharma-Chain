pragma solidity ^0.6.6;

import './Manufacturer.sol';
import './Product.sol';

contract SupplyChain is Manufacturer {
    
    address Owner;
    
    struct orders {
        bool isUidGenerated;
        address itemid;
        string itemname;
        string transitstatus;
        uint orderstatus; /// 1 -> Order Recieved, 2 -> Order Shipped, 3 -> Order Delivered, 4 -> Order Cancelled
        address customer;
        uint ordertime;
        uint quantity;
        
        address carrier1;
        uint carrier1_time;
        
        address carrier2;
        uint carrier2_time;
        
        address carrier3;
        uint carrier3_time;
        
    }
    
    mapping(address => orders) public orderMap;
    mapping(address => bool) public carriers;
    
    constructor() public {
        Owner = msg.sender;
    }
    
    modifier onlyOwner(){
        require(Owner == msg.sender);
        _;
    }
    
    function ManageCarriers(address _carrierAddress) onlyOwner public returns(string memory){
        if(!carriers[_carrierAddress]){
            carriers[_carrierAddress] = true;
        }else{
            carriers[_carrierAddress] = false;
        }
        
        return "Carrier status is updated!";
    }

    function CancelOrder(address _orderId) public returns (string memory){
        require(orderMap[_orderId].isUidGenerated);
        require(orderMap[_orderId].customer == msg.sender);
        
        orderMap[_orderId].orderstatus = 4;
        orderMap[_orderId].transitstatus = "Order cancelled!";
        
        return "Order cancelled!";
    }
    
    function Carrier1Report(address _orderId, string memory _transitStatus) public{
        require(orderMap[_orderId].isUidGenerated);
        require(carriers[msg.sender]);
        require(orderMap[_orderId].orderstatus == 1);
        
        orderMap[_orderId].transitstatus = _transitStatus;
        orderMap[_orderId].carrier1 = msg.sender;
        orderMap[_orderId].carrier1_time = now;
        orderMap[_orderId].orderstatus = 2;
        
    }
    
    function Carrier2Report(address _orderId, string memory _transitStatus) public{
        require(orderMap[_orderId].isUidGenerated);
        require(carriers[msg.sender]);
        require(orderMap[_orderId].orderstatus == 2);
        
        orderMap[_orderId].transitstatus = _transitStatus;
        orderMap[_orderId].carrier2 = msg.sender;
        orderMap[_orderId].carrier2_time = now;

    }
    
    function Carrier3Report(address _orderId, string memory _transitStatus)public{
        require(orderMap[_orderId].isUidGenerated);
        require(carriers[msg.sender]);
        require(orderMap[_orderId].orderstatus == 2);
        
        orderMap[_orderId].transitstatus = _transitStatus;
        orderMap[_orderId].carrier3 = msg.sender;
        orderMap[_orderId].carrier3_time = now;
        orderMap[_orderId].orderstatus = 3;
        
    }

    
    function orderItem(uint _itemId, uint _quantity, string memory _itemname, address _manufacturerAddress) public returns(address) {
        address orderId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        
        orderMap[orderId].isUidGenerated = true;
        orderMap[orderId].itemid = _itemId;
        orderMap[orderId].quantity = _quantity;
        orderMap[orderId].itemname = _itemname;
        orderMap[orderId].transitstatus = "Your order is recieved and is under process!";
        orderMap[orderId].orderstatus = 1;
        orderMap[orderId].customer = msg.sender;
        orderMap[orderId].ordertime = now;

        productMap[_itemId].quantityMg -= _quantity; 

        return orderId;
    }    
}
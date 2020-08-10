pragma solidity ^0.6.6;

import './Manufacturer.sol';
import './Distributor.sol';
import './Product.sol';

contract SupplyChain is Manufacturer, Distributor {
    
    address Owner;
    
    struct orders {
        bool isUidGenerated;
        address itemid;
        string itemname;
        string transitstatus;
        uint orderstatus; /// 1 -> Order Recieved, 2->Confirmed, 3 -> Order Shipped, 4 -> Order Delivered, 5 -> Order Cancelled
        address customer;
        uint ordertime;
        uint quantity;
        address manufacturerAddress;
        uint distributorCount;
    }
    
    mapping (address => orders) public orderMap;
    mapping (address => mapping (uint => address)) public carriers;
    
    constructor() public {
        Owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(Owner == msg.sender);
        _;
    }
    
    modifier checkUser(address addr) {
        require(addr == msg.sender);
        _;
    }
    

    function manageDistributors(address _orderId, address _nextDistributor) public checkUser(carriers[_orderId][orderMap[_orderId].distributorCount - 1]) returns(string memory) {
        carriers[_orderId][orderMap[_orderId].distributorCount] = _nextDistributor;
        orderMap[_orderId].distributorCount += 1;
        
        return 'Distributor added for product!';
    }
    
    
    
    function confirmOrder(address _orderId) public checkUser(orderMap[_orderId].manufacturerAddress) returns(string memory){
        orderMap[_orderId].orderstatus = 1;
        orderMap[_orderId].transitstatus = "Order Confirmed";
        orderMap[_orderId].distributorCount = 1;
        
        carriers[_orderId][0] = msg.sender; 
            
        return 'Order Confirmed!';
    }

    
    function orderItem(address _itemId, uint _quantity, string memory _itemname, address _manufacturerAddress) public returns(address) {
        address orderId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        
        orderMap[orderId].isUidGenerated = true;
        orderMap[orderId].itemid = _itemId;
        orderMap[orderId].quantity = _quantity;
        orderMap[orderId].itemname = _itemname;
        orderMap[orderId].transitstatus = "Your order is recieved!";
        orderMap[orderId].orderstatus = 0;
        orderMap[orderId].customer = msg.sender;
        orderMap[orderId].ordertime = now;
        orderMap[orderId].manufacturerAddress = _manufacturerAddress;
        
        productMap[_itemId].quantityMg -= _quantity; 

        return orderId;
    }    
}
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;


import './Manufacturer.sol';
import './Distributor.sol';
import './Customer.sol';
import './Product.sol';

contract SupplyChain is Manufacturer, Distributor, Customer {
    
    address Owner;
    
    struct location {
        string latitude;
        string longitude;
    }
    
    struct orders {
        bool isUidGenerated;
        address itemid;
        string itemname;
        string transitstatus;
        uint orderstatus; /// 1 -> Order Recieved, 2 -> Confirmed, 3 -> Order Shipped, 4 -> Order Delivered, 5 -> Order Cancelled
        address customer;
        uint ordertime;
        uint quantity;
        address manufacturerAddress;
        uint distributorCount;
        location[] locationsArr;
    }
    
    mapping (address => orders) public orderMap;
    mapping (address => mapping (uint => address)) public carriers;
    // mapping (address => mapping (uint => location)) public locationMap;

    
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
    
    function orderItem(address _itemId, uint _quantity, string memory _itemname, address _manufacturerAddress) public returns(address) {
        address orderId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        
        orderMap[orderId].isUidGenerated = true;
        orderMap[orderId].itemid = _itemId;
        orderMap[orderId].quantity = _quantity;
        orderMap[orderId].itemname = _itemname;
        orderMap[orderId].transitstatus = "Your order is recieved!";
        orderMap[orderId].orderstatus = 1;
        orderMap[orderId].customer = msg.sender;
        orderMap[orderId].ordertime = now;
        orderMap[orderId].manufacturerAddress = _manufacturerAddress;
        
        productMap[_itemId].quantityMg -= _quantity;
        customerOrders[msg.sender][customerMap[msg.sender].ordersCount] = orderId;
        customerMap[msg.sender].ordersCount += 1;

        return orderId;
    }
    
    function confirmOrder(address _orderId, string memory _latitude, string memory _longitude) public checkUser(orderMap[_orderId].manufacturerAddress) returns(string memory){
        require(orderMap[_orderId].orderstatus == 1);
        
        orderMap[_orderId].orderstatus = 2;
        orderMap[_orderId].transitstatus = "Order Confirmed";
        orderMap[_orderId].distributorCount = 1;
        orderMap[_orderId].locationsArr.push(location(_latitude, _longitude));
        
        carriers[_orderId][0] = msg.sender; 
            
        return 'Order Confirmed!';
    }

    function manageDistributors(address _orderId, address _nextDistributor) public checkUser(carriers[_orderId][orderMap[_orderId].distributorCount - 1]) returns(string memory) {
        carriers[_orderId][orderMap[_orderId].distributorCount] = _nextDistributor;
        orderMap[_orderId].distributorCount += 1;
        orderMap[_orderId].orderstatus = 3;
        
        return 'Distributor added for product!';
    }
    
    // function updateProductStatus(address _orderId, string memory _status, string memory _latitude, string memory _longitude)public returns(string memory){
    //     orderMap[uniqueId].statusNo = _no;
    //     orderMap[uniqueId].statusMessage = _status;
    //     // locationMap[uniqueId][productMap[uniqueId].locationNo] = location(_latitude, _longitude);
    //     productMap[uniqueId].locationNo += 1;
        
    //     return 'Status updated sucessfully!';
    // }
    
    function getLocations(address _orderId) public view returns (string[] memory) {
        string[] memory ret = new string[](orderMap[_orderId].locationsArr.length);
        for (uint i = 0; i < orderMap[_orderId].locationsArr.length; i++) {
            ret[i] = orderMap[_orderId].locationsArr[i].latitude;
        }
        return ret;
    }
   
}
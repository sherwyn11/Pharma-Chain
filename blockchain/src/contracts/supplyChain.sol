pragma solidity ^0.6.6;

contract Logistics {
    
    address Owner;
    
    struct package{
        bool isUidGenerated;
        uint itemid;
        string itemname;
        string transitstatus;
        uint orderstatus;
        
        address customer;
        uint ordertime;
        
        address carrier1;
        uint carrier1_time;
        
        address carrier2;
        uint carrier2_time;
        
        address carrier3;
        uint carrier3_time;
        
    }
    
    mapping(address => package) public packageMapping;
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

    function CancelOrder(address _uniqueId) public returns (string memory){
        require(packageMapping[_uniqueId].isUidGenerated);
        require(packageMapping[_uniqueId].customer == msg.sender);
        
        packageMapping[_uniqueId].orderstatus = 4;
        packageMapping[_uniqueId].transitstatus = "Order cancelled!";
        
        return "Order cancelled!";
    }
    
    function Carrier1Report(address _uniqueId, string memory _transitStatus) public{
        require(packageMapping[_uniqueId].isUidGenerated);
        require(carriers[msg.sender]);
        require(packageMapping[_uniqueId].orderstatus == 1);
        
        packageMapping[_uniqueId].transitstatus = _transitStatus;
        packageMapping[_uniqueId].carrier1 = msg.sender;
        packageMapping[_uniqueId].carrier1_time = now;
        packageMapping[_uniqueId].orderstatus = 2;
        
    }
    
    function Carrier2Report(address _uniqueId, string memory _transitStatus) public{
        require(packageMapping[_uniqueId].isUidGenerated);
        require(carriers[msg.sender]);
        require(packageMapping[_uniqueId].orderstatus == 2);
        
        packageMapping[_uniqueId].transitstatus = _transitStatus;
        packageMapping[_uniqueId].carrier2 = msg.sender;
        packageMapping[_uniqueId].carrier2_time = now;

    }
    
    function Carrier3Report(address _uniqueId, string memory _transitStatus)public{
        require(packageMapping[_uniqueId].isUidGenerated);
        require(carriers[msg.sender]);
        require(packageMapping[_uniqueId].orderstatus == 2);
        
        packageMapping[_uniqueId].transitstatus = _transitStatus;
        packageMapping[_uniqueId].carrier3 = msg.sender;
        packageMapping[_uniqueId].carrier3_time = now;
        packageMapping[_uniqueId].orderstatus = 3;
        
    }

    
    function OrderItem(uint _itemid, string memory _itemname) public returns(address){
        address uniqueId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        
        packageMapping[uniqueId].isUidGenerated = true;
        packageMapping[uniqueId].itemid = _itemid;
        packageMapping[uniqueId].itemname = _itemname;
        packageMapping[uniqueId].transitstatus = "Your package is ordered and is under process!";
        packageMapping[uniqueId].orderstatus = 1;
        
        packageMapping[uniqueId].customer = msg.sender;
        packageMapping[uniqueId].ordertime = now;
    
        return uniqueId;
    }    
}
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;


import './RawMaterial.sol';
import './Supplier.sol';
import './Transporter.sol';
import './Manufacturer.sol';
// import './Medicine.sol';
// import './Product.sol';



//// New supply chain : supplier -> transporter -> manufacturer -> transporter -> whole-saler -> transporter -> distributor -> transporter -> customer/hospital/pharmacy


contract SupplyChain is Supplier, Transporter, Manufacturer {
    
    address Owner;
    
    // struct location {
    //     string latitude;
    //     string longitude;
    // }
    
    // struct orders {
    //     bool isUidGenerated;
    //     address itemid;
    //     string itemname;
    //     string transitstatus;
    //     uint orderstatus; /// 1 -> Order Recieved, 2 -> Confirmed, 3 -> Order Shipped, 4 -> Order Delivered, 5 -> Order Cancelled
    //     address customer;
    //     uint ordertime;
    //     uint deliverytime;
    //     uint quantity;
    //     address manufacturerAddress;
    //     uint distributorCount;
    //     location[] locationsArr;
    //     bytes32 uniqueHash;
    // }
    
    // mapping (address => orders) public orderMap;
    // mapping (address => mapping (uint => address)) public carriers;
    
    
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
    
    enum roles {
        noRole,
        supplier,
        transporter,
        manufacturer,
        wholesaler,
        distributor,
        customer
    }
    
    
    //////////////// Events ////////////////////
    
    event UserRegister(address indexed _address, bytes32 name);
    
    
    /////////////// Users (Only Owner Executable) //////////////////////
    
    struct userData {
        bytes32 name;
        uint[] userLoc;
        roles role;
        address userAddr;
    }
    
    mapping (address => userData) public userInfo;
    
    function registerUser(bytes32 name, uint[] memory loc, uint role, address _userAddr) public onlyOwner {
        userInfo[_userAddr].name = name;
        userInfo[_userAddr].userLoc = loc;
        userInfo[_userAddr].role = roles(role);
        userInfo[_userAddr].userAddr = _userAddr;
        
        emit UserRegister(_userAddr, name);
    }
    
    function changeUserRole(uint _role, address _addr) public onlyOwner returns(string memory) {
        userInfo[_addr].role = roles(_role);
       return "Role Updated!";
    }
    
    function getUserInfo(address _address) public view returns(
        bytes32,
        uint[] memory,
        address,
        roles
        ) {
        return (
            userInfo[_address].name,
            userInfo[_address].userLoc,
            userInfo[_address].userAddr,
            userInfo[_address].role
        );
    }
    

    /////////////// Supplier //////////////////////
    
    
    function supplierCreatesRawPackage(
        bytes32 _description,
        uint[] memory _locationArr,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
        ) public {
            
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
        
        createRawMaterialPackage(
            _description,
            _locationArr,
            _quantity,
            _transporterAddr,
            _manufacturerAddr
        );
    }
    
    function supplierGetPackageCount() public view returns(uint) {
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
        
        return getNoOfPackagesOfSupplier();
    }
    
    function supplierGetRawMaterialAddresses() public returns(address[] memory) {
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
        
        address[] memory ret = getAllPackages();
        return ret;
    }
    
    
    ///////////////  Transporter ///////////////
    
    
    function transporterHandlePackage(
        address _address,
        uint transporterType
        ) public {
            
        require(
            userInfo[msg.sender].role == roles.transporter,
            "Only Transporter can call this function"
        );
        require(
            transporterType > 0,
            "Transporter Type is incorrect"
        );
        
        handlePackage(_address, transporterType);
    }
    
    
    ///////////////  Manufacturer ///////////////
    
    
    function manufacturerRecivedRawMaterials(address _addr) public {
        require(userInfo[msg.sender].role == roles.manufacturer, "Only Manufacturer can access this function");
        manufacturerReceivedPackage(_addr, msg.sender);
    }
    
    function manufacturerCreatesNewMedicine(
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address _transporterAddr,
        address _receiverAddr,
        uint RcvrType
        ) public returns(string memory){
            
        require(userInfo[msg.sender].role == roles.manufacturer, "Only Manufacturer can create Medicine");
        require(RcvrType != 0, "Reciever Type should be defined");
        
        manufacturerCreatesMedicine(
            msg.sender,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr,
            _receiverAddr,
            RcvrType
        );
        
        return "Medicine created!";
    }

}    
    ////// My code ////////

    
//     function orderItem(address _itemId, uint _quantity, string memory _itemname, address _manufacturerAddress) public returns(address) {
//         address orderId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        
//         orderMap[orderId].isUidGenerated = true;
//         orderMap[orderId].itemid = _itemId;
//         orderMap[orderId].quantity = _quantity;
//         orderMap[orderId].itemname = _itemname;
//         orderMap[orderId].transitstatus = "Your order is recieved!";
//         orderMap[orderId].orderstatus = 1;
//         orderMap[orderId].customer = msg.sender;
//         orderMap[orderId].ordertime = now;
//         orderMap[orderId].manufacturerAddress = _manufacturerAddress;
//         // orderMap[orderId].uniqueHash = sha256(abi.encodePacked())
        
//         productMap[_itemId].quantityMg -= _quantity;
//         customerOrders[msg.sender][customerMap[msg.sender].ordersCount] = orderId;
//         customerMap[msg.sender].ordersCount += 1;

//         return orderId;
//     }
    
    
//     function confirmOrder(address _orderId, string memory _latitude, string memory _longitude) public checkUser(orderMap[_orderId].manufacturerAddress) returns(string memory){
//         require(orderMap[_orderId].orderstatus == 1);
        
//         orderMap[_orderId].orderstatus = 2;
//         orderMap[_orderId].transitstatus = "Order Confirmed";
//         orderMap[_orderId].distributorCount = 1;
//         orderMap[_orderId].locationsArr.push(location(_latitude, _longitude));
        
//         carriers[_orderId][0] = msg.sender; 
            
//         return 'Order Confirmed!';
//     }



//     function transferOwnershipOfOrder(address _orderId, address _nextDistributor) public checkUser(carriers[_orderId][orderMap[_orderId].distributorCount - 1]) returns(string memory) {
//         require(orderMap[_orderId].orderstatus < 4);
        
//         carriers[_orderId][orderMap[_orderId].distributorCount] = _nextDistributor;
//         orderMap[_orderId].distributorCount += 1;
        
//         if (orderMap[_orderId].customer == _nextDistributor){
//             orderMap[_orderId].orderstatus = 4;
//             orderMap[_orderId].transitstatus = 'Order Delivered!';
//             orderMap[_orderId].deliverytime = now;
//         }else{
//             orderMap[_orderId].orderstatus = 3;
//             orderMap[_orderId].transitstatus = 'Order in transit!';
//         }
        
//         return 'Distributor added for product!';
//     }
    
    
//     function ownerCreateManufacturer(address _addr, string memory _name, string memory _addressName) public onlyOwner returns(string memory) {
//         createManufacturer(_addr, _name, _addressName);
        
//         return 'Manufacturer created successfully!';
//     }
    
    
//     function ownerCreateDistributor(address _addr, string memory _distributorName, string memory _distributorContact) public onlyOwner returns(string memory) {
//         createDistributor(_addr, _distributorName, _distributorContact);
        
//         return 'Distributor created successfully!';
//     }
    
    
//     function updateOrderStatus(address _orderId, string memory _latitude, string memory _longitude)public returns(string memory){
//         orderMap[_orderId].locationsArr.push(location(_latitude, _longitude));
        
//         return 'Status updated sucessfully!';
//     }
    
    
//     function getLocations(address _orderId) public view returns (string[] memory) {
//         string[] memory ret = new string[](orderMap[_orderId].locationsArr.length);
//         for (uint i = 0; i < orderMap[_orderId].locationsArr.length; i++) {
//             ret[i] = orderMap[_orderId].locationsArr[i].latitude;
//         }
//         return ret;
//     }
    
    
//     function cancelOrder(address _orderId) public checkUser(orderMap[_orderId].customer) returns(string memory){
//         require(orderMap[_orderId].orderstatus < 3);
        
//         orderMap[_orderId].orderstatus = 5;
//         orderMap[_orderId].transitstatus = 'Order Cancelled Successfully!';
        
//         return orderMap[_orderId].transitstatus;
//     }
   
// }
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;


import './RawMaterial.sol';
import './Supplier.sol';
import './Transporter.sol';

//// New supply chain : supplier -> transporter -> manufacturer -> transporter -> whole-saler -> transporter -> distributor -> transporter -> customer/hospital/pharmacy


contract SupplyChain is Supplier, Transporter {
    
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
    
}   
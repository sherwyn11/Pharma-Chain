pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import './RawMaterial.sol';
import './Supplier.sol';
import './Transporter.sol';
import './Medicine.sol';
import './Manufacturer.sol';
import './MedicineW_D.sol';
import './Wholesaler.sol';
import './MedicineD_C.sol';
import './Distributor.sol';
import './Customer.sol';


//// New supply chain : supplier -> transporter -> manufacturer -> transporter -> whole-saler -> transporter -> distributor -> transporter -> customer/hospital/pharmacy


contract SupplyChain is Supplier, Transporter, Manufacturer, Wholesaler, Distributor, Customer {
    
    address public Owner;
    
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
    event buyEvent(address buyer, address seller, address packageAddr, bytes32 signature, uint indexed now);
    event respondEvent(address buyer, address seller, address packageAddr, bytes32 signature, uint indexed now);
    event sendEvent(address seller, address buyer, address packageAddr, bytes32 signature, uint indexed now);
    event receivedEvent(address buyer, address seller, address packageAddr, bytes32 signature, uint indexed now);
    
    /////////////// Users (Only Owner Executable) //////////////////////
    
    struct userData {
        bytes32 name;
        string[] userLoc;
        roles role;
        address userAddr;
    }
    
    mapping (address => userData) public userInfo;
    
    function registerUser(bytes32 name, string[] memory loc, uint role, address _userAddr) external onlyOwner {
        userInfo[_userAddr].name = name;
        userInfo[_userAddr].userLoc = loc;
        userInfo[_userAddr].role = roles(role);
        userInfo[_userAddr].userAddr = _userAddr;
        
        emit UserRegister(_userAddr, name);
    }
    
    function changeUserRole(uint _role, address _addr) external onlyOwner returns(string memory) {
        userInfo[_addr].role = roles(_role);
       return "Role Updated!";
    }
    
    function getUserInfo(address _address) external view onlyOwner returns(
        userData memory
        ) {
        return userInfo[_address];
    }
    

    /////////////// Supplier //////////////////////
    
    
    function supplierCreatesRawPackage(
        bytes32 _description,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
        ) external {
            
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
        
        createRawMaterialPackage(
            _description,
            _quantity,
            _transporterAddr,
            _manufacturerAddr
        );
    }
    
    function supplierGetPackageCount() external view returns(uint) {
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
        
        return getNoOfPackagesOfSupplier();
    }
    
    function supplierGetRawMaterialAddresses() external view returns(address[] memory) {
        address[] memory ret = getAllPackages();
        return ret;
    }
    
    
    ///////////////  Transporter ///////////////
    
    
    function transporterHandlePackage(
        address _address,
        uint transporterType,
        address cid
        ) external {
            
        require(
            userInfo[msg.sender].role == roles.transporter,
            "Only Transporter can call this function"
        );
        require(
            transporterType > 0,
            "Transporter Type is incorrect"
        );
        
        handlePackage(_address, transporterType, cid);
    }
    
    
    ///////////////  Manufacturer ///////////////
    
    
    function manufacturerReceivedRawMaterials(address _addr) external {
        require(userInfo[msg.sender].role == roles.manufacturer, "Only Manufacturer can access this function");
        manufacturerReceivedPackage(_addr, msg.sender);
    }
    
    function manufacturerCreatesNewMedicine(
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr,
        address _receiverAddr,
        uint RcvrType
        ) external returns(string memory){
            
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
    

    ///////////////  Wholesaler  ///////////////

    
    function wholesalerReceivedMedicine(
        address _address
        ) external {
        require(
            userInfo[msg.sender].role == roles.wholesaler || userInfo[msg.sender].role == roles.distributor,
            "Only Wholesaler and Distributor can call this function"
        );
        
        medicineRecievedAtWholesaler(
            _address
        );
    }
    
    function transferMedicineW_D(
        address _address,
        address transporter,
        address receiver) external {
        require(
            userInfo[msg.sender].role == roles.wholesaler &&
            msg.sender == Medicine(_address).getWDC()[0],
            "Only Wholesaler or current owner of package can call this function"
        );
        
        transferMedicineWtoD(
            _address,
            transporter,
            receiver
        );
    }
    
    function getBatchIdByIndexWD(uint index) external view returns(address packageID) {
        require(
            userInfo[msg.sender].role == roles.wholesaler,
            "Only Wholesaler Can call this function."
        );
        return MedicineWtoD[msg.sender][index];
    }

    function getSubContractWD(address _address) external view returns (address SubContractWD) {
        return MedicineWtoDTxContract[_address];
    }


    ///////////////  Distributor  ///////////////


    function distributorReceivedMedicine(
      address _address,
      address cid
    ) external {
        require(
            userInfo[msg.sender].role == roles.distributor &&
            msg.sender == Medicine(_address).getWDC()[1],
            "Only Distributor or current owner of package can call this function"  
        );
        
        medicineRecievedAtDistributor(
            _address,
            cid
        );
    }

    function distributorTransferMedicinetoCustomer(
        address _address,
        address transporter,
        address receiver
    ) external {
        require(
            userInfo[msg.sender].role == roles.distributor &&
            msg.sender == Medicine(_address).getWDC()[1],
            "Only Distributor or current owner of package can call this function"
        );
        transferMedicineDtoC(_address, transporter, receiver);
    }
    
    function getBatchesCountDC() external view returns (uint count){
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only Distributor Can call this function."
        );
        return MedicineDtoC[msg.sender].length;
    }

    function getBatchIdByIndexDC(uint index) external view returns(address packageID) {
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only Distributor Can call this function."
        );
        return MedicineDtoC[msg.sender][index];
    }

    function getSubContractDC(address _address) external view returns (address SubContractDP) {
        return MedicineDtoCTxContract[_address];
    }
    
    
    ///////////////  Customer  ///////////////
    
    
    function customerReceivedMedicine(
        address _address,
        address cid
    ) external {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only Customer Can call this function."
        );
        medicineRecievedAtCustomer(_address, cid);
    }

    function updateStatus(
        address _address,
        uint Status
    ) external {
        require(
            userInfo[msg.sender].role == roles.customer &&
            msg.sender == Medicine(_address).getWDC()[2],
            "Only Customer or current owner of package can call this function"
        );
        require(sale[_address] == salestatus(1), "Medicine Must be at Customer");
        
        updateSaleStatus(_address, Status);
    }

    function getSalesInfo(
        address _address
    ) external
    view
    returns(
        uint Status 
    ){
        return salesInfo(_address);
    }

    
    function getBatchesCountC() external view returns(uint count) {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only Wholesaler or current owner of package can call this function"
        );
        return  MedicineBatchAtCustomer[msg.sender].length;
    }

    function getBatchIdByIndexC(uint index) external view returns(address _address) {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only Wholesaler or current owner of package can call this function"
        );
        return MedicineBatchAtCustomer[msg.sender][index];
    }
    
    // function verify(address p, bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns(bool) {
    //     return ecrecover(hash, v, r, s) == p;
    // }
}    
    
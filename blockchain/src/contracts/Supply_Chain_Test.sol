pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;


import './RawMaterial.sol';
import './Medicine.sol';
import './MedicineW_D.sol';
import './MedicineD_C.sol';

//// New supply chain : supplier -> transporter -> manufacturer -> transporter -> whole-saler -> transporter -> distributor -> transporter -> customer/hospital/pharmacy


contract SupplyChain {
    
    address Owner;
    
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
    
    mapping (address => address[]) public supplierRawMaterials;

    
    function supplierCreatesRawPackage(
        bytes32 _description,
        uint[] memory _locationArr,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
        ) public {
            
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");


        RawMaterial rawMaterial = new RawMaterial(
            msg.sender,
            address(bytes20(sha256(abi.encodePacked(msg.sender, now)))),
            _description,
            _locationArr,
            _quantity,
            _transporterAddr,
            _manufacturerAddr
        );
        
        supplierRawMaterials[msg.sender].push(address(rawMaterial));
    }
    
    function supplierGetPackageCount() public view returns(uint) {
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
        
        return supplierRawMaterials[msg.sender].length;
    }
    
    function supplierGetRawMaterialAddresses() public returns(address[] memory) {
        uint len = supplierRawMaterials[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = supplierRawMaterials[msg.sender][i];
        }
        return ret;
    }
    
    
    ///////////////  Transporter ///////////////
    
    
    function transporterHandlePackage(
        address _addr,
        uint transportertype,
        address cid
        ) public {
            
        require(
            userInfo[msg.sender].role == roles.transporter,
            "Only Transporter can call this function"
        );
        require(
            transportertype > 0,
            "Transporter Type is incorrect"
        );
        
        if(transportertype == 1) { 
            /// Supplier -> Manufacturer
            RawMaterial(_addr).pickPackage(msg.sender);
        } else if(transportertype == 2) { 
            /// Manufacturer -> Wholesaler
            Medicine(_addr).pickMedicine(msg.sender);
        } else if(transportertype == 3) {   
            // Wholesaler to Distributer
            MedicineW_D(cid).pickWD(_addr, msg.sender);
        } else if(transportertype == 4) {   
            // Distrubuter to Customer
            MedicineD_C(cid).pickDC(_addr, msg.sender);
        }    
            
    }
    
    
    ///////////////  Manufacturer ///////////////
    
    
    mapping (address => address[]) public manufacturerRawMaterials;
    mapping (address => address[]) public manufacturerMedicines;

    
    function manufacturerRecivedRawMaterials(address _addr) public {
        require(userInfo[msg.sender].role == roles.manufacturer, "Only Manufacturer can access this function");
        RawMaterial(_addr).receivedPackage(msg.sender);
        manufacturerRawMaterials[msg.sender].push(_addr);
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
        
        Medicine _medicine = new Medicine(
            msg.sender,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr,
            _receiverAddr,
            RcvrType
        );
        
        manufacturerMedicines[msg.sender].push(address(_medicine));
        
        return "Medicine created!";
    }
    

    ///////////////  Wholesaler  ///////////////

    mapping(address => address[]) public MedicinesAtWholesaler;
    mapping(address => address[]) public MedicineWtoD;
    mapping(address => address) public MedicineWtoDTxContract;

    
    function wholesalerReceivesMedicine(
        address _address,
        address cid
        ) public {
        require(
            userInfo[msg.sender].role == roles.wholesaler || userInfo[msg.sender].role == roles.distributor,
            "Only Wholesaler and Distributor can call this function"
        );
        
        uint rtype = Medicine(_address).receivedMedicine(msg.sender);
        if(rtype == 1){
            MedicinesAtWholesaler[msg.sender].push(_address);
        }else if(rtype == 2){
            MedicinesAtWholesaler[msg.sender].push(_address);
            if(Medicine(_address).getWDC()[0] != address(0)){
                MedicineW_D(cid).receiveWD(_address, msg.sender);
            }
        }
    }
    
    function transferMedicineW_D(
        address _address,
        address transporter,
        address receiver) public {
        require(
            userInfo[msg.sender].role == roles.wholesaler &&
            msg.sender == Medicine(_address).getWDC()[0],
            "Only Wholesaler or current owner of package can call this function"
        );
        
        MedicineW_D wd = new MedicineW_D(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        MedicineWtoD[msg.sender].push(address(wd));
        MedicineWtoDTxContract[_address] = address(wd);
    }
    
    function getBatchIdByIndexWD(uint index) public view returns(address packageID) {
        require(
            userInfo[msg.sender].role == roles.wholesaler,
            "Only Wholesaler Can call this function."
        );
        return MedicineWtoD[msg.sender][index];
    }

    function getSubContractWD(address _address) public view returns (address SubContractWD) {
        return MedicineWtoDTxContract[_address];
    }


    ///////////////  Distributor  ///////////////

    
    mapping(address => address[]) MedicineBatchAtDistributor;
    mapping(address => address[]) MedicineDtoC;
    mapping(address => address) MedicineDtoCTxContract;


    function transferMedicineDtoC(
        address _address,
        address transporter,
        address receiver
    ) public {
        require(
            userInfo[msg.sender].role == roles.distributor &&
            msg.sender == Medicine(_address).getWDC()[1],
            "Only Distributor or current owner of package can call this function"
        );

        MedicineD_C dp = new MedicineD_C(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        MedicineDtoC[msg.sender].push(address(dp));
        MedicineDtoCTxContract[_address] = address(dp);
    }    
        
    
    function getBatchesCountDC() public view returns (uint count){
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only Distributor Can call this function."
        );
        return MedicineDtoC[msg.sender].length;
    }

    function getBatchIdByIndexDC(uint index) public view returns(address packageID) {
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only Distributor Can call this function."
        );
        return MedicineDtoC[msg.sender][index];
    }

    function getSubContractDC(address _address) public view returns (address SubContractDP) {
        return MedicineDtoCTxContract[_address];
    }
    
    
    ///////////////  Customer  ///////////////
    
    
    mapping(address => address[]) public MedicineBatchAtCustomer;
    mapping(address => salestatus) public sale;

    enum salestatus {
        notfound,
        atcustomer,
        sold,
        expired,
        damaged
    }

    event MedicineStatus(
        address _address,
        address indexed Customer,
        uint status
    );

    function medicineRecievedAtCustomer(
        address _address,
        address cid
    ) public {
        MedicineD_C(cid).receiveDC(_address, msg.sender);
        MedicineBatchAtCustomer[msg.sender].push(_address);
        sale[_address] = salestatus(1);
    }

    function updateSaleStatus(
        address _address,
        uint Status
    ) public {
        sale[_address] = salestatus(Status);
        emit MedicineStatus(_address, msg.sender, Status);
    }

    function salesInfo(
        address _address
    ) public
    view
    returns(
        uint Status
    ){
        return uint(sale[_address]);
    }
}    
    
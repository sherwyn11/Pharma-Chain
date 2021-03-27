pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import './RawMaterial.sol';
// import './Supplier.sol';
// import './Transporter.sol';
import './Medicine.sol';
// import './Manufacturer.sol';
import './MedicineW_D.sol';
// import './Wholesaler.sol';
import './MedicineD_C.sol';
// import './Distributor.sol';
// import './Customer.sol';


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
    event buyEvent(address buyer, address indexed seller, address packageAddr, bytes signature, uint indexed timestamp);
    event respondEvent(address indexed buyer, address seller, address packageAddr, bytes signature, uint indexed timestamp);
    event sendEvent(address seller, address buyer, address indexed packageAddr, bytes signature, uint indexed timestamp);
    event receivedEvent(address indexed buyer, address seller, address packageAddr, bytes signature, uint indexed timestamp);
    
    
    //////////////// Event functions (All entities) ////////////////////

    
    function requestProduct(address buyer, address seller, address packageAddr, bytes memory signature) public {
        emit buyEvent(buyer, seller, packageAddr, signature, now);
    }
    
    function respondToEntity(address buyer, address seller, address packageAddr, bytes memory signature) public {
        emit respondEvent(buyer, seller, packageAddr, signature, now);
    }
    
    function sendPackageToEntity(address buyer, address seller, address packageAddr, bytes memory signature) public {
        emit sendEvent(seller, buyer, packageAddr, signature, now);
    }
    
    /////////////// Users (Only Owner Executable) //////////////////////
    
    struct userData {
        bytes32 name;
        string[] userLoc;
        roles role;
        address userAddr;
    }
    
    mapping (address => userData) public userInfo;
    
    function registerUser(bytes32 name, string[] memory loc, uint role, address _userAddr) public onlyOwner {
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
        userData memory
        ) {
        return userInfo[_address];
    }
    

    /////////////// Supplier //////////////////////
    
    mapping (address => address[]) public supplierRawMaterials;
    
    
    function createRawMaterialPackage(
        bytes32 _description,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
    ) public returns(address) {

        RawMaterial rawMaterial = new RawMaterial(
            msg.sender,
            address(bytes20(sha256(abi.encodePacked(msg.sender, now)))),
            _description,
            _quantity,
            _transporterAddr,
            _manufacturerAddr
        );
        
        supplierRawMaterials[msg.sender].push(address(rawMaterial));
        return address(rawMaterial);
    }
    
    function getNoOfPackagesOfSupplier() public view returns(uint) {
        return supplierRawMaterials[msg.sender].length;
    }
    
    
    function getAllPackages() public view returns(address[] memory) {
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
            // Wholesaler to Distributor
            MedicineW_D(cid).pickWD(_addr, msg.sender);
        } else if(transportertype == 4) {   
            // Distrubutor to Customer
            MedicineD_C(cid).pickDC(_addr, msg.sender);
        }
    }
    
    
    ///////////////  Manufacturer ///////////////
    
    mapping (address => address[]) public manufacturerRawMaterials;
    mapping (address => address[]) public manufacturerMedicines;
    
    
    function manufacturerReceivedPackage(
        address _addr,
        address _manufacturerAddress,
        address _sellerAddr,
        bytes memory signature
        ) public {
            
        RawMaterial(_addr).receivedPackage(_manufacturerAddress);
        manufacturerRawMaterials[_manufacturerAddress].push(_addr);
        emit receivedEvent(msg.sender, _sellerAddr, _addr, signature, now);
    }
    
    function getAllRawMaterials() public view returns(address[] memory) {
        uint len = manufacturerRawMaterials[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = manufacturerRawMaterials[msg.sender][i];
        }
        return ret;
    }

    function manufacturerCreatesMedicine(
        address _manufacturerAddr,
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr
        ) public {
            
        Medicine _medicine = new Medicine(
            _manufacturerAddr,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr
        );
        
        manufacturerMedicines[_manufacturerAddr].push(address(_medicine));
        
    }
    
    function getAllCreatedMedicines() public view returns(address[] memory) {
        uint len = manufacturerMedicines[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = manufacturerMedicines[msg.sender][i];
        }
        return ret;
    }
    

    ///////////////  Wholesaler  ///////////////

    mapping(address => address[]) public MedicinesAtWholesaler;
    mapping(address => address[]) public MedicineWtoD;
    mapping(address => address) public MedicineWtoDTxContract;
    
    function wholesalerReceivedMedicine(
        address _address,
        address _sellerAddr,
        bytes memory signature
        ) public {
        require(
            userInfo[msg.sender].role == roles.wholesaler,
            "Only Wholesaler can call this function"
        );
        
        uint rtype = Medicine(_address).receivedMedicine(msg.sender);
        MedicinesAtWholesaler[msg.sender].push(_address);
        emit receivedEvent(msg.sender, _sellerAddr, _address, signature, now);
    }
    
    function transferMedicineWtoD(
            address _address,
            address transporter,
            address receiver
        ) public {
            
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
    
    function getAllMedicinesAtWholesaler() public view returns(address[] memory) {
        uint len = MedicinesAtWholesaler[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = MedicinesAtWholesaler[msg.sender][i];
        }
        return ret;
    }


//     ///////////////  Distributor  ///////////////

    mapping(address => address[]) public MedicinesAtDistributor;
    mapping(address => address[]) public MedicineDtoC;
    mapping(address => address) public MedicineDtoCTxContract;


    function distributorReceivedMedicine(
      address _address,
      address cid,
      address _sellerAddr,
      bytes memory signature
    ) public {
        require(
            userInfo[msg.sender].role == roles.distributor &&
            msg.sender == Medicine(_address).getWDC()[1],
            "Only Distributor or current owner of package can call this function"  
        );
        
        uint rtype = Medicine(_address).receivedMedicine(msg.sender);
        if(rtype == 2){
            MedicinesAtDistributor[msg.sender].push(_address);
            if(Medicine(_address).getWDC()[0] != address(0)){
                MedicineW_D(cid).receiveWD(_address, msg.sender);
            }
        }
        emit receivedEvent(msg.sender, _sellerAddr, _address, signature, now);
    }

    function distributorTransferMedicinetoCustomer(
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
    
    function getAllMedicinesAtDistributor() public view returns(address[] memory) {
        uint len = MedicinesAtDistributor[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = MedicinesAtDistributor[msg.sender][i];
        }
        return ret;
    }
    
    
//     ///////////////  Customer  ///////////////
    
    
//     function customerReceivedMedicine(
//         address _address,
//         address cid
//     ) public {
//         require(
//             userInfo[msg.sender].role == roles.customer,
//             "Only Customer Can call this function."
//         );
//         medicineRecievedAtCustomer(_address, cid);
//     }

//     function updateStatus(
//         address _address,
//         uint Status
//     ) public {
//         require(
//             userInfo[msg.sender].role == roles.customer &&
//             msg.sender == Medicine(_address).getWDC()[2],
//             "Only Customer or current owner of package can call this function"
//         );
//         require(sale[_address] == salestatus(1), "Medicine Must be at Customer");
        
//         updateSaleStatus(_address, Status);
//     }

//     function getSalesInfo(
//         address _address
//     ) public
//     view
//     returns(
//         uint Status 
//     ){
//         return salesInfo(_address);
//     }

    
//     function getBatchesCountC() public view returns(uint count) {
//         require(
//             userInfo[msg.sender].role == roles.customer,
//             "Only Wholesaler or current owner of package can call this function"
//         );
//         return  MedicineBatchAtCustomer[msg.sender].length;
//     }

//     function getBatchIdByIndexC(uint index) public view returns(address _address) {
//         require(
//             userInfo[msg.sender].role == roles.customer,
//             "Only Wholesaler or current owner of package can call this function"
//         );
//         return MedicineBatchAtCustomer[msg.sender][index];
//     }
    
    function verify(address p, bytes32 hash, uint8 v, bytes32 r, bytes32 s) public pure returns(bool) {
        return ecrecover(hash, v, r, s) == p;
    }   
}
    
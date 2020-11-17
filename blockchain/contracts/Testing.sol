pragma solidity ^0.6.6;
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
    event respondEvent(address buyer, address indexed seller, address packageAddr, bytes signature, uint indexed timestamp);
    event sendEvent(address indexed seller, address buyer, address packageAddr, bytes signature, uint indexed timestamp);
    event receivedEvent(address indexed buyer, address seller, address packageAddr, bytes signature, uint indexed timestamp);
    
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
    
    mapping (address => address[]) public supplierRawMaterials;
    
    function respondToManufacturer(address buyer, address seller, address packageAddr, bytes memory signature) external {
        emit respondEvent(buyer, seller, packageAddr, signature, now);
    }
    
    function createRawMaterialPackage(
        bytes32 _description,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
    ) external {

        RawMaterial rawMaterial = new RawMaterial(
            msg.sender,
            address(bytes20(sha256(abi.encodePacked(msg.sender, now)))),
            _description,
            _quantity,
            _transporterAddr,
            _manufacturerAddr
        );
        
        supplierRawMaterials[msg.sender].push(address(rawMaterial));
    }
    
    function getNoOfPackagesOfSupplier() external view returns(uint) {
        return supplierRawMaterials[msg.sender].length;
    }
    
    
    function getAllPackages() external view returns(address[] memory) {
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
        ) external {
            
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
    
    function requestRawMaterial(address supplierAddr, address manuAddr, address rawMaterialAddr, bytes memory signature) external {
        emit buyEvent(supplierAddr, manuAddr, rawMaterialAddr, signature, now);
    }

    
    function manufacturerReceivedPackage(
        address _addr,
        address _manufacturerAddress,
        address _sellerAddr,
        bytes memory signature
        ) external {
            
        RawMaterial(_addr).receivedPackage(_manufacturerAddress);
        manufacturerRawMaterials[_manufacturerAddress].push(_addr);
        emit receivedEvent(msg.sender, _sellerAddr, _addr, signature, now);
    }
    
    
    function manufacturerCreatesMedicine(
        address _manufacturerAddr,
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr,
        address _recieverAddr,
        uint RcvrType
        ) external {
            
        Medicine _medicine = new Medicine(
            _manufacturerAddr,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr,
            _recieverAddr,
            RcvrType
        );
        
        manufacturerMedicines[_manufacturerAddr].push(address(_medicine));
        
    }
    

    ///////////////  Wholesaler  ///////////////

    
//     function wholesalerReceivedMedicine(
//         address _address
//         ) external {
//         require(
//             userInfo[msg.sender].role == roles.wholesaler || userInfo[msg.sender].role == roles.distributor,
//             "Only Wholesaler and Distributor can call this function"
//         );
        
//         medicineRecievedAtWholesaler(
//             _address
//         );
//     }
    
//     function transferMedicineW_D(
//         address _address,
//         address transporter,
//         address receiver) external {
//         require(
//             userInfo[msg.sender].role == roles.wholesaler &&
//             msg.sender == Medicine(_address).getWDC()[0],
//             "Only Wholesaler or current owner of package can call this function"
//         );
        
//         transferMedicineWtoD(
//             _address,
//             transporter,
//             receiver
//         );
//     }
    
//     function getBatchIdByIndexWD(uint index) external view returns(address packageID) {
//         require(
//             userInfo[msg.sender].role == roles.wholesaler,
//             "Only Wholesaler Can call this function."
//         );
//         return MedicineWtoD[msg.sender][index];
//     }

//     function getSubContractWD(address _address) external view returns (address SubContractWD) {
//         return MedicineWtoDTxContract[_address];
//     }


//     ///////////////  Distributor  ///////////////


//     function distributorReceivedMedicine(
//       address _address,
//       address cid
//     ) external {
//         require(
//             userInfo[msg.sender].role == roles.distributor &&
//             msg.sender == Medicine(_address).getWDC()[1],
//             "Only Distributor or current owner of package can call this function"  
//         );
        
//         medicineRecievedAtDistributor(
//             _address,
//             cid
//         );
//     }

//     function distributorTransferMedicinetoCustomer(
//         address _address,
//         address transporter,
//         address receiver
//     ) external {
//         require(
//             userInfo[msg.sender].role == roles.distributor &&
//             msg.sender == Medicine(_address).getWDC()[1],
//             "Only Distributor or current owner of package can call this function"
//         );
//         transferMedicineDtoC(_address, transporter, receiver);
//     }
    
//     function getBatchesCountDC() external view returns (uint count){
//         require(
//             userInfo[msg.sender].role == roles.distributor,
//             "Only Distributor Can call this function."
//         );
//         return MedicineDtoC[msg.sender].length;
//     }

//     function getBatchIdByIndexDC(uint index) external view returns(address packageID) {
//         require(
//             userInfo[msg.sender].role == roles.distributor,
//             "Only Distributor Can call this function."
//         );
//         return MedicineDtoC[msg.sender][index];
//     }

//     function getSubContractDC(address _address) external view returns (address SubContractDP) {
//         return MedicineDtoCTxContract[_address];
//     }
    
    
//     ///////////////  Customer  ///////////////
    
    
//     function customerReceivedMedicine(
//         address _address,
//         address cid
//     ) external {
//         require(
//             userInfo[msg.sender].role == roles.customer,
//             "Only Customer Can call this function."
//         );
//         medicineRecievedAtCustomer(_address, cid);
//     }

//     function updateStatus(
//         address _address,
//         uint Status
//     ) external {
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
//     ) external
//     view
//     returns(
//         uint Status 
//     ){
//         return salesInfo(_address);
//     }

    
//     function getBatchesCountC() external view returns(uint count) {
//         require(
//             userInfo[msg.sender].role == roles.customer,
//             "Only Wholesaler or current owner of package can call this function"
//         );
//         return  MedicineBatchAtCustomer[msg.sender].length;
//     }

//     function getBatchIdByIndexC(uint index) external view returns(address _address) {
//         require(
//             userInfo[msg.sender].role == roles.customer,
//             "Only Wholesaler or current owner of package can call this function"
//         );
//         return MedicineBatchAtCustomer[msg.sender][index];
//     }
    
    // function verify(address p, bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns(bool) {
    //     return ecrecover(hash, v, r, s) == p;
    // }
// }    
}
    
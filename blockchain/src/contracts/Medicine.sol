pragma solidity ^0.6.6;


contract Medicine {

    address Owner;

    enum medicineStatus {
        atManufacturer,
        picked4W,
        picked4D,
        deliveredatW,
        deliveredatD,
        picked4P,
        deliveredatP
    }

    bytes32 description;
    address[] rawMaterials;
    address[] transporters;
    address manufacturer;
    address wholesaler;
    address distributor;
    address customer;
    medicineStatus status;

    event ShippmentUpdate(
        address indexed BatchID,
        address indexed Shipper,
        address indexed Receiver,
        uint TransporterType,
        uint Status
    );


    constructor(
        address _manufacturerAddr,
        bytes32 _description,
        address[] _rawAddr,
        uint _quantity,
        address _transporterAddr,
        address _recieverAddr,
        uint 
    ) public {
        Owner = Manu;
        manufacturer = Manu;
        description = Des;
        rawMaterials = RM;
        quantity = Quant;
        shipper = Shpr;
        if(RcvrType == 1) {
            wholesaler = Rcvr;
        } else if( RcvrType == 2){
            distributer = Rcvr;
        }
    }


    function getMedicineInfo () public view returns(
        address Manu,
        bytes32 Des,
        bytes32 RM,
        uint Quant,
        address Shpr
    ) {
        return(
            manufacturer,
            description,
            rawMaterials,
            quantity,
            shipper
        );
    }

 
    function getWDP() public view returns(
        address[3] memory WDP
    ) {
        return (
            [wholesaler,distributer,pharma]
        );
    }

    function getBatchIDStatus() public view returns(
        uint
    ) {
        return uint(status);
    }


    function pickPackage(
        address shpr
    ) public {
        require(
            shpr == shipper,
            "Only Associate Shipper can call this function"
        );
        require(
            status == medicineStatus(0),
            "Package must be at Supplier."
        );

        if(wholesaler!=address(0x0)){
            status = medicineStatus(1);
            emit ShippmentUpdate(address(this),shipper,wholesaler,1,1);
        }else{
            status = medicineStatus(2);
            emit ShippmentUpdate(address(this),shipper,distributer,1,1);
        }
    }


    function receivedPackage(
        address Rcvr
    ) public
    returns(uint rcvtype)
    {

        require(
            Rcvr == wholesaler || Rcvr == distributer,
            "Only Associate Wholesaler or Distrubuter can call this function"
        );

        require(
            uint(status) >= 1,
            "Product not picked up yet"
        );

        if(Rcvr == wholesaler && status == medicineStatus(1)){
            status = medicineStatus(3);
            emit ShippmentUpdate(address(this),shipper,wholesaler,2,3);
            return 1;
        } else if(Rcvr == distributer && status == medicineStatus(2)){
            status = medicineStatus(4);
            emit ShippmentUpdate(address(this),shipper,distributer,3,4);
            return 2;
        }
    }


    function sendWD(
        address receiver,
        address sender
    ) public {
        require(
            wholesaler == sender,
            "this Wholesaler is not Associated."
        );
        distributer = receiver;
        status = medicineStatus(2);
    }


    function recievedWD(
        address receiver
    ) public {
        require(
            distributer == receiver,
            "This Distributer is not Associated."
        );
        status = medicineStatus(4);
    }


    function sendDP(
        address receiver,
        address sender
    ) public {
        require(
            distributer == sender,
            "this Distributer is not Associated."
        );
        pharma = receiver;
        status = medicineStatus(5);
    }


    function recievedDP(
        address receiver
    ) public {
        require(
            pharma == receiver,
            "This Pharma is not Associated."
        );
        status = medicineStatus(6);
    }
}
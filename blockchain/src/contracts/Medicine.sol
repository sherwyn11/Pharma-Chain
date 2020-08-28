pragma solidity ^0.6.6;


contract Medicine {

    address Owner;

    enum medicineStatus {
        atManufacturer,
        pickedForW,
        pickedForD,
        deliveredAtW,
        deliveredAtD,
        pickedForC,
        deliveredAtC
    }

    bytes32 description;
    address[] rawMaterials;
    address[] transporters;
    address manufacturer;
    address wholesaler;
    address distributor;
    address customer;
    uint RcvrType;
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
        uint RcvrType
    ) public {
        Owner = _manufacturerAddr;
        manufacturer = _manufacturerAddr;
        description = _description;
        rawMaterials = _rawAddr;
        quantity = _quantity;
        shipper = _transporterAddr;
        if(RcvrType == 1) {
            wholesaler = _recieverAddr;
        } else if( RcvrType == 2){
            distributor = _recieverAddr;
        }
    }


    function getMedicineInfo () public view returns(
        address _manufacturerAddr,
        bytes32 _description,
        address[] _description,
        uint _quantity,
        address _transporterAddr
    ) {
        return(
            _manufacturerAddr,
            _description,
            _description,
            _quantity,
            _transporterAddr
        );
    }

 
    function getWDC() public view returns(
        address[3] memory WDP
    ) {
        return (
            [wholesaler, distributor, customer]
        );
    }

    function getBatchIDStatus() public view returns(
        uint
    ) {
        return uint(status);
    }


    function pickMedicine(
        address _transporterAddr
    ) public {
        require(
            _transporterAddr == transporters[transporters.length - 1],
            "Only Transporter can call this function"
        );
        require(
            status == medicineStatus(0),
            "Package must be at Supplier."
        );

        if(wholesaler != address(0x0)){
            status = medicineStatus(1);
            emit ShippmentUpdate(address(this), _transporterAddr, wholesaler, 1, 1);
        }else{
            status = medicineStatus(2);
            emit ShippmentUpdate(address(this), _transporterAddr, distributor, 1, 2);
        }
    }
    
    function updateTransporterArray(address _transporterAddr) public {
        transporters.push(_transporterAddr);
    }


    function receivedMedicine(
        address _recieverAddr
    ) public
    returns(uint)
    {

        require(
            _recieverAddr == wholesaler || _recieverAddr == distributor,
            "Only Wholesaler or Distrubutor can call this function"
        );

        require(
            uint(status) >= 1,
            "Product not picked up yet"
        );

        if(_recieverAddr == wholesaler && status == medicineStatus(1)){
            status = medicineStatus(3);
            emit ShippmentUpdate(address(this),shipper,wholesaler,2, 3);
            return 1;
        } else if(_recieverAddr == distributor && status == medicineStatus(2)){
            status = medicineStatus(4);
            emit ShippmentUpdate(address(this),shipper,distributor,3, 4);
            return 2;
        }
    }


    function sendWtoD(
        address receiver,
        address sender
    ) public {
        require(
            wholesaler == sender,
            "this Wholesaler is not Associated."
        );
        distributor = receiver;
        status = medicineStatus(2);
    }


    function recievedWtoD(
        address receiver
    ) public {
        require(
            distributor == receiver,
            "This Distributer is not Associated."
        );
        status = medicineStatus(4);
    }


    function sendDtoC(
        address receiver,
        address sender
    ) public {
        require(
            distributor == sender,
            "this Distributor is not Associated."
        );
        customer = receiver;
        status = medicineStatus(5);
    }


    function recievedDtoC(
        address receiver
    ) public {
        require(
            customer == receiver,
            "This Customer is not Associated."
        );
        status = medicineStatus(6);
    }
}
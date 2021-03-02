pragma solidity ^0.6.6;

import './Transactions.sol';

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
    uint quantity;
    medicineStatus status;
    address txnContractAddress;

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
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr
    ) public {
        Owner = _manufacturerAddr;
        manufacturer = _manufacturerAddr;
        description = _description;
        rawMaterials = _rawAddr;
        quantity = _quantity;
        transporters = _transporterAddr;
        wholesaler = address(0x0);
        distributor = address(0x0);
        status = medicineStatus(0);
        Transactions txnContract = new Transactions(_manufacturerAddr);
        txnContractAddress = address(txnContract);
    }


    function getMedicineInfo () public view returns(
        address _manufacturerAddr,
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr,
        address _distributor,
        uint _status,
        address _txnContract,
        address _wholesaler
    ) {
        return(
            manufacturer,
            description,
            rawMaterials,
            quantity,
            transporters,
            distributor,
            uint(status),
            txnContractAddress,
            wholesaler
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
            "Package must be at Manufacturer."
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

    function updateWholesalerAddress(address addr) public {
        wholesaler = addr;
    }

    function updateDistributorAddress(address addr) public {
        distributor = addr;
    }

    function receivedMedicine(
        address _receiverAddr
    ) public returns(uint) {

        require(
            _receiverAddr == wholesaler || _receiverAddr == distributor,
            "Only Wholesaler or Distributor can call this function"
        );

        require(
            uint(status) >= 1,
            "Product not picked up yet"
        );

        if(_receiverAddr == wholesaler && status == medicineStatus(1)){
            status = medicineStatus(3);
            emit ShippmentUpdate(address(this), transporters[transporters.length - 1], wholesaler, 2, 3);
            return 1;
        } else if(_receiverAddr == distributor && status == medicineStatus(2)){
            status = medicineStatus(4);
            emit ShippmentUpdate(address(this), transporters[transporters.length - 1], distributor,3, 4);
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


    function receivedWtoD(
        address receiver
    ) public {
        require(
            distributor == receiver,
            "This Distributor is not Associated."
        );
        status = medicineStatus(4);
    }


    function sendDtoC(
        address receiver,
        address sender
    ) public {
        require(
            distributor == sender,
            "This Distributor is not Associated."
        );
        customer = receiver;
        status = medicineStatus(5);
    }


    function receivedDtoC(
        address receiver
    ) public {
        require(
            customer == receiver,
            "This Customer is not Associated."
        );
        status = medicineStatus(6);
    }
}
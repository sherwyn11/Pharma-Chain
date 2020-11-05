pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

contract RawMaterial {
    
    address Owner;

    enum packageStatus { atCreator, picked, delivered }
    
    event ShippmentUpdate(
        address indexed ProductID,
        address indexed Transporter,
        address indexed Manufacturer,
        uint TransporterType,
        uint Status
    );

    address productid;
    bytes32 description;
    string locationx;
    string locationy;
    string[] locationArr;
    uint quantity;
    address transporter;
    address manufacturer;
    address supplier;
    packageStatus status;
    bytes32 packageReceiverDescription;

    
    constructor (
        address _creatorAddr,
        address _productid,
        bytes32 _description,
        string memory _locationx,
        string memory _locationy,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
    ) public {
        Owner = _creatorAddr;
        productid = _productid;
        description = _description;
        locationx = _locationx;
        locationx = _locationy;
        quantity = _quantity;
        transporter = _transporterAddr;
        manufacturer = _manufacturerAddr;
        supplier = _creatorAddr;
        status = packageStatus(0);
        locationArr.push(_locationx);
        locationArr.push(_locationy);
    }


    function getSuppliedRawMaterials () public view returns(
        address,
        bytes32,
        string[] memory,
        uint,
        address,
        address,
        address
    ) {
        return (productid, description, locationArr, quantity, supplier, transporter, manufacturer);
    }



    function getRawMaterialStatus() public view returns(
        uint
    ) {
        return uint(status);
    }



    function pickPackage(
        address _transporterAddr
    ) public {
        require(
            _transporterAddr == transporter,
            "Only transporter of the package can pick package"
        );
        require(
            status == packageStatus(0),
            "Package must be at Supplier."
        );
        status = packageStatus(1);
        emit ShippmentUpdate(productid, transporter, manufacturer, 1, 1);
    }

    
    function receivedPackage(
        address _manufacturerAddr
    ) public {

        require(
            _manufacturerAddr == manufacturer,
            "Only Manufacturer of the package can receieve the package"
        );

        require(
            status == packageStatus(1),
            "Product not picked up yet"
        );
        status = packageStatus(2);
        emit ShippmentUpdate(productid, transporter, manufacturer, 1, 2);
    }
}
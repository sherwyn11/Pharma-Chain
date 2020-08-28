pragma solidity ^0.6.6;


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
    uint[] location;
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
        uint[] memory _locationArr,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
    ) public {
        Owner = _creatorAddr;
        productid = _productid;
        description = _description;
        location = _locationArr;
        quantity = _quantity;
        transporter = _transporterAddr;
        manufacturer = _manufacturerAddr;
        supplier = _creatorAddr;
        status = packageStatus(0);
    }


    function getSuppliedRawMaterials () public view returns(
        address,
        bytes32,
        uint[] memory,
        uint,
        address,
        address,
        address
    ) {
        return (productid, description, location, quantity, supplier, transporter, manufacturer);
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
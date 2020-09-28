pragma solidity ^0.6.6;

contract Customer {
    
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
        require(
            UsersDetails[msg.sender].role == roles.customer,
            "Only Customer Can call this function."
        );
        MedicineD_C(cid).recieveDP(_address, msg.sender);
        MedicineBatchAtCustomer[msg.sender].push(_address);
        sale[_address] = salestatus(1);
    }

    function updateSaleStatus(
        address _address,
        uint Status
    ) internal {
        require(
            UsersDetails[msg.sender].role == roles.customer &&
            msg.sender == Medicine(_address).getWDC()[2],
            "Only Customer or current owner of package can call this function"
        );
        require(sale[_address] == salestatus(1), "Medicine Must be at Customer");
        sale[_address] = salestatus(Status);

        emit MedicineStatus(_address, msg.sender, Status);
    }

    function salesInfo(
        address _address
    ) internal
    view
    returns(
        uint Status
    ){
        return uint(sale[_address]);
    }
}
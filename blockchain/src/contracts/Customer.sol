pragma solidity ^0.6.6;

import "./Roles.sol";


contract Customer {

    using Roles for Roles.Role;

    event CustomerAdded(address indexed account);
    event CustomerRemoved(address indexed account);

    Roles.Role private customers;

    constructor() public {
        _addCustomer(msg.sender);
    }

    modifier onlyCustomer() {
        require(isCustomer(msg.sender), "Sender not authorized");
        _;
    }

    function isCustomer(address account) public view returns(bool) {
        return customers.has(account);
    }

    function addCustomer(address account) public onlyCustomer {
        _addCustomer(account);
    }

    function renounceCustomer(address account) public onlyCustomer {
        _removeCustomer(account);
    }

    function _addCustomer(address account) internal {
        customers.add(account);
        emit CustomerAdded(account);
    }

    function _removeCustomer(address account) internal {
        customers.remove(account);
        emit CustomerRemoved(account);
    }
}
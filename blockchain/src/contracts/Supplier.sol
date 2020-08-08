pragma solidity ^0.6.6;

// Import the library 'Roles'
import "./Roles.sol";


contract Supplier {

    using Roles for Roles.Role;

    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);

    Roles.Role private distributors;

    constructor() public {
        _addDistributor(msg.sender);
    }

    modifier onlyDistributor() {
        require(isDistributor(msg.sender), "Sender not authorized");
        _;
    }

    function isDistributor(address account) public view returns(bool) {
        return distributors.has(account);
    }

    function addDistributor(address account) public onlyDistributor {
        _addDistributor(account);
    }

    function renounceDistributor(address account) public onlyDistributor {
        _removeDistributor(account);
    }

    function _addDistributor(address account) internal {
        distributors.add(account);
        emit DistributorAdded(account);
    }

    function _removeDistributor(address account) internal {
        distributors.remove(account);
        emit DistributorRemoved(account);
    }
}
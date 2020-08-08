pragma solidity ^0.6.6;

import "./Roles.sol";


contract Manufacturer {

    using Roles for Roles.Role;

    event ProducerAdded(address indexed account);
    event ProducerRemoved(address indexed account);

    Roles.Role private producers;

    constructor() public {
        _addProducer(msg.sender);
    }

    modifier onlyProducer() {
        require(isProducer(msg.sender), "Sender not authorized");
        _;
    }

    function isProducer(address account) public view returns(bool) {
        return producers.has(account);
    }

    function addProducer(address account) public onlyProducer {
        _addProducer(account);
    }

    function renounceProducer(address account) public onlyProducer {
        _removeProducer(account);
    }

    function _addProducer(address account) internal {
        producers.add(account);
        emit ProducerAdded(account);
    }

    function _removeProducer(address account) internal {
        producers.remove(account);
        emit ProducerRemoved(account);
    }
}
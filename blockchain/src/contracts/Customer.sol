pragma solidity ^0.6.6;

contract Customer {
    
    struct customer {
        string name;
        string email;
        string contact;
        uint ordersCount;
    }
    
    mapping (address => customer) public customerMap;
    mapping (address => mapping (uint => address)) public customerOrders;
    
    function createUser(string memory _name, string memory _email, string memory _contact) public returns(string memory) {
        customerMap[msg.sender].name = _name;
        customerMap[msg.sender].email = _email;
        customerMap[msg.sender].contact = _contact;
        customerMap[msg.sender].ordersCount = 0;
        
        return 'User created successfully!';
    }
    
}
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

contract Transactions {
    
    address Creator;
    
    struct txns {
        bytes32 txnHash;
        address fromAddr;
        address toAddr;
        bytes32 prevTxn;
        uint timestamp;
    }
    
    mapping(uint => txns) public transactions;
    uint public txnCount = 0;
    
    constructor(address _creator) public {
        Creator = _creator;
    }
    
    event txnCreated(bytes32 _txnHash, address _from, address _to, bytes32 _prev, uint _timestamp);
    
    function createEntry(bytes32 _txnHash, address _from, address _to, bytes32 _prev) public {
        uint _timestamp = now;
        if(txnCount == 0) {
            transactions[txnCount] = txns(_txnHash, _from, _to, _prev, _timestamp);
        } else {
            require(transactions[txnCount - 1].txnHash == _prev, "Transaction error occurred!");
            transactions[txnCount] = txns(_txnHash, _from, _to, _prev, _timestamp);
        }
        txnCount += 1;
        emit txnCreated(_txnHash, _from, _to, _prev, _timestamp);
    }

    function getAllTransactions() public view returns(txns[] memory) {
        uint len = txnCount;
        txns[] memory ret = new txns[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = transactions[i];
        }
        return ret;    
    }
}
var SupplyChain = artifacts.require('blockchain/src/contracts/SupplyChain.sol');
var Customer = artifacts.require('blockchain/src/contracts/Customer.sol');
var Manufacturer = artifacts.require('blockchain/src/contracts/Manufacturer.sol');
var Retailer = artifacts.require('blockchain/src/contracts/Retailer.sol');
var Roles = artifacts.require('blockchain/src/contracts/Roles.sol');

module.exports = function(deployer) {
  deployer.deploy(SupplyChain);
  deployer.deploy(Customer);
  deployer.deploy(Manufacturer);
  deployer.deploy(Retailer);
  deployer.deploy(Roles);
};
var SupplyChain = artifacts.require('SupplyChain');
var Customer = artifacts.require('Customer');
var Manufacturer = artifacts.require('Manufacturer');
var Retailer = artifacts.require('Retailer');
var Roles = artifacts.require('Roles');
var Medicine = artifacts.require('Medicine');


module.exports = function(deployer) {
  deployer.deploy(SupplyChain);
  deployer.deploy(Customer);
  deployer.deploy(Manufacturer);
  deployer.deploy(Retailer);
  deployer.deploy(Roles);
  deployer.deploy(Medicine);
};
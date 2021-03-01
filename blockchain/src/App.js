// Import React
import React, { Component } from 'react';

// Web3 & Blockchain imports
import Web3 from 'web3';
import SupplyChain from './build/SupplyChain.json';

// Owner imports
import Owner from './entities/Owner/Owner';
import AddNewUser from './entities/Owner/AddNewUser';
import ViewUser from './entities/Owner/ViewUser';

// Supplier imports
import Supplier from './entities/Supplier/Supplier';
import AddRawMaterial from './entities/Supplier/AddRawMaterial';
import ViewRawMaterials from './entities/Supplier/ViewRawMaterials';
import RawMaterialInfo from './entities/Supplier/RawMaterialInfo';

// Transporter imports
import Transporter from './entities/Transporter/Transporter';
import HandlePackage from './entities/Transporter/HandlePackage';

// Manufacturer imports
import Manufacturer from './entities/Manufacturer/Manufacturer';
import RequestProduct from './entities/Manufacturer/RequestProduct';
import ReceiveProduct from './entities/Manufacturer/ReceiveProduct';
import CreateMedicine from './entities/Manufacturer/CreateMedicine';
import ViewMedicines from './entities/Manufacturer/ViewMedicines';

// Wholesaler imports
import Wholesaler from './entities/Wholesaler/Wholesaler';
import ViewReceivedMedicines from './entities/Wholesaler/ViewReceivedMedicine';
import RequestProductManufacturer from './entities/Wholesaler/RequestProduct';
import TransferMedicine from './entities/Wholesaler/TransferMedicine';
import WholesalerReceiveProduct from './entities/Wholesaler/ReceiveProduct';

// Transaction imports
import ViewTransations from './entities/Transactions/ViewTransactions';

// Event imports
import ViewRequests from './entities/Events/ViewRequests';
import ViewResponses from './entities/Events/ViewResponses';

// Utils
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import Landing from './components/home/Landing';
import Loader from './components/Loader';
import NotFound from './components/NotFound';

class App extends Component {

  constructor() {
    super();
    this.state = {
      'account': null,
      'supplyChain': null,
      'identicon': null,
      'loading': true,
      'web3': null,
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockChain()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  async loadBlockChain() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ 'account': accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChain.networks[networkId];
    if (networkData) {
      const supplyChain = new web3.eth.Contract(SupplyChain.abi, networkData.address);
      this.setState({ 'supplyChain': supplyChain, 'loading': false, 'web3': web3 });
    } else {
      window.alert('Supply chain contract not deployed to detected network.');
    }
  }

  render() {
    if (this.state.loading === false) {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />

            <Route exact path="/owner" component={(() => <Owner account={this.state.account} supplyChain={this.state.supplyChain} />)} />
            <Route exact path="/owner/add-new-user" component={(() => <AddNewUser account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/owner/view-user" component={(() => <ViewUser account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />

            <Route exact path="/supplier" component={Supplier} />
            <Route exact path="/supplier/add-raw-material" component={(() => <AddRawMaterial account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/supplier/view-raw-materials" component={(() => <ViewRawMaterials account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/supplier/view-raw-materials/:id" component={RawMaterialInfo} />
            <Route exact path="/supplier/view-transactions/:id" component={ViewTransations} />
            <Route exact path="/supplier/view-requests/:id" component={ViewRequests} />

            <Route exact path="/transporter" component={Transporter} />
            <Route exact path="/transporter/handle-package" component={(() => <HandlePackage account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />

            <Route exact path="/manufacturer" component={Manufacturer} />
            <Route exact path="/manufacturer/request-product" component={(() => <RequestProduct account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/manufacturer/view-responses" component={(() => <ViewResponses account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/manufacturer/receive-product" component={(() => <ReceiveProduct account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/manufacturer/create-medicine" component={(() => <CreateMedicine account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/manufacturer/view-medicines" component={(() => <ViewMedicines account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />

            <Route exact path="/wholesaler" component={Wholesaler} />
            <Route exact path="/wholesaler/view-medicines" component={(() => <ViewReceivedMedicines account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/wholesaler/request-product" component={(() => <RequestProductManufacturer account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/wholesaler/view-responses" component={(() => <ViewResponses account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/wholesaler/transfer-medicine" component={(() => <TransferMedicine account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />
            <Route exact path="/wholesaler/receive-medicine" component={(() => <WholesalerReceiveProduct account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3} />)} />

            <Route path="" component={NotFound} />
            
          </Switch>
        </Router>
      );
    }
    else {
      return (
        <Loader></Loader>
      );
    }
  }
}

export default App;
import React, { Component } from 'react';
import Web3 from 'web3';
import Owner from './entities/Owner/Owner';
import AddNewUser from './entities/Owner/AddNewUser';
import ViewUser from './entities/Owner/ViewUser';
import NavBar from './components/Navbar';
import SupplyChain from './build/SupplyChain.json';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from '../src/components/login/SignIn';
import SignUp from '../src/components/login/SignUp';
import Supplier from './entities/Supplier/Supplier';
import Transporter from '../src/components/transporter/Transporter';
import Landing from '../src/components/home/Landing';
import Routes from '../src/components/views/Routes';
import AddRawMaterial from './entities/Supplier/AddRawMaterial';
import PackageDetails from '../src/components/transporter/PackageDetails';

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
    if(networkData) {
      const supplyChain = new web3.eth.Contract(SupplyChain.abi, networkData.address);
      this.setState({ 'supplyChain': supplyChain, 'loading': false, 'web3': web3 });
      console.log(supplyChain);
    } else {
      window.alert('Supply chain contract not deployed to detected network.');
    }
  }

  render() {
    if(this.state.loading === false){
      return (
        <Router>
          <Switch>
            <Route exact path ="/" component = { Landing }/>
            <Route exact path="/signup" component = {SignUp}/>
            <Route  path="/signin" component = {SignIn}/>

            <Route exact path="/owner" component={(() => <Owner account={this.state.account} supplyChain={this.state.supplyChain}/>)} />
            <Route exact path="/owner/add-new-user" component={(() => <AddNewUser account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3}/>)} />
            <Route exact path="/owner/view-user" component={(() => <ViewUser account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3}/>)} />

            <Route exact path= "/supplier" component= {Supplier}/>
            <Route exact path= "/supplier/add-raw-material" component = {(() => <AddRawMaterial account={this.state.account} supplyChain={this.state.supplyChain} web3={this.state.web3}/>)}/>

            <Route exact path= "/transporter" component= {Transporter}/>
          </Switch>
        </Router>
        );
      } else {
        return (
          <h1>Hello!</h1>
        )
      }
    }
  }

export default App
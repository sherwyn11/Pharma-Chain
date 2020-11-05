import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Supplier from '../../entities/Supplier/Supplier';
import AddRawMaterial from '../../entities/Supplier/AddRawMaterial';
import Header from '../header/Header';
import SignIn from '../login/SignIn';


class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    {/* <Route path="/"  component={Header}/> */}
                    <Route path="/addrawmaterial" exact component ={AddRawMaterial}/>
                    <Route path="/supplier" exact component ={Supplier}/>
                    <Route path="/signin" exact component = {SignIn}/>
                </Switch>
            </Router>
        );
    }
}
export default Routes
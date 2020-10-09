import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Supplier from './Supplier';
import AddRawMaterial from './AddRawMaterial';
import history from './history';
import Header from '../header/Header';


class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/"  component={Header}/>
                    <Route path="/addrawmaterial" exact component ={AddRawMaterial}/>
                    <Route path="/supplier" exact component ={Supplier}/>
                </Switch>
            </Router>
        );
    }
}
export default Routes
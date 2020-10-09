import React, { Component } from 'react';
// import Header from '../header/Header';
import AddRawMaterial from "./AddRawMaterial";
import history from './History';

import {BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom';
const Supplier = props =>{
    return(
        <Router history={history}>
            <div>
                <h3>Hi, Im a Supplier</h3>
                <NavLink exact activeClassName="active" to="/addproducts" className="btn btn-outline-success" onClick={ ()=> history.push('/addproducts')}>Add Raw Material</NavLink>
                <Route path="/addproducts" component={AddRawMaterial}/>
            </div>
        </Router>
         
    );
}
export default Supplier
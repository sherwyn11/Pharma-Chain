import React, { Component } from 'react';
import CardUI from './CardUI';
import './Cards.css';

import Distributer from '../images/Distributer.jpg';
import Supplier1 from '../images/Supplier1.jpg';
import Manufacturer1 from '../images/Manufacturer1.jpg';
import Transporter2 from '../images/Transporter2.jpg';
import Wholesaler from '../images/Wholesaler.jpg';

import history from '../supplier/history'
import Supplier from '../supplier/Supplier';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';

const Cards = props =>{
    return(
        <Router history= {history}>
        <div className="container">
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
                <div className="col-md-4">
                    <CardUI imgsrc={Distributer} title="Owner"/>
                </div>
                <div className="col-md-4">
                    <CardUI imgsrc={Supplier1} title="Supplier"/>
                    <NavLink exact activeClassName="active" to="/supplier" className="btn btn-outline-success" onClick={ ()=> history.push('/supplier')}>Login</NavLink>
                </div>
                <div className="col-md-4">
                    <CardUI imgsrc={Transporter2} title="Transporter"/>
                </div>
            </div>
        </div>
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
                <div className="col-md-4">
                    <CardUI imgsrc={Manufacturer1} title="Manufacturer"/>
                </div>
                <div className="col-md-4">
                    <CardUI imgsrc={Wholesaler} title="Wholesaler"/>
                </div>
                <div className="col-md-4">
                    <CardUI imgsrc={Distributer} title="Distributer"/>
                </div>
            </div>
        </div>

        </div>
        <Route path="/supplier" component={Supplier}/>

        </Router>
    );
}
export default Cards
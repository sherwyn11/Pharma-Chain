import React, { Component } from 'react';
import './CardUI.css'; 
import Supplier from '../supplier/Supplier';

import {BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

const CardUI = props =>{
    return( 
        <Router>
            <div className="card text-center">
                <div className ="card img">
                    <img src={props.imgsrc} alt="" className="card-img-top"/>
                </div>
                <div className="card body-text-dark">
                    <h4 className="card-title">{props.title}</h4>
                    <p>Img Description</p>
                    {/* <div className="card-button">{props.button}</div> */}
                    {/* <NavLink exact activeClassName="active" to="/supplier" className="btn btn-outline-success" >Login</NavLink> */}
                    {/* <div className="content"> */}
                        {/* <Route path="/supplier" component={ Supplier }/> */}
                    {/* </div> */}
                    <Switch>
                        {/* <Route path="/supplier" component={Supplier}/> */}
                    </Switch>
                </div>

            </div>
        </Router>

    );
}
export default CardUI
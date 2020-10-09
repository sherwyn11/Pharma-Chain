import React,{ Component } from 'react';
import './Header.css';
import SideBarButton from '../sidebar/SideBarButton';
import Cards from '../cards/Cards';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';

const Header = props =>(
<Router>
    <div>
        <div className="header-main" style= {{ color: "red"}}>
            <nav className ="header-navigation">
                <div>
                    <SideBarButton/>
                </div>
                <div className = "header-logo"><a href= "#">Medicare</a></div>
                <div className="spacer"/>
                <div className = "header-items">
                    <label><a href ="/home ">Home</a></label>
                    <label><a href ="/">About Us</a></label>
                    <label><a href="/">Login</a></label>    
                </div>
            </nav>
        </div>
        <div></div>
        <Cards/>
    </div>
</Router>
);
export default Header
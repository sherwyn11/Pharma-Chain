import React, { Component } from 'react'
import './SideBarButton.css';

const SideBarButton = props =>(
    <button className="toogle-button">
        <div className="toogle-button_line"/>
        <div className="toogle-button_line"/>
        <div className="toogle-button_line"/>
    </button>
);

export default SideBarButton
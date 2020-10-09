import React, { Component } from 'react';
import './AddRawMaterial.css';

const AddRawMaterial = props =>{
    return(
        <div className="wrapper">
            <div className="form-wrapper">
            <h1>Add Raw Material</h1>
            <form>
            <div className="material-description">
                    <label htmlFor="materialDescription">Product Description: </label>
                    <input type="textarea" placeholder="Material Description" type="text" name="materialDescription"/>
                </div>
                <div className="quantity">
                    <label htmlFor="materialQuantity">Quantity: </label>
                    <input type="text" placeholder="Material Quantity " type="text" name="materialQuantity"/>
                </div>
                <div className="supplier-loc">
                    <label htmlFor="suppLocation">Supplier Location: </label>
                    <input type="text" placeholder="Supplier Location" type="text" name="suppLocation"/>
                </div>
                <div className="transporter-address">
                    <label htmlFor="transAddress">Transporter Address: </label>
                    <input type="text" placeholder="Transporter Address" type="text" name="transAddress"/>
                </div>
                <div className="manufacturer-address">
                    <label htmlFor="manufacAddress">Manufacturer Address: </label>
                    <input type="text" placeholder="Manufacturer Address" type="text" name="manufacAddress"/>
                </div>
                <div className="btn btn-outline-success">Submit</div>
            </form>
            </div>
        </div>
    );
}
export default AddRawMaterial



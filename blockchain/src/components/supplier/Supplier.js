import React, { Component } from 'react';
import AddRawMaterial from './AddRawMaterial';
import Button from '@material-ui/core/Button';
import history from '../views/history';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom'; 

class Supplier extends Component{
   
    constructor(props){
        super(props);
        
    }

    render(){
        return(
        <Router>
            <h3 style={{paddingLeft:550}}>Welcome Supplier</h3>
            <Button variant="contained" color="primary">
                <NavLink to ="/supplier/addrawmaterial"  onClick={ ()=> history.push('/supplier/addrawmaterial')}>Add Raw Material</NavLink>
            </Button>
            <Route path="/supplier/addrawmaterial" exact component={AddRawMaterial}/>
        </Router>
            )
        }

}
export default withRouter(Supplier);
import React, { Component } from 'react';
import Sample from '../../components/images/supplierbg.jpg';
import AddMedicine from './AddMedicine'
import Header from '../../components/header/Header';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom'; 
import history from '../../components/views/history';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

class Manufacturer extends Component{
    constructor(props){
        super(props);
        this.state = {
            addMedicineClick: false
        }
    }
    handleAddMedicineClick(){
        this.setState({
            addMedicineClick: true
        })
        console.log("Add Medicine");
    }
    render(){
        return (
            <Router>
              <div style= {{ backgroundImage: `url(${Sample})`,
                              backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '1000px',
                              }}>
                <Header/>
                <div className="body-container">
                  <h3 style={{ textAlign: "center", color: "white" }}>Welcome Manufacturer!</h3>
                  <Grid container>
                      <Grid item md={4}>
                        <Button variant="contained" color="primary" onClick = {()=> this.handleAddMedicineClick()}>Add New Medicine</Button>
                        <div className= "button-clicked">{(this.state.addMedicineClick)? <AddMedicine/> : ''}</div>
                      </Grid>
                      <Grid item md={4}>
                        <Button variant="contained" color="primary" >View Raw Material</Button>
                        {/* <div className= "button-clicked">{(this.state.addMedicineClick)? <AddMedicine/> : ''}</div> */}
                      </Grid>
                   
                  </Grid>

                </div>
              </div>
            </Router>
          );

    }
}
export default Manufacturer
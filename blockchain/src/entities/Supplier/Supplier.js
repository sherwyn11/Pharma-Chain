import React, { Component } from 'react';
import AddRawMaterial from './AddRawMaterial';
import Button from '@material-ui/core/Button';
import history from '../../components/views/history';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom'; 
import Header from '../../components/header/Header';
import Sample from '../../components/images/supplierbg.jpg';

class Supplier extends Component{
   
    
    constructor(props){
        super(props);
        this.state = {
            clicked: false
        }
        
    }
    handleClick(){
        this.setState({
            clicked: true
        })
        console.log("Clicked");
    }
    render(){
        return(
            
        <Router>
            <div style={{ backgroundImage: `url(${Sample})` , 
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat",
            height: '1000px',
            }}>
            <Header/>
            <div className="body-container">
                <h3 style={{ textAlign: "center", color: "white"}}>Welcome Supplier!</h3>
                {/* <Button variant="contained" color="primary">
                    <NavLink to ="/supplier/addrawmaterial"  onClick={ ()=> history.push('/supplier/addrawmaterial')}>Add Raw Material</NavLink>
                </Button>
                <Route path="/supplier/addrawmaterial" exact component={AddRawMaterial}/> */}
                <Button variant="contained" color="primary" onClick = {()=> this.handleClick()}>Add Material</Button>
            <div className= "button-clicked">{(this.state.clicked) ?<Router exact to='supplier/add-raw-material'></Router>: '' }</div>
            </div>
            </div>
        </Router>
            )
        }

}
export default withRouter(Supplier);

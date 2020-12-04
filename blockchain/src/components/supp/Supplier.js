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
                <Button variant="contained" color="primary" 
                onClick={()=> this.handleClick()}
                // onClick={()=>{this.props.history.push('/supplier/add-raw-material')}}
                >Add Material</Button>
                 <div className= "button-clicked">{(this.state.clicked)? <AddRawMaterial/> : ''}</div>
            </div>
            </div>
        </Router>
            )
        }

}
export default withRouter(Supplier);

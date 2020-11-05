import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../header/Header';
import PackageDetails from './PackageDetails';
import BackgroundImg from '../images/Transporterbg.jpg';

class Transporter extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonClicked: false
    }
  }
  handleClick(){
    this.setState({
      buttonClicked: true
    })
    console.log("Button Clicked");
  }
  render(){
    return (
      <Router>
        <div style= {{ backgroundImage: `url(${BackgroundImg})`,
                        backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '1000px',
                        }}>
          <Header/>
          <div className="body-container">
            <h3 style={{ textAlign: "center", color: "black" }}>Welcome Transporter!</h3>
            <Button variant="contained" color="primary" onClick = {()=> this.handleClick()}>Enter Package Details</Button>
           <div className= "button-clicked">{(this.state.buttonClicked)? <PackageDetails/> : ''}</div>
  
          </div>
        </div>
      </Router>
    );
  }

}
export default withRouter(Transporter);

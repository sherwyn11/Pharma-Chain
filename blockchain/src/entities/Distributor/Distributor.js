import React, { Component } from 'react';
import { NavLink, withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../../components/header/Header';
import Button from '@material-ui/core/Button';

class Distributor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    handleClick() {
        this.setState({
            clicked: true
        })
        console.log("Clicked");
    }

    render() {
        return (
            <Router>
                <div style={{
                    backgroundColor: "white",
                    // backgroundImage: `url(${BackgroundImg})`,
                    backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '1000px',
                }}>
                    <Header />
                    <div className="body-container">
                        <h3 style={{ textAlign: "center", color: "black" }}>Welcome Distributor!</h3>
                        <Button variant="contained" color="primary" onClick={() => this.handleClick()}>View Received Medicine</Button>
                        {/* <Button variant="contained" color="primary" onClick={()=>{this.props.history.push('/transporter/handle-package')}}>Handle Package</Button>   */}
                    </div>
                </div>
            </Router>
        );
    }
}
export default withRouter(Distributor);
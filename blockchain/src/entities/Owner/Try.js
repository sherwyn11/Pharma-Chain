
import React, {useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from '../../main_dashboard/components/Navbars/Navbar';
import Sidebar from "../../main_dashboard/components/Sidebar/Sidebar.js";

import styles from '../../main_dashboard/assets/jss/material-dashboard-react/layouts/adminStyle.js'
import bgImage from "../../main_dashboard/assets/img/sidebar-2.jpg";
import logo from "../../main_dashboard/assets/img/reactlogo.png";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import AddItem from "@material-ui/icons/AddBox";
import ViewItem from "@material-ui/icons/ViewList";
import ViewTrans from "@material-ui/icons/Visibility"; 

import AddNewUser from './AddNewUser';
import ViewUser from './ViewUser';
import OwnerDashboard from '../../main_dashboard/views/Dashboard/Dashboard';
import UserProfile from '../../main_dashboard/views/UserProfile/UserProfile';
import Maps from "../../main_dashboard/views/Maps/Maps.js";
// import routes from './ownerRoutes.js';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';

let ps;


const useStyles = makeStyles(styles);

function Try(props) {
 const [account] = useState(props.account); 
 const [supplyChain] = useState(props.supplyChain);
 console.log(props);
 console.log([account]);
 console.log([supplyChain]);
 return(
     <div>
         <h3>Try!</h3>
         <Button href="/try/view-user"> View User</Button>
         <br/>
         <Button href="/try/add-user">Add User</Button>
     </div>
 )
}
Try.propTypes = {
  windowNew: PropTypes.func,
};
 
export default Try; 
// import React, { Component } from 'react';
// import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';
// import Header from '../../components/header/Header';
// import Button from '@material-ui/core/Button';

// class Wholesaler extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             clicked: false
//         }
//     }
//     handleClick(){
//         this.setState({
//             clicked: true
//         })
//         console.log("Clicked");
//     }

//     render(){
//         return(
//         <Router>
//             <div style= {{ 
//                             backgroundColor: "white",
//                             // backgroundImage: `url(${BackgroundImg})`,
//                             backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '1000px',
//                             }}>
//             <Header/>
//             <div className="body-container">
//                 <h3 style={{ textAlign: "center", color: "black" }}>Welcome Wholesaler!</h3>
//                 <Button variant="contained" color="primary" onClick= {()=> this.handleClick()}>View Received Medicine</Button>
//                 {/* <Button variant="contained" color="primary" onClick={()=>{this.props.history.push('/transporter/handle-package')}}>Handle Package</Button>   */}
//             </div>
//             </div>
//       </Router>
//         );
//     }
// }
// export default withRouter(Wholesaler);



// *****************************************************//
import React from "react";
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
import ViewItem from "@material-ui/icons/ViewList";
import ViewTrans from "@material-ui/icons/Visibility";

import ViewReceivedMedicine from './ViewReceivedMedicine';
import WholesalerReceiveProduct from './ReceiveProduct';
import RequestProductWholesaler from './RequestProduct';
import TransferMedicine from './TransferMedicine';
import ViewResponses from '../Events/ViewResponses';
import WholesalerMedicineInfo from './WholesalerMedicineInfo';

import ViewRequests from '../Events/ViewRequests';
import ViewTransactions from '../Transactions/ViewTransactions';

import WholesalerDashboard from '../../main_dashboard/views/Dashboard/Dashboard';
import UserProfile from '../../main_dashboard/views/UserProfile/UserProfile';
import Maps from "../../main_dashboard/views/Maps/Maps.js";

// import routes from './ownerRoutes.js';

let ps;

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: WholesalerDashboard,
    layout: "/wholesaler"
  },
  {
    path: "/view-medicines",
    name: "View Received Medicine",
    icon: ViewItem,
    component: ViewReceivedMedicine,
    layout: "/wholesaler"
  },
  {
    path: "/request-product",
    name: "Request Product",
    icon: ViewItem,
    component: RequestProductWholesaler,
    layout: "/wholesaler"
  },
  {
    path: "/view-responses",
    name: "View Responses",
    icon: ViewTrans,
    component: ViewResponses,
    layout: "/wholesaler"
  },
  
  {
    path: "/transfer-medicine",
    name: "Transfer Medicine",
    icon: ViewTrans,
    component: TransferMedicine,
    layout: "/wholesaler"
  },
  {
    path: "/receive-medicine",
    name: "Receive Medicine",
    icon: ViewTrans,
    component: WholesalerReceiveProduct,
    layout: "/wholesaler"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/wholesaler"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/wholesaler"
  },

];

const useStyles = makeStyles(styles);

export default function Wholesaler({ ...rest }) {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/wholesaler") {
          return (
            <Route
              path={prop.layout + prop.path}
              render={() => (
                <prop.component account={rest.account} supplyChain={rest.supplyChain} web3={rest.web3} />
              )}
              key={key}
            />
          );
        }
        return null;
      })}
      <Route exact path="/wholesaler/view-medicine/:id" component={WholesalerMedicineInfo} />
      <Route exact path="/wholesaler/view-request/:id" component={ViewRequests} />
      <Route exact path="/wholesaler/view-transaction/:id" component={ViewTransactions} /> 
      <Redirect from="/wholesaler" to="/wholesaler/dashboard" />
    </Switch>
  );
  const classes = useStyles();
  const mainPanel = React.createRef();

  const [ image, setImage ] = React.useState(bgImage);
  const [ color, setColor ] = React.useState("blue");
  const [ fixedClasses, setFixedClasses ] = React.useState("dropdown show");
  const [ mobileOpen, setMobileOpen ] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/wholesaler/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [ mainPanel ]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Wholesaler"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) :
          (
            <div className={classes.map}>{switchRoutes}</div>
          )
        }
      </div>
    </div>
  );
}
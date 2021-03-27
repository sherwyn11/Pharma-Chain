// import React, {useState} from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, useTheme } from '@material-ui/core/styles';

// import CollectionsIcon from '@material-ui/icons/Collections';
// import ViewListIcon from '@material-ui/icons/ViewList';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

// import Button from '@material-ui/core/Button';
// import PharmaManufacturer from '../../components/images/Pharma_manufacturer.png';
// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     [theme.breakpoints.up('sm')]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// function Manufacturer(props) {
//   const { window } = props;
//   const classes = useStyles();
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <div>
//       <div className={classes.toolbar} />
//       <Divider />
//       <List>
//         <ListItem button key={'Request-Products'}>
//             <ListItemIcon>
//               <div>
//                 <ViewHeadlineIcon/>
//                 <Button href= "/manufacturer/request-product" color="inherit">{'Request-Products'}</Button>
//               </div>
//              </ListItemIcon>
//         </ListItem>
//         <ListItem button key={'View-Responses'}>
//             <ListItemIcon>
//               <div>
//                 <ViewListIcon />
//                 <Button href= "/manufacturer/view-responses" color="inherit">{'View-Responses'}</Button>
//               </div>
//              </ListItemIcon>
//         </ListItem>
//         <ListItem button key={'Receive-Product'}>
//             <ListItemIcon>
//               <div>
//                 <CollectionsIcon/>
//                 <Button href= "/manufacturer/receive-product" color="inherit">{'Receive-Product'}</Button>
//               </div>
//              </ListItemIcon>
//         </ListItem>
//         <ListItem button key={'Create-Medicine'}>
//           <ListItemIcon>
//             <div>
//               <CollectionsIcon />
//               <Button href="/manufacturer/create-medicine" color="inherit">{'Create-Medicine'}</Button>
//             </div>
//           </ListItemIcon>
//         </ListItem>
//         </List>
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar style={{ background:'cadetblue'}}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className={classes.menuButton}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap >
//             Welcome Manufacturer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         <Hidden smUp implementation="css">
//           <Drawer
//             container={container}
//             variant="temporary"
//             anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//         <Hidden xsDown implementation="css">
//           <Drawer
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             variant="permanent"
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//       </nav>
//       <main className={classes.content} style={{ backgroundImage: `url(${PharmaManufacturer})` ,backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat', height: '850px', backgroundSize: 'cover'
//     }}>
//         <div className={classes.toolbar} />
//       </main>
//     </div>
//   );
// }

// Manufacturer.propTypes = {
//   window: PropTypes.func,
// };

// export default Manufacturer;


// *******************************************************//

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
import AddItem from "@material-ui/icons/AddBox";
import ViewItem from "@material-ui/icons/ViewList";
import ViewTrans from "@material-ui/icons/Visibility";

import CreateMedicine from './CreateMedicine';
import ReceivedRawMaterial from './ReceivedRawMaterial';
import ViewReceivedRawMat from './ViewReceivedRawMat';
import ReceiveProduct from './ReceiveProduct';
import ViewResponses from '../Events/ViewResponses';
import ViewRequests from '../Events/ViewRequests';
import RequestProductManufacturer from './RequestProduct';
import ViewMedicines from './ViewMedicines';
import MedicineInfo from './MedicineInfo';
import ViewTransactions from '../Transactions/ViewTransactions';

import ManufacturerDashboard from '../../main_dashboard/views/Dashboard/Dashboard';
import UserProfile from '../../main_dashboard/views/UserProfile/UserProfile';
import Maps from "../../main_dashboard/views/Maps/Maps.js";

// import routes from './ownerRoutes.js';

let ps;

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: ManufacturerDashboard,
    layout: "/manufacturer"
  },
  {
    path: "/create-medicine",
    name: "Create Medicine",
    icon: AddItem,
    component: CreateMedicine,
    layout: "/manufacturer"
  },
  {
    path: "/view-raw-materials",
    name: "View Raw Materials",
    icon: ViewItem,
    component: ViewReceivedRawMat,
    layout: "/manufacturer"
  },
  {
    path: "/request-product",
    name: "Request Product",
    icon: ViewItem,
    component: RequestProductManufacturer,
    layout: "/manufacturer"
  },
  {
    path: "/receive-product",
    name: "Receive Product",
    icon: ViewTrans,
    component: ReceiveProduct,
    layout: "/manufacturer"
  },
  {
    path: "/view-responses",
    name: "View Response",
    icon: ViewTrans,
    component: ViewResponses,
    layout: "/manufacturer"
  },
  {
    path: "/view-medicines",
    name: "View Medicines",
    icon: ViewItem,
    component: ViewMedicines,
    layout: "/manufacturer"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/manufacturer"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/manufacturer"
  },
];

const useStyles = makeStyles(styles);

export default function Manufacturer({ ...rest }) {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/manufacturer") {
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
      <Route exact path="/manufacturer/view-raw-material/:id" component={ReceivedRawMaterial} />
      <Route exact path="/manufacturer/view-medicine/:id" component={MedicineInfo} />
      <Route exact path="/manufacturer/view-transaction/:id" component={ViewTransactions} />
      <Route exact path="/manufacturer/view-request/:id" component={ViewRequests} />
      <Redirect from="/manufacturer" to="/manufacturer/dashboard" />
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
    return window.location.pathname !== "/manufacturer/maps";
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
        logoText={"Manufacturer"}
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
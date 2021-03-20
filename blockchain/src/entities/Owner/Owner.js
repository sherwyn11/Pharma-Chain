// import React, { Component } from 'react';

// function Owner(props) {

//     return (
//         <h1>Welcome Owner</h1>
//     );

// }

// export default Owner;

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
// import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import PersonIcon from '@material-ui/icons/Person';
// import Button from '@material-ui/core/Button';
// import SampleImage from '../../components/images/sc1.jpg';
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



// function Owner(props) {
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
//         {['Add-New-User', 'View-User'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? 
//               <div>
//                 <PersonAddIcon/>
//                 <Button href= "/owner/add-new-user" color="inherit">{text}</Button>
//               </div>
//             : 
//             <div>
//                 <PersonIcon/>
//                 <Button href= "/owner/view-user" color="inherit">{text}</Button>
//             </div>
//             }
//             </ListItemIcon>
//           </ListItem>
//         ))}
//       </List>
//       {/* <Divider /> */}

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
//             Welcome Owner
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
//       <main className={classes.content} style={{ backgroundImage: `url(${SampleImage})` ,backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat', height: '850px', backgroundSize: 'contain'
//     }}>
//         <div className={classes.toolbar} />
//       </main>
//     </div>
//   );
// }

// Owner.propTypes = {
//   window: PropTypes.func,
// };

// export default Owner;
//********************************* */

////////////////////////////////////

import React, { useState } from "react";
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

import PropTypes from 'prop-types';

let ps;

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: OwnerDashboard,
    layout: "/owner"
  },
  {
    path: "/add-new-user",
    // href: "/owner/add-new-user",
    name: "Add New User",
    icon: AddItem,
    component: AddNewUser,
    layout: "/owner"
  },
  {
    path: "/view-user",
    name: "View User",
    icon: ViewItem,
    component: ViewUser,
    layout: "/owner"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/owner"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/owner"
  },
];

const useStyles = makeStyles(styles);

export default function Owner({ ...rest }) {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/owner") {
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
      <Redirect from="/owner" to="/owner/dashboard" />
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
    return window.location.pathname !== "/owner/maps";
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
        logoText={"Owner"}
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
        {/* {switchRoutes} */}
      </div>
    </div>
  );
}
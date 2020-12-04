import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AddBoxIcon from '@material-ui/icons/AddBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import Button from '@material-ui/core/Button';
import SampleImage from '../../components/images/supplier_background.jpg';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Supplier(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key={'Add-Raw-Material'}>
            <ListItemIcon>
              <div>
                <AddBoxIcon/>
                <Button href= "/supplier/add-raw-material" color="inherit">{'Add-Raw-Material'}</Button>
              </div>
             </ListItemIcon>
        </ListItem>
        <ListItem button key={'View-Raw-Materials'}>
            <ListItemIcon>
              <div>
                <ViewHeadlineIcon/>
                <Button href= "/supplier/view-raw-materials" color="inherit">{'View-Raw-Materials'}</Button>
              </div>
             </ListItemIcon>
        </ListItem>
        <ListItem button key={'View-Transactions'}>
            <ListItemIcon>
              <div>
                <ViewListIcon />
                <Button href= "/supplier/view-transactions/:id" color="inherit">{'View-Transactions'}</Button>
              </div>
             </ListItemIcon>
        </ListItem>
        <ListItem button key={'View-Requests'}>
            <ListItemIcon>
              <div>
                <VisibilityIcon/>
                <Button href= "/supplier/view-requests/:id" color="inherit">{'View-Requests'}</Button>
              </div>
             </ListItemIcon>
        </ListItem>
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ background:'cadetblue'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap >
            Welcome Supplier
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{ backgroundImage: `url(${SampleImage})` ,backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', height: '850px', backgroundSize: 'cover'
    }}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

Supplier.propTypes = {
  window: PropTypes.func,
};

export default Supplier;
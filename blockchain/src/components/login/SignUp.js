import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignIn from './SignIn';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();

  return (
    <Router>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"> Sign up</Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="fname"  name="firstName"  variant="outlined"  required
                  fullWidth id="firstName" label="First Name"autoFocus/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField variant="outlined"required fullWidth id="lastName" label="Last Name" name="lastName"
                  autoComplete="lname" />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth  id="email" label="Email Address" name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined"required fullWidth  name="password" label="Password"  type="password"
                  id="password" autoComplete="current-password" />
              </Grid>
            </Grid>
            <Button
              type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to="/signIn" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Route path="/signIn" exact component= { SignIn} />
    </Router>
  );
}
export default withRouter(SignUp);
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

import Owner from '../images/Distributer.jpg';
import Distributer from '../images/Distributer.jpg';
import Supplier from '../images/Supplier1.jpg';
import Manufacturer from '../images/Manufacturer1.jpg';
import Transporter from '../images/Transporter2.jpg';
import Wholesaler from '../images/Wholesaler.jpg';

import SignIn from '../login/SignIn';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';

const useStyles = makeStyles({
    root1: {
    maxWidth: 350,
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  root2:{
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root3:{
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root4:{
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root5:{
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root6:{
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  media: {
    height: 280,
    paddingLeft: 20,
  },
});

const handleClick =()=>{
  return(
    <div>
      <SignIn/>
    </div>
  );
}
function Cards() {
  const classes = useStyles();

  return (
  <Router>
    <Grid container>
      <Grid item md={4}>
        <Card className={classes.root1}>
          <CardActionArea>
            <CardMedia className={classes.media} image={Owner} title="Owner"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Owner </Typography>
              {/* <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
              </Typography> */}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button  href="/owner" size="small" color="primary"> Click Here </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item md={4}>
        <Card className={classes.root2}>
          <CardActionArea>
            <CardMedia className={classes.media}image={Supplier}title="Supplier"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Supplier</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href="/supplier"size="small" color="primary">Click Here</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item md={4}>
        <Card className={classes.root3}>
          <CardActionArea>
            <CardMedia className={classes.media}image={Transporter}title="Transporter"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Transporter</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href= "/transporter" size="small" color="primary">Click Here</Button>
          </CardActions>
        </Card>
      </Grid>

      <br/>
      <Grid item md={4}>
        <Card className={classes.root4}>
          <CardActionArea>
            <CardMedia className={classes.media}image={Manufacturer}title="Manufacturer"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Manufacturer</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href="/manufacturer" size="small" color="primary">Click Here</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item md={4}>
        <Card className={classes.root5}>
          <CardActionArea>
            <CardMedia className={classes.media}image={Wholesaler}title="Wholesaler"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Wholesaler</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href="/wholesaler" size="small" color="primary">Click Here</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item md={4}>
        <Card className={classes.root6}>
          <CardActionArea>
            <CardMedia className={classes.media}image={Distributer}title="Distributor"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Distributor</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href= "/distributor"size="small" color= "primary">Click Here</Button>
          </CardActions>
        </Card>
      </Grid>

    </Grid>
    </Router>
  );
}
export default Cards
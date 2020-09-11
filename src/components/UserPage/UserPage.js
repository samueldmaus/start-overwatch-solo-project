import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles'
import {Grid, Card, CardActionArea, CardHeader} from '@material-ui/core';

const styles = theme => ({
  card: {
    margin: 5,
    alignItems: 'center'
  },
  media: {
    height: 400,
    margin: 10,

  }
})

class UserPage extends Component {
  render() {
    const {classes} = this.props;

    return (
      <>
        <div>
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
          <p>Your ID is: {this.props.store.user.id}</p>
        </div>
        <Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardActionArea onClick={()=>this.props.history.push('/heroes')}>
                <CardHeader title="HEROES" />
                <img className={classes.media} src="https://bit.ly/3bDvFSa" alt="Overwatch Heroes"/>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardActionArea onClick={()=>this.props.history.push('/maps')}>
                <CardHeader title="MAPS" />
                <img className={classes.media} src="https://bit.ly/35gse2T" alt="Overwatch Maps" />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withStyles(styles)(UserPage));

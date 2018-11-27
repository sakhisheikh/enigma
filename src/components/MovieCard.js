import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Img from 'gatsby-image';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
    fontSize: 12,
  },
  card: {
    maxWidth: 175,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  overviewCard: {
    maxWidth: 500,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MovieCard extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };


  render() {
    const { classes, movie } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Card onClick={this.handleClickOpen} className={classes.card}>
          <CardActionArea>
            <Img fluid={movie.node.image.childImageSharp.fluid} />
            <CardContent>
              <Typography>
                {movie.node.name.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          fullScreen
          open={open}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClickOpen} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid
            alignItems="center"
            justify="center"
            direction="row"
            container
            item
          >
            <Grid className={classes.centered} item xs={12} md={6} lg={6}>
              <Grid item xs={12} lg={6}>
                <Card className={classes.overviewCard}>
                  <CardActionArea>
                    <CardContent>
                      <Img fluid={movie.node.image.childImageSharp.fluid} />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
            <Grid className={classes.centered} alignItems="center"
              justify="center"
              direction="row" container item xs={12} md={6} lg={6}>
              <Grid item xs={12}>
                <Typography align="center">
                  {movie.node.name.title}
                </Typography>
                <Typography align="center">
                  Overview
              </Typography>
                <Typography align="center">
                  {movie.node.name.overview}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </React.Fragment >
    );
  }
}

MovieCard.propTypes = {
  classes: PropTypes.object.isRequired,
  movieData: PropTypes.object,
};

export default withStyles(styles)(MovieCard);

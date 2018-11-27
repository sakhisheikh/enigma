import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import MovieCard from './MovieCard';
import { Typography } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
};

class Main extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState(state => { open: !state.open });
  };

  render() {
    const { classes, movieData, search, genreId } = this.props;
    let filteredList = [];

    filteredList = search || genreId ? movieData.filter(movie => new RegExp(search, 'i').test(movie.node.name.title))
      .filter(movie => genreId ? movie.node.name.genres.includes(genreId) : true) : movieData

    if (typeof filteredList == "undefined") return null; //gatby production mode

    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid
              alignItems="flex-start"
              direction="row"
              container
              className={`${classes.root}`}
              item
              spacing={8}
            >
              {filteredList.length ? filteredList.map((movie, i) => (
                <Fade in timeout={800}>
                  <Grid className={classes.centered} item xs={12} lg={2} md={3} sm={6} key={i}>
                    <Grid item xs={12}>
                      <MovieCard
                        key={i.toString()}
                        {...{ movie }}
                      />
                    </Grid>
                  </Grid>
                </Fade>
              )) : (
                  <Typography variant="h4" gutterBottom align="center">
                    Sorry we will update our list soon !
                </Typography>
                )}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  movieData: PropTypes.object,
};

export default withStyles(styles)(Main);

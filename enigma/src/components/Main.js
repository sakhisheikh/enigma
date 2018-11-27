import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';

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

    const filteredList = search || genreId ? movieData.filter(movie => new RegExp(search, 'i').test(movie.node.name.title))
      .filter(movie => genreId ? movie.node.name.genres.includes(genreId) : true) : movieData

    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid
              alignItems="flex-start"
              justify="center"
              direction="row"
              container
              className={`${classes.root}`}
              spacing={8}
            >
              {filteredList && filteredList.map((movie, i) => (
                <Grid item xs={12} lg={2} md={2} sm={12} key={i}>
                  <MovieCard
                    key={i.toString()}
                    {...{ movie }}
                  />
                </Grid>
              ))}
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

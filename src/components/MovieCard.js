import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Img from 'gatsby-image';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { MOVIE_GENRES } from '../utils/Constants';

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontSize: 12,
  },
  card: {
    maxWidth: 150,
    boxShadow: '0 0 10px rgba(0,0,0,0.85)',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 325,
    },
  },
  appBar: {
    position: 'relative',
    background: 'linear-gradient(to right, #141e30, #243b55)',
  },
  flex: {
    flex: 1,
  },
  overviewCard: {
    maxWidth: 500,
    boxShadow: '0 0 10px rgba(0,0,0,0.85)',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 350,
    },
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  title: {
    color: '#dadada',
    fontWeight: '600',
    fontSize: 13,
  },
  releaseDate: {
    color: '#0a1c1d',
    fontWeight: '600',
  },
  rating: {
    borderRadius: '50%',
    height: 81,
    width: 81,
    border: '8px solid #818181',
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#141e30',
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: '#141e30',
  },
  overviewSummary: {
    fontSize: 15,
    fontWeight: 500,
    color: '#243b55',
  },
  fixed: theme.mixins.toolbar,
  verticalGap: {
    margin: '15px 0',
  },
  movieCard: {
    padding: 10,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

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

    const genres = MOVIE_GENRES.genres.filter(genre => movie.node.name.genres.includes(genre.id));

    return (
      <React.Fragment>
        <Card onClick={this.handleClickOpen} className={classes.card}>
          <CardActionArea>
            <Img fluid={movie.node.image.childImageSharp.fluid} />
          </CardActionArea>
        </Card>
        <Typography className={classes.title}>
          {movie.node.name.title}
        </Typography>
        <Typography className={classes.releaseDate}>
          {movie.node.name.releaseDate.slice(0, 4)}
        </Typography>
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
          <div className={classes.fixed} />
          <Grid
            alignItems="center"
            justify="center"
            direction="row"
            container
            className={classes.movieCard}
            item
          >
            <Grid className={classes.centered} item xs={12} md={6} lg={6}>
              <Grid item xs={12} lg={6}>
                <Card className={classes.overviewCard}>
                  <CardActionArea>
                    <Img fluid={movie.node.image.childImageSharp.fluid} />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
            <Grid
              className={classes.centered}
              alignItems="center"
              justify="center"
              direction="row"
              container
              xs={12} md={6} lg={6}>
              <Grid container direction="row" xs={12} className={`${classes.verticalGap} ${classes.centered}`}>
                <Grid item xs={6}>
                  <Typography className={classes.overviewTitle}>
                    {movie.node.name.title}
                  </Typography>
                </Grid>
                <Grid xs={6} className={classes.centered}>
                  <div className={`${classes.rating} ${classes.centered}`}>
                    <Typography className={classes.ratingText}>
                      {movie.node.name.rating}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid className={classes.verticalGap} xs={12}>
                <Typography className={classes.overviewSummary}>
                  Overview:
              </Typography>
                <Typography>
                  {movie.node.name.overview}
                </Typography>
              </Grid>
              <Grid className={`${classes.verticalGap}`} xs={2}>
                <span>Genres: </span>
              </Grid>
              <Grid className={`${classes.verticalGap}`} xs={10}>
                {genres && genres.map((genre, i) => (
                  <Chip
                    key={i.toString()}
                    avatar={<Avatar>{genre.name.slice(0, 1).toUpperCase()}</Avatar>}
                    label={genre.name}
                    variant="outlined"
                    className={classes.chip}
                  />
                ))}
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

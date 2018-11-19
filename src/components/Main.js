import React, { Component } from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 'calc(100vh - 64px)',
  },
  tbd: {
    color: '#d1d1d1',
    fontWeight: 'bold',
  },
});

class Main extends Component {
  state = {
    value: '',
  };

  componentDidMount = () => {
    console.log("DND")
    fetch('https://api.themoviedb.org/4/list/96181?page=1&api_key=33ee74526d9cc83db3e2c3b5420f32e4')
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ value: data.results[0].original_title });
      })
  }


  handleChange = event => {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid
              alignItems="center"
              justify="center"
              direction="row"
              container
              className={`${classes.root} ${classes.demo}`}
              spacing={8}
            >
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                      </Typography>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
        </Button>
                    <Button size="small" color="primary">
                      Learn More
        </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment >
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
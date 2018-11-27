/* eslint-disable */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { Link } from '@reach/router';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from '../components/Main';
import SideBarList from '../components/SideBarList';
import { graphql } from 'gatsby';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { MOVIE_GENRES } from '../utils/Constants';
import '../components/styles.css'

const drawerWidth = 240;

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: 0,
        boxShadow: '5px 0 5px -2px #888',
      },
    },
    MuiInput: {
      root: {
        background: 'transparent',
      },
      underline: {
        "&$focused:after": {
          borderBottomColor: '#818181',
        }
      }
    },
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  appFrame: {
    height: '100vh',
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
  appBar: {
    width: '100%',
    background: 'linear-gradient(to right, #141e30, #243b55)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: 'relative',
  },
  fixed: theme.mixins.toolbar,
  toolbar: {
    height: '200px',
    backgroundColor: '#fccf5d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    '&:hover': {
      backgroundColor: '#fccf5d',
    },
  },
  content: {
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
    background: '#cf4646'
  },
  title: {
    color: '#818181',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  logo: {
    color: 'black',
    width: '100%',
    maxWidth: '100px',
    height: 'auto',
    margin: '0 auto',
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 9,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 4,
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    color: '#818181',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#818181', 0.5),
    '&:hover': {
      backgroundColor: fade('#818181', 0.75),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chip: {
    margin: theme.spacing.unit / 4,
    minWidth: 50,
  },
  genre: {
    color: '#818181',
  },
  cssFocused: {
    color: '#fccf5d',
    borderBottomColor: '#fccf5d',
    "&$focused:after": {
      borderBottomColor: '#fccf5d',
    }
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#fccf5d',
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MainLayout extends Component {
  state = {
    isDrawerOpen: false,
    search: '',
    genreName: '',
  };

  toggleDrawer = ({ isDrawerOpen }) => () => {
    this.setState({ isDrawerOpen });
  };

  handleChange = event => {
    const eventVal = event.target.value.trim();
    clearTimeout(this.inputTimer);
    // simple implementation of a "debounce" function, queuing exression for 500ms
    this.inputTimer = setTimeout(() => {
      this.setState({ search: eventVal });
    }, 500);
  };

  handleGenreChange = event => {
    const filteredGenre = event.target.value ? MOVIE_GENRES.genres.filter((genre) => new RegExp(event.target.value, 'i').test(genre.name)) : '';
    console.log("filtered", filteredGenre);
    this.setState({
      genreName: event.target.value,
      genreId: filteredGenre ? filteredGenre[0].id : '',
    })
  }

  render() {
    const { classes, data } = this.props;
    const { isDrawerOpen, search, genreName, genreId } = this.state;

    const drawer = (
      <MuiThemeProvider theme={theme}>
        <Drawer
          elevation={16}
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: isDrawerOpen,
              [classes.drawerClose]: !isDrawerOpen,
            }),
          }}
          open={isDrawerOpen}
          onKeyDown={this.toggleDrawer({ isDrawerOpen: false })}
        >
          <ListItem button component={Link} to="/" className={classes.toolbar}>
            <img
              className={classes.logo}
              src="build/public/images/logo_white.svg"
              alt=""
            />
          </ListItem>
          <SideBarList className={classes.sideList} />
        </Drawer>
      </MuiThemeProvider>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: isDrawerOpen,
              })}
            >
              <Toolbar disableGutters>
                <Grid
                  alignItems="center"
                  direction="row"
                  container
                  className={classes.root}
                  spacing={8}
                >
                  <Grid item xs={2}>
                    <IconButton
                      className={classes.title}
                      aria-label="Open drawer"
                      // onClick={this.toggleDrawer({ isDrawerOpen: !isDrawerOpen })}
                      className={`${classes.title} ${classes.menuButton}`}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={5}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        onChange={this.handleChange}
                        placeholder="Search Movies"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid className={classes.centered} item xs={5}>
                    <FormControl className={classes.formControl}>
                      <InputLabel focused={false} className={classes.genre} shrink htmlFor="age-native-label-placeholder">
                        Genre
                    </InputLabel>
                      <Select
                        displayEmpty
                        focused={false}
                        value={genreName}
                        onChange={this.handleGenreChange}
                        input={<Input id="select-multiple-chip" />}
                        classes={{
                          root: classes.cssFocused,
                          selectMenu: classes.cssUnderline,
                        }}
                        renderValue={selected => {
                          if (selected === '') {
                            return <Chip label="All" className={classes.chip} />
                          }
                          return <div className={classes.chips}>
                            <Chip key={selected} label={selected} className={classes.chip} />
                          </div>
                        }}
                        MenuProps={MenuProps}
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        {MOVIE_GENRES.genres.map(genre => (
                          <MenuItem key={genre} value={genre.name}>
                            {genre.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            {/* {drawer} */}
            <main className={classes.content}>
              <div className={classes.fixed} />
              <Main {...{ search, genreId }} movieData={data.allMovie.edges} />
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object, // Material UI Injected;
};

export default withStyles(styles)(MainLayout);

export const query = graphql`
  query MovieQuery {
    allMovie {
      edges {
        node {
          name {
            title
            rating
            overview
            genres
            releaseDate
          }
          image {
            childImageSharp {
              fluid(
                maxWidth: 700
                quality: 100
                traceSVG: { background: "#fbfafc", color: "#dbd4e2" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;

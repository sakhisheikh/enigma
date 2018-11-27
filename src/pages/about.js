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
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from '../components/Main';
import SideBarList from '../components/SideBarList';

const drawerWidth = 240;

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: 0,
        boxShadow: '5px 0 5px -2px #888',
      },
    },
  },
});

const styles = theme => ({
  root: {
    //flexGrow: 1,
    display: 'flex',
  },
  appFrame: {
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    marginLeft: theme.spacing.unit * 9 + 1,
    width: `calc(100% - ${theme.spacing.unit * 9 + 1}px)`,
    background: '#ffffff',
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
    backgroundColor: '#eee',
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
});

class MainLayout extends Component {
  state = {
    isDrawerOpen: false,
  };

  toggleDrawer = ({ isDrawerOpen }) => () => {
    this.setState({ isDrawerOpen });
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen } = this.state;

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
                <Grid item xs={5}>
                  <IconButton
                    className={classes.title}
                    aria-label="Open drawer"
                    onClick={this.toggleDrawer({ isDrawerOpen: !isDrawerOpen })}
                    className={`${classes.title} ${classes.menuButton}`}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    align="center"
                    size="large"
                    className={classes.title}
                    component={Link}
                    to="/"
                  >
                    Cinch Dashboard
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {drawer}
          <main className={classes.content}>
            <Main />
          </main>
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object, // Material UI Injected;
};

export default withStyles(styles)(MainLayout);

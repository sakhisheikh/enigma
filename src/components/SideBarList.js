import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'gatsby';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = () => ({
  root: {
    width: '100%',
    height: '100vh',
    maxWidth: 360,
    backgroundColor: '#323232',
  },
  listItem: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 1,
  },
  navItem: {
    margin: '0 25px',
  },
});

const NavLink = props => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            borderLeft: isCurrent ? '4px solid #fccf5d' : '',
            color: isCurrent ? '#fff' : '#9B9B9B',
            backgroundColor: isCurrent ? '#383838' : '#323232',
          },
        };
      }}
    />
  );
};

function SideBarList({ classes }) {
  return (
    <div className={classes.root}>
      <ListItem
        disableGutters
        className={classes.listItem}
        button
        component={NavLink}
        to="/contact"
      >
        <InboxIcon className={classes.navItem} />
        <span>Contact</span>
      </ListItem>
      <Divider />
      <ListItem
        className={classes.listItem}
        button
        disableGutters
        component={NavLink}
        to="/"
      >
        <DraftsIcon className={classes.navItem} />
        <span>Clients</span>
      </ListItem>
      <Divider />
      <ListItem
        className={classes.listItem}
        button
        disableGutters
        component={NavLink}
        to="/history"
      >
        <DraftsIcon className={classes.navItem} />
        <span>History</span>
      </ListItem>
      <Divider />
    </div>
  );
}

SideBarList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBarList);

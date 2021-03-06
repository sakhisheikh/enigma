import React from 'react';
import { Link } from 'gatsby';
import Header from '../components/Header';

export default () => (
  <div style={{ color: `teal` }}>
    <Link to="/">Home</Link>
    <Header headerText="Contact" />
    <p>You want a new movie! Send us a message!</p>
  </div>
);

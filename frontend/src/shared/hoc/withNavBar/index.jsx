/* eslint-disable func-names */
import React from 'react';
import Navbar from '../../../components/navbar';

const withNavbar = WrappedComponent => function (props) {
  return (
    <>
      <Navbar />
      <WrappedComponent
        {...props}
      />
    </>
  );
};

export default withNavbar;

import '../styles/global-styles.scss';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from '../styles/layout-style.module.scss';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  return (
    <div className={classNames.root}>
      <div className={classNames.main}>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

MyApp.propTypes = {
  Component: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

import '../styles/global-styles.scss';
import PropTypes from 'prop-types';
import Footer from '../components/footer';
import React from 'react';
import classNames from '../styles/layout-style.module.scss';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  return (
    <div className={classNames.root}>
      <div className={classNames.main}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

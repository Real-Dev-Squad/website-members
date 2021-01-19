import '../styles/global-styles.scss';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from '../styles/layout-style.module.scss';
import { AnimateSharedLayout } from 'framer-motion';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  return (
    <AnimateSharedLayout>
      <div className={classNames.root}>
        <div className={classNames.main}>
          <Component {...pageProps} />
        </div>
      </div>
    </AnimateSharedLayout>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

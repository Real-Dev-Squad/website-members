import '../styles/global-styles.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import classNames from '../styles/layout-style.module.scss';
import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import Spinner from '../components/UI/spinner';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <AnimateSharedLayout>
      <div className={classNames.root}>
        <div className={classNames.main}>
          {loading && <Spinner />}
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

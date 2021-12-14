import '@styles/global-styles.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import classNames from '@styles/layout-style.module.scss';
import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import Spinner from '@components/UI/spinner';
import { MembersProvider } from '@store';
import { UserContextProvider } from '@store/user/user-context';
import { DarkModeContextProvider } from '@store/dark-mode/dark-mode-context';

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
    <DarkModeContextProvider>
      <AnimateSharedLayout>
        <UserContextProvider>
          <MembersProvider>
            <div className={classNames.root}>
              <div className={classNames.main}>
                {loading && <Spinner />}
                <Component {...pageProps} />
              </div>
            </div>
          </MembersProvider>
        </UserContextProvider>
      </AnimateSharedLayout>
    </DarkModeContextProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};

export default MyApp;

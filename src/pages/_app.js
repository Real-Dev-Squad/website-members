import '@styles/global-styles.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import classNames from '@styles/layout-style.module.scss';
import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import Spinner from '@components/UI/spinner';
import { MembersProvider } from '@store';
import { UserContextProvider } from '@store/user/user-context';
import { SearchMemberProvider } from '@store/search-members/searchMember-context';

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
      <UserContextProvider>
        <MembersProvider>
          <SearchMemberProvider>
            <div className={classNames.root}>
              <div className={classNames.main}>
                {loading && <Spinner />}
                <Component {...pageProps} />
              </div>
            </div>
          </SearchMemberProvider>
        </MembersProvider>
      </UserContextProvider>
    </AnimateSharedLayout>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};

export default MyApp;

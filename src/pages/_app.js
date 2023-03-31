import '@styles/global-styles.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import classNames from '@styles/layout-style.module.scss';
import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import Spinner from '@components/UI/spinner';
import { MembersProvider } from '@store';
import { UserContextProvider } from '@store/user/user-context';
import { SearchMemberProvider } from '@store/search-members/searchMembers-context';
import { usePostHog } from 'next-use-posthog';
import { TaskContextProvider } from '@store/tasks/tasks-context';
import { KeyboardProvider } from '@store/keyboard/context';
import KeyboardHandler from '@components/keyboard-handler';

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

  usePostHog('phc_SRQcmzRDT5aNlAEkcrGgU2FqxKRaec66c7tdrntqAbs', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing();
    },
  });

  return (
    <AnimateSharedLayout>
      <UserContextProvider>
        <MembersProvider>
          <SearchMemberProvider>
            <TaskContextProvider>
              <KeyboardProvider>
                <KeyboardHandler>
                  <div className={classNames.root}>
                    <div className={classNames.main}>
                      {loading && <Spinner />}
                      <Component {...pageProps} />
                    </div>
                  </div>
                </KeyboardHandler>
              </KeyboardProvider>
            </TaskContextProvider>
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

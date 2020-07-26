import React, { useEffect } from 'react';
import Head from 'next/head';
import classNames from './home-page.module.scss';

const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div className={classNames.container}>
      <Head>
        <title>Members | Real Dev Squad</title>
      </Head>
      <img className={classNames.img} src="/images/Real-Dev-Squad@1x.png" alt="real-dev squad" />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
    </div>
  );
};

export default HomePage;

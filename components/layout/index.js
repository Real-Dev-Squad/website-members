import Head from 'next/head';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from 'components/footer';
import Navbar from 'components/UI/navbar';
import  classNames  from 'components/layout/index.module.scss'
import SideDrawer from 'components/UI/side-drawer';
const Layout = ({ children, title, description }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <div className={classNames.infoBody}>
      <div className={classNames.infoContent}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} close={sideDrawerToggleHandler} />
      <div className="container">
        <div>{children}</div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

Layout.defaultProps = {
  title: 'Real Dev Squad',
  description: ''
};

export default Layout;

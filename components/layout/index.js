import Head from 'next/head';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from 'components/footer';
import Navbar from 'components/UI/navbar';
import SideDrawer from 'components/UI/sideDrawer/SideDrawer';
const Layout = ({ children, title, description }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Navbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} close={sideDrawerToggleHandler} />
      <div className="container">
        <div>{children}</div>
      </div>
      <Footer />
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

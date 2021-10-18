import Head from 'next/head';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '@components/footer';
import Navbar from '@components/UI/navbar';
import SideDrawer from '@components/UI/side-drawer';
import GlobalStyles from '@components/Dark-Theme/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/components/Dark-Theme/Themes';

const Layout = ({ children, title, description }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [theme, setTheme] = useState('light');
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    const toggle = theme === 'light' ? setMode('dark') : setMode('light');
    return toggle;
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    setTheme(localTheme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div>
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <Navbar
            drawerToggleClicked={sideDrawerToggleHandler}
            theme={theme}
            themeToggler={themeToggler}
          />
          <SideDrawer open={showSideDrawer} close={sideDrawerToggleHandler} />
          <div className="container">
            <div>{children}</div>
          </div>
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

Layout.defaultProps = {
  title: 'Real Dev Squad',
  description: '',
};

export default Layout;

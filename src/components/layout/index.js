import Head from 'next/head';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '@components/footer';
import Navbar from '@components/UI/navbar';
import SideDrawer from '@components/UI/side-drawer';
import GlobalStyles from '@components/Dark-Theme/globalStyles';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from '@custom-hooks/useDarkMode';
import { lightTheme, darkTheme } from '@/components/Dark-Theme/Themes';

const Layout = ({ children, title, description }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [theme, setTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={themeMode}>
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
            themeToggler={setTheme}
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

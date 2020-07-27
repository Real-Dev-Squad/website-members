import '../styles/global-styles.scss';
import PropTypes from 'prop-types';
import Footer from '../components/footer';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  return (
    <div>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

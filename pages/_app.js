import '../styles/global-styles.scss';
import PropTypes from 'prop-types';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

MyApp.propTypes = {
  Component: PropTypes.element.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

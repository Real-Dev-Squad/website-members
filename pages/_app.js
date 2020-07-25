import '../styles/global-styles.scss';
import PropTypes from 'prop-types';

const MyApp = (props) => {
  // eslint-disable-next-line react/prop-types
  const { Component, pageProps } = props;
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

MyApp.prototype = {
  Component: PropTypes.element,
  pageProps: PropTypes.any
};

export default MyApp;

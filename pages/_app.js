import '../styles/global-styles.scss';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;

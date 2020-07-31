import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = (props) => {
  const { children, title, description } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="container">
        <div>{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string
};

Layout.defaultProps = {
  title: 'Real Dev Squad',
  description: ''
};

export default Layout;

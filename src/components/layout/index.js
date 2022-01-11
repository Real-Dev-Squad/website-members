import Head from 'next/head';
import PropTypes from 'prop-types';
import Footer from '@components/footer';
import Navbar from '@components/UI/navbar';

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
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
  description: PropTypes.string,
};

Layout.defaultProps = {
  title: 'Real Dev Squad',
  description: '',
};

export default Layout;

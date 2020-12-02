import Head from 'next/head';
import PropTypes from 'prop-types';
import Footer from 'components/footer';
import Navbar from 'components/navbar';
const Layout = (props) => {
  const { children, title, description } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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
  description: PropTypes.string
};

Layout.defaultProps = {
  title: 'Real Dev Squad',
  description: ''
};

export default Layout;

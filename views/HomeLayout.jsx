import PropTypes from 'prop-types';
import Head from 'next/head';

const HomeLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </>
  );
};

export default HomeLayout;

HomeLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

HomeLayout.defaultProps = {
  children: <></>,
  title: '',
  className: 'app',
};

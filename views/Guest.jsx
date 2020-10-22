import Proptypes from 'prop-types';
import Head from 'next/head';
import MainHeader from '../components/structure/Header';

const Guest = ({ children, pageTitle, containerClass, layoutClass }) => {
  return (
    <div className={`${containerClass} nologin`}>
      <Head>
        <title>{pageTitle + process.env.NEXT_PUBLIC_APP_TITLE}</title>
      </Head>
      <MainHeader layout="no-login" />
      <div className={`${layoutClass}`}>
        {/*<Can I="view" a="MAIN_LAYOUT">*/}
        <div className={`umana-public-content`}>{children}</div>
        {/*</Can>*/}
      </div>
    </div>
  );
};

Guest.propTypes = {
  children: Proptypes.node.isRequired,
  pageTitle: Proptypes.string,
  containerClass: Proptypes.string,
  layoutClass: Proptypes.string,
};

Guest.defaultProps = {
  children: <div>Page is empty</div>,
  pageTitle: 'container',
  containerClass: 'portada',
  layoutClass: 'umana-layout',
};

export default Guest;

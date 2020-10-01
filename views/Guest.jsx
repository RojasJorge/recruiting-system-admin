import Proptypes from 'prop-types';
import Head from 'next/head';
import MainHeader from '../components/structure/Header';

const Guest = ({ children, pageTitle, containerClass }) => {
  return (
    <div className={containerClass}>
      <Head>
        <title>{pageTitle + process.env.NEXT_PUBLIC_APP_TITLE}</title>
      </Head>
      <MainHeader layout="is-login" />
      <div className={`app--contents umana no-login ${containerClass}`}>
        {/*<Can I="view" a="MAIN_LAYOUT">*/}
        <div className={`container umana-layout`}>{children}</div>
        {/*</Can>*/}
      </div>
    </div>
  );
};

Guest.propTypes = {
  children: Proptypes.node.isRequired,
  pageTitle: Proptypes.string,
  containerClass: Proptypes.string,
};

Guest.defaultProps = {
  children: <div>Page is empty</div>,
  pageTitle: 'container',
  containerClass: 'portada',
};

export default Guest;

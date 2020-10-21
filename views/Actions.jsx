import Proptypes from 'prop-types';
import Head from 'next/head';
import UmanaLogo from "../components/Misc/UmanaLogo";

const Actions = ({children, pageTitle, containerClass}) => {
	return (
		<div className={containerClass}>
			<Head>
				<title>{pageTitle + process.env.NEXT_PUBLIC_APP_TITLE}</title>
			</Head>
			<div className={`app--contents umana no-login ${containerClass}`}>
				<div className={`container umana-layout`}>
					{/*<div style={{marginBottom: 40}}>*/}
					{/*	<UmanaLogo/>*/}
					{/*</div>*/}
					{children}
				</div>
			</div>
		</div>
	);
};

Actions.propTypes = {
	children: Proptypes.node.isRequired,
	pageTitle: Proptypes.string,
	containerClass: Proptypes.string,
};

Actions.defaultProps = {
	children: <div>Page is empty</div>,
	pageTitle: 'container',
	containerClass: 'portada',
};

export default Actions;

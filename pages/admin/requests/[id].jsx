import Layout from '../../../views/Layout'
import Single from '../../../components/Applications/Single'

const Index = query => {
	
	return (
		<Layout title={'Mi aplicación'}>
			<Single query={query}/>
		</Layout>
	);
};

Index.getInitialProps = async ctx => ctx.query

export default Index

import Layout from '../../../views/Layout';
import UserProfile from '../../../components/user/profile';

const Index = ({query}) => {
  return(
    <Layout title="Mi perfil" className="profile">
      <UserProfile query={query} />
    </Layout>
  )
};

Index.getInitialProps = async (ctx) => {
  return {query: ctx.query}
}

export default Index;

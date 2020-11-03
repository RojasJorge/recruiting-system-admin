import Layout from '../../views/Layout'
import {PageTitle} from '../../elements'
import Dashboard from "../../components/user/profile/Dashboard";

const Admin = _ => {
	return (
		<Layout title="Tablero" className="dashboard" containerClass="dashboard-page">
			<>
				<PageTitle title="Tablero"/>
				<Dashboard show={['TotalPercent', 'ModulePercent']}/>
			</>
		</Layout>
	)
}

export default Admin

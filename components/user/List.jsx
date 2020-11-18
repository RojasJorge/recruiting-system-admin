import {PageTitle} from '../../elements';
import ListCandidate from './archive/candidates';
import ListCompanies from './archive/companies';

const UsersList = () => {
	return (
		<div className="">
			<PageTitle title="Lista de usuarios"/>
			
			<ListCandidate/>
			<ListCompanies/>
		</div>
	);
};

export default UsersList;

import {useEffect, useState} from 'react';
import {useStoreState} from 'easy-peasy';
import {Steps} from 'antd';
import Personal from './personal';
import Documents from './Documents';
import About from './personal/About';
import LookingFor from './LookingFor';
import AcademicLevels from './AcademicLevels';
import Experiences from './Experiences';
import Economic from './Economic';
import Others from './Others';
import xhr from '../../../xhr';
import Courses from './Courses';
import {PageTitle, Sitebar} from '../../../elements';

const {Step} = Steps;

const checkList = [
	{
		title: 'Personal',
		id: 'personal'
	},
	{
		title: 'Documentos',
		id: 'documents'
	},
	{
		title: 'Acerca de',
		id: 'about'
	},
	{
		title: '¿Qué buscas?',
		id: 'looking-for'
	},
	{
		title: 'Niveles Académicos',
		id: 'academic-levels'
	},
	{
		title: 'Otros Cursos',
		id: 'other'
	},
	{
		title: 'Otros Conocimientos',
		id: 'other-knowledge'
	},
	{
		title: 'Experiencia Laboral',
		id: 'work-experience'
	},
	{
		title: 'Económica / Legal ',
		id: 'economic-legal'
	},
];

const UserProfile = ({query}) => {
	
	/** Global state */
	const user = useStoreState(state => state.auth.user);
	
	/** Local state */
	const [current, switchCurrent] = useState(parseInt(query.current, 10) || 0);
	
	const onChange = o => {
		switchCurrent(o);
		router.push(`${router.pathname}?current=${o}`);
	};
	
	const status = o => {
		let s = 'wait';
		if (o === current) {
			s = 'process';
		} else if (o !== current && o < current) {
			s = 'finish';
		}
		
		return s;
	};
	const [careers, addCareers] = useState([]);
	
	/** Get collection */
	const getCareers = p =>
		xhr()
			.get(`/career?page=1&offset=1000`)
			.then(resp => addCareers(resp.data.items))
			.catch(err => console.log(err));
	
	const switchStep = _ => {
		switch (current) {
			case 0:
				return <Personal switchCurrent={switchCurrent} current={current} careers={careers}/>;
				break;
			case 1:
				return <Documents switchCurrent={switchCurrent} current={current}/>;
				break;
			case 2:
				return <About switchCurrent={switchCurrent} current={current}/>;
				break;
			case 3:
				return <LookingFor switchCurrent={switchCurrent} current={current}/>;
				break;
			case 4:
				return <AcademicLevels switchCurrent={switchCurrent} current={current} careers={careers}/>;
				break;
			case 5:
				return <Courses switchCurrent={switchCurrent} current={current}/>;
				break;
			case 6:
				return <Others switchCurrent={switchCurrent} current={current}/>;
				break;
			case 7:
				return <Experiences switchCurrent={switchCurrent} current={current}/>;
				break;
			case 8:
				return <Economic switchCurrent={switchCurrent} current={current}/>;
				break;
			default:
				return <Personal switchCurrent={switchCurrent} current={current} careers={careers}/>;
				break;
		}
	};
	
	useEffect(() => {
		getCareers();
	}, []);
	
	const header = {
		title: user.name + ' ' + user.lastname,
		icon: 'person',
		action: 'remove_red_eye',
		titleAction: 'Ver perfil',
		urlAction: '/admin/profile',
	};
	
	return (
		<>
			<PageTitle title="Mi Perfil" back="/admin/companies"/>
			{/*<pre>{JSON.stringify(current, false, 2)}</pre>*/}
			<div className="umana-layout-cl">
				<div className="umana-layout-cl__small ">
					<Sitebar header={header} theme="orange"/>
					<Steps
						direction="vertical"
						size="large"
						current={current}
						onChange={onChange}
						progressDot
					>
						{checkList.map((o, i) => (
							<Step
								key={i}
								title={o.title}
								status={status(i)}
								disabled={i > current}
							/>
						))}
					</Steps>
				</div>
				<div className="umana-layout-cl__flex width-section bg-white">{switchStep()}</div>
			</div>
		</>
	);
};

export default UserProfile;

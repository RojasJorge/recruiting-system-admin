import {useStoreActions, useStoreState} from 'easy-peasy';
import {useEffect, useState} from 'react';
import xhr from '../../xhr';
import {Card, EmptyElemet} from '../../elements';
import {isEmpty} from 'lodash';
import {Can} from '../Can';
import {Input, notification, Select, Table} from 'antd';

const {Option} = Select
const {Search} = Input

const columns = [
	{
		title: 'Empresa',
		dataIndex: 'company',
		key: 'company',
		render: (text, record) => <>
			{record.company.name}
		</>
	},
	{
		title: 'Plaza',
		dataIndex: 'title',
		key: 'title'
	},
	{
		title: 'Fecha de expiración',
		dataIndex: 'expiration_date',
		key: 'expiration_date'
	},
	{
		title: 'Actions',
		dataIndex: 'id',
		key: 'id',
		render: (text, record) => {
			return (
				<>
					actions
				</>
			)
		}
	},
];

let visible = false;
const Jobs = props => {
	const list = useStoreState(state => state.jobs.list);
	const loading = useStoreState(state => state.jobs.loading)
	const fill = useStoreActions(actions => actions.jobs.fill);
	
	
	const [expiration, setExpiration] = useState([]);
	
	/**
	 * Job positions
	 */
	const [separatedJobs, setSeparatedJobs] = useState({
		available: [],
		expired: []
	});
	
	const [filters, setFilters] = useState({
		page: 1,
		offset: 10,
		jobposition: null,
		title: null
	})
	
	const collectionsActions = useStoreActions(actions => actions.collections);
	const collectionsState = useStoreState(state => state.collections);
	
	const getOptions = async () => {
		await xhr()
			.get(`/career`)
			.then(res => {
				res.type = false;
				collectionsActions.fill({data: res.data, type: 'career'});
			})
			.catch(err => console.log(err));
	};
	
	const get = () => {
		collectionsActions.get({type: 'career'});
		collectionsActions.get({type: 'academic_level'});
	};
	
	useEffect(() => {
		getJobs();
	}, [filters]);
	
	useEffect(() => {
		getOptions();
		get();
	}, [])
	
	const renderDate = date => {
		const today = new Date();
		const jobDate = new Date(date);
		
		return (today < jobDate)
	}
	
	const onSelect = _ =>
		getJobs(true)
	
	const onSearch = _ => {
		getJobs(true)
	}
	
	const getJobs = async () => {
		
		let url = `/job?page=${filters.page}&offset=${filters.offset}`
		
		if(filters.jobposition) {
			url += `&jobposition=${filters.jobposition}`
		}
		
		if(filters.title) {
			url += `&title=${filters.title}`
		}
		
		await xhr()
			.get(url)
			.then(res => {
				
				/** Do not fill if persistence*/
				if(!isEmpty(res.data.items)) {
					fill(res)
				}
				
				if (isEmpty(res.data.items)) {
					notification.warning({
						message: '404',
						description: 'No hay resultados'
					})
					
					return false
				}
				
				const available = res.data.items.reduce((acc, current) => {
					if (renderDate(current.expiration_date)) {
						acc.push(current)
					}
					
					return acc
				}, [])
				
				const expired = res.data.items.reduce((acc, current) => {
					if (!renderDate(current.expiration_date)) {
						acc.push(current)
					}
					
					return acc
				}, [])
				
				setSeparatedJobs({...separatedJobs, available, expired})
				
			})
			.catch(err => console.log(err));
	};
	
	if (!isEmpty(list)) {
		return (
			<>
				<Select
					onSelect={e => setFilters({...filters, jobposition: e})}
					showSearch>
					{
						!isEmpty(collectionsState.career)
							? collectionsState.career.map(e => (
								
								e.children ? (
									<Select.OptGroup key={e.id} label={e.name}>
										{e.children
											? e.children.map((c, i) => (
												<Select.Option key={c.id + '-' + i} value={c.id}>
													{c.name}
												</Select.Option>
											))
											: null}
									</Select.OptGroup>
								) : null
							
							))
							: <Option>No data</Option>
					}
				</Select>
				
				<Search
					onSearch={e => setFilters({...filters, title: e})}
				/>
				
				
				<div className="umana-list">
					{separatedJobs.available.length > 0 && separatedJobs.available.map((e, idx) => {
						
						// if (renderDate(e.expiration_date)) {
						return (
							<Card
								key={idx}
								title={e.title}
								link={`${localStorage.getItem('uToken') ? '/admin/jobs/single/' : '/jobs/single/'}`}
								dinamicLink={e.id}
								description={e.description}
								theme="green"
								parentInfo={e.company}
								date={{date: e.expiration_date, type: 'Expira'}}
								align="left"
							/>
						);
						// } else {
						//   setExpiration({ ...expiration, e });
						//   return null;
						// }
					})}
				</div>
				<Can I="edit" a="JOBS">
					<div className="umana-section">
						<h2>Plazas expiradas</h2>
						<Table columns={columns} dataSource={separatedJobs.expired} rowKey={record => record.id}></Table>
					</div>
				</Can>
			</>
		);
	}
	
	return (
		<div className="umana-list list-empty">
			<EmptyElemet data={props.empty}/>
		</div>
	);
};

export default Jobs;

import {useStoreActions, useStoreState} from 'easy-peasy'
import {useEffect, useState} from 'react'
import {Card, EmptyElemet} from '../../elements'
import {Pagination} from 'antd'
import xhr from '../../xhr';
import {isEmpty} from 'lodash'

const Jobs = () => {
	
	/** Local state */
	const [pager, setPager] = useState({page: 1, offset: 5})
	
	const data = useStoreState(state => state.jobs)
	const fill = useStoreActions(actions => actions.jobs.fill)
	
	const getJobs = (p, s) => xhr()
		.get(`/job?page=${p}&offset=${s}`)
		.then(res => {
			res.type = false
			/** This param (if true) loads a collection, false => single object */
			fill(res)
		})
		.catch(err => isMissing(true))
	
	useEffect(() => {
		getJobs(pager.page, pager.offset)
	}, [])
	
	const onChange = (c, s) => {
		setPager({
			page: c,
			offset: s
		})
		
		getJobs(c, s)
	}
	
	const dataEmpty = {
		title: 'No tienes ninguna plaza publicada',
		content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
		buttonTitle: 'Agregar plaza',
		url: '/admin/companies',
	}
	
	// console.log('loop', data);
	
	if (!isEmpty(data.list)) {
		return (
			<>
				<div className="umana-list">
					{data.list.map((e, idx) => (
						<Card key={idx} title={e.title} link={`/admin/jobs/single/`} dinamicLink={e.id} description={e.description}
						      theme="green" parentInfo={e.company} align="left"/>
					))}
				</div>
				
				{/*Pagination*/}
				<Pagination
					total={data.total}
					current={pager.page}
					onChange={onChange}
					onShowSizeChange={onChange}
					defaultPageSize={pager.offset}
					pageSizeOptions={['5', '10', '20']}
					showSizeChanger
				/>
			</>
		)
	}
	return (
		<div className="umana-list list-empty">
			<EmptyElemet data={dataEmpty}/>
		</div>
	)
}

export default Jobs

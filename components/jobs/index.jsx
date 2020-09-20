<<<<<<< HEAD
// import List from './List';
import Link from 'next/link';
import { Button } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { EmptyElemet, Card } from '../../elements';
=======
import {useStoreActions, useStoreState} from 'easy-peasy'
import {useEffect, useState} from 'react'
import {Card, EmptyElemet} from '../../elements'
import {Pagination} from 'antd'
>>>>>>> 691bed28316396ee45fa4b63ab09f32cca83d32c
import xhr from '../../xhr';
import {isEmpty} from 'lodash'

const Jobs = () => {
<<<<<<< HEAD
  const data = useStoreState(state => state.jobs);
  const fill = useStoreActions(actions => actions.jobs.fill);
  const [missing, isMissing] = useState(false);

  useEffect(() => {
    xhr()
      .get(`/job`)
      .then(res => {
        res.type = false;
        fill(res);
      })
      .catch(err => isMissing(true));
  }, []);

  const dataEmpty = {
    title: 'No tienes ninguna plaza publicada',
    content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/companies',
  };

  if (data.job && !isEmpty(data.job)) {
    return (
      <div className="umana-list">
        {data.job.map((e, idx) => (
          <Card key={idx} title={e.title} link={`/admin/jobs/single/`} dinamicLink={e.id} description={e.description} theme="green" parentInfo={e.company} align="left" />
        ))}
      </div>
    );
  }
  return (
    <div className="umana-list list-empty">
      <EmptyElemet data={dataEmpty} />
    </div>
  );
};

export default Jobs;
=======
	
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
>>>>>>> 691bed28316396ee45fa4b63ab09f32cca83d32c

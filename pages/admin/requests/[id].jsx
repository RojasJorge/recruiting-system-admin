import {useEffect, useState} from 'react';
import xhr from '../../../xhr';
import Layout from '../../../views/Layout';
import {Empty} from 'antd'
import Single from '../../../components/Applications/Single';
import {isEmpty} from 'lodash';

const Index = query => {
	
	/** Local state */
	const [record, updateRecord] = useState({});
	
	const getRecord = async _ =>
		await xhr()
			.get(`/apply/${query.id}`)
			.then(resp => updateRecord(resp.data.items ? resp.data.items[0] : {}))
			.catch(err => console.log(err));
	
	useEffect(() => {
		getRecord()
	}, [query.id]);
	
	return (
		<Layout title={'Mi aplicación'}>
			<>
				{
					!isEmpty(record)
						? <Single record={record}/>
						: <Empty/>
				}
			</>
		</Layout>
	);
};

Index.getInitialProps = async ctx => ctx.query

export default Index;

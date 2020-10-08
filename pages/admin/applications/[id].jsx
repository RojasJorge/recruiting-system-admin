import {useEffect, useState} from "react";
import xhr from "../../../xhr";
import Layout from "../../../views/Layout";
import {useRouter} from "next/router";
import {PageTitle} from '../../../elements'
import Single from "../../../components/Applications/Single";
import {isEmpty} from 'lodash'

const Index = _ => {
	
	const router = useRouter()
	
	/** Local state */
	const [record, updateRecord] = useState({})
	
	const getRecord = _ => xhr()
			.get(`/apply/${router.query.id}`)
			.then(resp => updateRecord(resp.data ? resp.data[0] : {}))
			.catch(err => console.log(err))
	
	useEffect(() => {
		getRecord()
	}, [router])
	
	return (
		<Layout title={'Mi aplicación'}>
			<>
				<PageTitle title="test"/>
				{!isEmpty(record) && <Single record={record} />}
			</>
		</Layout>
	)
}

export default Index

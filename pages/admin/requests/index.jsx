import Layout from '../../../views/Layout';
import {EmptyElemet, PageTitle} from '../../../elements';
import companyImg from '../../../images/welcome-company.png';
import {useEffect, useState} from "react";
import xhr from "../../../xhr";
import {isEmpty} from 'lodash'
import Applications from "../../../components/Applications";
import Filters from '../../../components/Applications/Filters'
import {Can} from '../../../components/Can'
import CandidateRequests from "../../../components/Applications/CandidateRequests";

const dataEmpty = {
	title: 'Solicitudes de los usuarios',
	content: `Debes seleccionar primero una empresa y luego una plaza para filtrar`,
	
	buttonTitle: '',
	url: '',
	img: companyImg,
};

const Index = _ => {
	
	const initialValues = {
		page: 1,
		offset: 10,
		companyId: null,
		jobId: null,
		switchCompany: false,
		switchJob: false
	}
	
	const [filters, setFilters] = useState(initialValues)
	
	const [applications, setApplications] = useState({
		list: [],
		total: 0
	})
	
	const getApply = _ => {
		
		let applyFilters = `?page=${filters.page}&offset=${filters.offset}`
		
		if (filters.companyId) {
			applyFilters += `&companyId=${filters.companyId}`
		}
		
		if (filters.jobId) {
			applyFilters += `&jobId=${filters.jobId}`
		}
		
		xhr()
			.get(`/apply${applyFilters}`)
			.then(resp => setApplications({...applications, list: resp.data}))
			.catch(err => console.log(err))
		
		return
	}
	
	useEffect(() => {
		if(filters.switchCompany || filters.switchJob) {
			getApply()
		}
	}, [
		filters.page,
		filters.offset,
		filters.companyId,
		filters.jobId,
		filters.switchCompany,
		filters.switchJob
	])
	
	return (
		<Layout title="Mis aplicaciones">
			<>
				<Can I="view" a="REQUESTS_ADMIN_VIEW">
					<PageTitle title="Mis aplicaciones"/>
					<Filters filters={filters} setFilters={setFilters} setApplications={setApplications} applications={applications}/>
					{
						!isEmpty(applications.list)
							? applications.list.map(apply => (
								<div key={apply.id}>
									<h2>{apply.name}</h2>
									<Applications
										key={apply.id}
										applications={apply.applications}
										// total={requests.total}
									/>
								</div>
							))
							: <div className="umana-list list-empty" style={{marginTop: 80}}>
								<EmptyElemet data={dataEmpty} type="orange"/>
							</div>
					}
				</Can>
				<Can I="view" a="OWN_REQUESTS">
				<CandidateRequests/>
				</Can>
			</>
		</Layout>
	)
}

export default Index

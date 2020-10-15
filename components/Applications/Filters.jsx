import {Select} from 'antd'
import styled from 'styled-components'
import xhr from "../../xhr";
import {useEffect, useState} from "react";
import {isEmpty, find} from 'lodash'

const {Option} = Select

const Container = styled.div`
	width: 100%;
	margin-bottom: 30px;
	display: inline-flex;
	flex-wrap: wrap;
`

const Col = styled.div`
	flex: 1;
	min-width: 300px;
	
	&:first-child {
		margin-right: 20px;
	}
`

const Reset = styled.h3`
	color: darkred;
	font-size: 16px;
	cursor: pointer;
`

const Filters = ({filters, setFilters, setApplications, applications}) => {
	
	const [COMPANIES, SET_COMPANIES] = useState({
		companies: [],
		jobs: [],
		company: null
	})
	
	const getCompanies = () =>
		xhr()
			.get(`/company?page=${filters.page}&offset=${filters.offset}`)
			.then(resp => {
				SET_COMPANIES({...COMPANIES, companies: resp.data.items})
			})
			.catch(err => console.log('Error get companies.', err))
	
	const getJobs = cid =>
		xhr()
			.get(`/job?page=${filters.page}&offset=${filters.offset}&company_id=${cid}`)
			.then(resp => {
				SET_COMPANIES({...COMPANIES, jobs: resp.data.items})
				setFilters({...filters, jobId: e, switchJob: true})
			})
			.catch(err => console.log('Error get jobs.', err))
	
	useEffect(() => {
		getCompanies()
	}, [filters.page, filters.offset])
	
	const onSelect = e => {
		setFilters({...filters, companyId: e, switchCompany: true})
		SET_COMPANIES({...COMPANIES, company: find(COMPANIES.companies, o => o.id === e)})
		getJobs(e)
	}
	
	return (
		<>
			<Container>
				<Col>
					<label>Empresa:</label>
					<Select
						size="large"
						placeholder="Empresa"
						onSelect={onSelect}
						value={COMPANIES.company && COMPANIES.company.id}
					>
						{
							!isEmpty(COMPANIES.companies) && COMPANIES.companies.map(company => (
								<Option value={company.id} key={company.id}>{company.name}</Option>
							))
						}
					</Select>
				</Col>
				<Col>
					<label>Plaza:</label>
					<Select
						size="large"
						placeholder="Plaza"
						disabled={isEmpty(COMPANIES.jobs)}
						onSelect={e => setFilters({...filters, jobId: e})}
					>
						{
							!isEmpty(COMPANIES.jobs) && COMPANIES.jobs.map(job => (
								<Option key={job.id} value={job.id}>{job.title}</Option>
							))
						}
					</Select>
				</Col>
			</Container>
			<Container>
				<Col>
					<Reset onClick={_ => {
						setFilters({
							...filters,
							companyId: null,
							jobId: null,
							switchCompany: false,
							switchJob: false
						})
						
						setApplications({...applications, list: [], total: 0})
						
					}
					}>Restablecer filtros</Reset>
				</Col>
			</Container>
		</>
	)
}

export default Filters

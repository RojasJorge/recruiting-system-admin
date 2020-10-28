import {Select} from 'antd'
import styled from 'styled-components'
import xhr from "../../xhr";
import {useEffect, useState} from "react";
import {delay, isEmpty} from 'lodash'
import {useRouter} from 'next/router'

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

const Filters = ({filters, setFilters, setApplications, applications, getApply}) => {
	
	const router = useRouter()
	
	const [companies, updateCompanies] = useState([])
	const [jobs, updateJobs] = useState([])
	
	const [company, setCompany] = useState(router.query.c || null)
	const [job, setJob] = useState(router.query.j || null)
	
	const getCompanies = () =>
		xhr()
			.get(`/company?page=${filters.page}&offset=${filters.offset}`)
			.then(resp => {
				updateCompanies(resp.data.items)
				
				if(router.query.c && router.query.j) {
					getJobs(router.query.c)
				}
				
			})
			.catch(err => console.log('Error get companies.', err))
	
	const getJobs = cid =>
		xhr()
			.get(`/job?company_id=${cid}`)
			.then(resp => {
				updateJobs(resp.data.items)
				setJob(null)
			})
			.catch(err => console.log('Error get jobs.', err))
	
	
	const onJobSelect = e => {
		router.push({
			query: {
				c: company,
				j: e
			}
		})
		
		setJob(e)
		getApply(company, e)
	}
	
	const onCompanySelect = e => {
		getJobs(e)
		setCompany(e)
		setJob(null)
	}
	
	useEffect(() => {
		getCompanies()
	}, [])
	
	useEffect(() => {
		if (router.query.c && router.query.j) {
			
			getApply(router.query.c, router.query.j)
			
		}
	}, [])
	
	console.log('COMPANIES:', companies, 'JOBS:', jobs)
	
	return (
		<>
			<Container>
				<Col>
					<label>Empresa:</label>
					<Select
						size="large"
						placeholder="Empresa"
						optionFilterProp="children"
						onSelect={onCompanySelect}
						value={company}
						showSearch
					>
						{
							!isEmpty(companies) && companies.map(company => (
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
						optionFilterProp="children"
						disabled={isEmpty(jobs)}
						value={router.query.j || job}
						onSelect={onJobSelect}
						showSearch
					>
						{
							!isEmpty(jobs) && jobs.map(job => (
								<Option key={job.id} value={job.id}>{job.title}</Option>
							))
						}
					</Select>
				</Col>
			</Container>
			<Container>
				<Col>
					<Reset onClick={_ => {
						setCompany(null)
						setJob(null)
						// updateCompanies([])
						updateJobs([])
						
						setApplications({...applications, list: [], total: 0})
						router.push({query: null})
						
					}
					}>Restablecer filtros</Reset>
				</Col>
			</Container>
			{/*<pre>{JSON.stringify(COMPANIES.jobs, false, 2)}</pre>*/}
		</>
	)
}

export default Filters

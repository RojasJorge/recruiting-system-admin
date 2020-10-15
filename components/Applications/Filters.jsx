import {Select} from 'antd'
import styled from 'styled-components'
import xhr from "../../xhr";
import {useCallback, useEffect, useState} from "react";
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

const Filters = ({filters, setFilters, setApplications, applications, getApply}) => {
	
	const [COMPANIES, SET_COMPANIES] = useState({
		companies: [],
		jobs: [],
	})
	
	const [company, setCompany] = useState()
	const [job, setJob] = useState()
	
	const getCompanies = () =>
		xhr()
			.get(`/company?page=${filters.page}&offset=${filters.offset}`)
			.then(resp => {
				SET_COMPANIES({...COMPANIES, companies: resp.data.items})
			})
			.catch(err => console.log('Error get companies.', err))
	
	const getJobs = cid =>
		xhr()
			.get(`/job?company_id=${cid}`)
			.then(resp => {
				SET_COMPANIES({...COMPANIES, jobs: resp.data.items})
				setJob('')
			})
			.catch(err => console.log('Error get jobs.', err))
	
	
	const onJobSelect = e => {
		setJob(e)
		getApply(company, e)
	}
	
	useEffect(() => {
		getCompanies()
	}, [])
	
	return (
		<>
			<Container>
				<Col>
					<label>Empresa:</label>
					<Select
						size="large"
						placeholder="Empresa"
						optionFilterProp="children"
						onSelect={e => {
							getJobs(e)
							setCompany(e)
							setJob()
						}}
						value={company}
						showSearch
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
						optionFilterProp="children"
						disabled={isEmpty(COMPANIES.jobs)}
						value={job}
						onSelect={onJobSelect}
						showSearch
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
						setCompany(null)
						setJob(null)
						SET_COMPANIES({...COMPANIES, jobs: []})
						
						setApplications({...applications, list: [], total: 0})
						
					}
					}>Restablecer filtros</Reset>
				</Col>
			</Container>
		</>
	)
}

export default Filters

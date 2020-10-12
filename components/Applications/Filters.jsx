import {Select} from 'antd'
import styled from 'styled-components'
import xhr from "../../xhr";
import {useEffect} from "react";
import {isEmpty} from 'lodash'

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

const Filters = ({filters, setFilters}) => {
	
	const getCompanies = () =>
		xhr()
			.get(`/company?page=${filters.page}&offset=${filters.offset}`)
			.then(resp => setFilters({...filters, companies: resp.data.items}))
			.catch(err => console.log('Error get companies.', err))
	
	useEffect(() => {
		getCompanies()
	}, [filters.page, filters.offset])
	
	return (
		<>
			<h3>Filtrar por:</h3>
			<Container>
				<Col>
					<label>Empresa:</label>
					<Select
						size="large"
						placeholder="Empresa"
						onSelect={e => setFilters({...filters, companyId: e})}
					>
						{
							!isEmpty(filters.companies) && filters.companies.map(company => (
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
					>
						<Option>Seleccione</Option>
					</Select>
				</Col>
			</Container>
			<Container>
				<Col>
					<Reset onClick={_ => setFilters({...filters, companyId: null})}>Restablecer filtros</Reset>
				</Col>
			</Container>
		</>
	)
}

export default Filters

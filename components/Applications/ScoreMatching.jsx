import PropTypes from 'prop-types'
import {useStoreActions, useStoreState} from "easy-peasy";
import {useState} from "react";
import {Progress, Tag} from "antd";
import {isArray} from 'lodash'

const ScoreMatching = ({data}) => {
	
	const match = useStoreActions(actions => actions.jobs.match)
	const [score] = useState(match({job: data.job, company: data.company, profile: data.candidate.profile}))
	
	const catalogs = useStoreState(state => state.collections)
	
	const findArea = (id, isChildren, parent) => {
		
		let result
		
		if (!isChildren) {
			const found = catalogs.career.concat(catalogs.academic_level).find(o => o.id === id)
			if (found) result = found.name
		}
		
		if (isChildren && parent) {
			let resp = false
			const p = catalogs.career.concat(catalogs.academic_level).find(o => o.id === parent)
			if (p) {
				resp = p.children.find(o => o.id === id)
			}
			
			if (resp) result = resp.name
		}
		
		return result
	}
	
	const renderJobLocation = _ => {
		
		let Location = ''
		
		if (data.job.isBranch) {
			Location = `${data.job.branch.address}, ${data.job.branch.province} - ${data.job.branch.country}`
		} else {
			Location = `${data.company.location.address}, ${data.company.location.province} - ${data.company.location.country}`
		}
		
		return Location
	}
	
	const compareLocations = _ => {
		
		let result = ''
		
		if (data.job.isBranch) {
			result = (data.job.branch.country === data.candidate.profile.fields.personal.location.country && data.job.branch.province === data.candidate.profile.fields.personal.location.province)
				? 'Aplica'
				: 'No aplica'
		} else {
			result = (data.company.location.country === data.candidate.profile.fields.personal.location.country && data.company.location.province === data.candidate.profile.fields.personal.location.province)
				? 'Aplica'
				: 'No aplica'
		}
		
		return result
	}
	
	const checkVehicles = _ => {
		
		if (data.job.vehicle[0] === 'indifferent') return []
		let vehicle = []
		
		vehicle = data.candidate.profile.fields.economic.vehicles.reduce((acc, current) => {
			if (data.job.vehicle.indexOf(current.type) !== -1) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		return vehicle
	}
	
	const checkLicence = _ => {
		
		let license = data.job.type_licence
		license = data.candidate.profile.fields.personal.driversLicenceType.reduce((acc, current) => {
			if (data.job.type_license.indexOf(current)) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		return license
	}
	
	const matchLanguages = _ => {
		
		if (score.details.languages.result.profile.length <= 0 && score.details.languages.result.job <= 0) {
			return true
		} else if (score.details.languages.result.profile.length <= 0 && score.details.languages.result.job > 0) {
			return false
		} else if (score.details.languages.result.profile.length > 0 && score.details.languages.result.job <= 0) {
			return true
		}
		
		return
	}
	
	return (
		<>
			<div className="umana-content">
				<table className="table--matching">
					<thead>
					<tr>
						<th colSpan={3} className="align-center">
							<Progress
								style={{marginBottom: 30}}
								width={150}
								strokeWidth={2}
								strokeColor="#585858"
								type="circle"
								percent={score.percent}
								format={percent => `Matching score ${percent}%`
								}
							/>
						</th>
					</tr>
					<tr>
						<th className="white">Requerimientos dela empresa</th>
						<th className="white"></th>
						<th className="align-right white">Perfil del candidato</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						{/*AREA*/}
						<td>{findArea(data.job.jobposition)}</td>
						<td className="align-center">
							<p>Área</p>
							<h3>{data.candidate.profile.fields.personal.currentJobTitle === data.job.jobposition ? '100%' : 'No aplica'}</h3>
						</td>
						<td className="align-right">{findArea(data.candidate.profile.fields.personal.currentJobTitle)}</td>
					</tr>
					<tr>
						{/*EXPERIENCE*/}
						<td>
							{score.details.experience.result.job}
						</td>
						<td className="align-center">
							<p>Años de experiencia requeridos</p>
							<h3>{score.details.experience.result.profile > score.details.experience.result.job ? 'Sobrecalificado' : 'Poca experiencia'}</h3>
						</td>
						<td className="align-right">
							{score.details.experience.result.profile}
						</td>
					</tr>
					<tr>
						{/*AGE*/}
						<td>{`${score.details.age.result.job.min} - ${score.details.age.result.job.max}`}</td>
						<td className="align-center">
							<p>Edad</p>
							<h3>{(score.details.age.result.profile >= score.details.age.result.job.min || score.details.age.result.profile <= score.details.age.result.job.max) ? '100%' : 'No aplica'}</h3>
						</td>
						<td className="align-right">{score.details.age.result.profile}</td>
					</tr>
					<tr>
						{/*Workplace*/}
						<td>{score.details.workplace.result.job}</td>
						<td>
							<p>Tipo de trabajo</p>
							<h3>{data.candidate.profile.fields.lookingFor.workplace.indexOf(data.job.workplace) !== -1 ? '100%' : 'No aplica'}</h3>
						</td>
						<td>{
							score.details.workplace.result && isArray(score.details.workplace.result.profile)
								? score.details.workplace.result.profile.map((item, key) => (
									<Tag key={key}>{item}</Tag>
								))
								: null
						}</td>
					</tr>
					<tr>
						{/*Availability*/}
						<td>{data.job.availability}</td>
						<td>
							<p>Disponibilidad</p>
							<h3>{
								data.candidate.profile.fields.lookingFor.availability.indexOf(data.job.availability) !== -1
									? 'Aplica'
									: 'No aplica'
							}</h3>
						</td>
						<td>{
							isArray(data.candidate.profile.fields.lookingFor.availability)
								?
								data.candidate.profile.fields.lookingFor.availability.map((item, key) => (
									<Tag key={key}>{item}</Tag>
								))
								: '-'
						}</td>
					</tr>
					<tr>
						{/*Location*/}
						<td>{renderJobLocation()}</td>
						<td>
							<p>Ubicación</p>
							<h3>{
								
								compareLocations()
							}</h3>
						</td>
						<td>{`${data.candidate.profile.fields.personal.location.address}, ${data.candidate.profile.fields.personal.location.province} - ${data.candidate.profile.fields.personal.location.city}`}</td>
					</tr>
					<tr>
						{/*Gender*/}
						<td>{data.job.gender}</td>
						<td>
							<p>Género</p>
							<h3>{data.job.gender === data.candidate.profile.fields.personal.gender ? 'Aplica' : 'No aplica'}</h3>
						</td>
						<td>{data.candidate.profile.fields.personal.gender}</td>
					</tr>
					<tr>
						<td>{
							isArray(data.job.religion)
								? data.job.religion.map((item, key) => (
									<Tag key={key}>{item}</Tag>
								))
								: '-'
						}</td>
						<td>
							<p>Religión</p>
							<h3>{
								isArray(data.job.religion)
									? data.job.religion.indexOf(data.candidate.profile.fields.personal.religion) !== -1
									? 'Aplica'
									: 'No aplica'
									: '-'
							}</h3>
						</td>
						<td>
							<Tag>{data.candidate.profile.fields.personal.religion}</Tag>
						</td>
					</tr>
					<tr>
						{/*Relocate*/}
						<td>{data.job.relocate ? 'Si' : 'No'}</td>
						<td>
							<p>Reubicación</p>
							<h3>
								{data.job.relocate && data.candidate.profile.fields.lookingFor.relocate ? 'Aplica' : data.candidate.profile.fields.lookingFor.relocate ? 'Aplica' : 'No aplica'}
							</h3>
						</td>
						<td>{data.candidate.profile.fields.lookingFor.relocate ? 'Si' : 'No'}</td>
					</tr>
					<tr>
						{/*Relocate*/}
						<td>{data.job.travel ? 'Si' : 'No'}</td>
						<td>
							<p>Viajes</p>
							<h3>
								{data.job.travel && data.candidate.profile.fields.lookingFor.travel ? 'Aplica' : data.candidate.profile.fields.lookingFor.travel ? 'Aplica' : 'No aplica'}
							</h3>
						</td>
						<td>{data.candidate.profile.fields.lookingFor.relocate ? 'Si' : 'No'}</td>
					</tr>
					<tr>
						{/*Vehicle*/}
						<td>{
							isArray(data.job.vehicle)
								? data.job.vehicle.map((item, key) => (
									<Tag key={key}>{item}</Tag>
								))
								: '-'
						}</td>
						<td>
							<p>Vehículo</p>
							<h3>{
								checkVehicles().length > 0 ? 'Aplica' : 'No aplica'
							}</h3>
						</td>
						<td>{
							isArray(data.candidate.profile.fields.economic.vehicles)
								? data.candidate.profile.fields.economic.vehicles.map((item, key) => (
									<Tag key={key}>{item.type} - {item.brand}</Tag>
								))
								: '-'
						}</td>
					</tr>
					<tr>
						{/*Type licence*/}
						<td>{
							isArray(data.job.type_license)
								? data.job.type_license.map((item, key) => (
									<Tag key={key}>{item}</Tag>
								))
								: '-'
						}</td>
						<td>
							<p>Tipos de licencia</p>
							<h3>{checkLicence().length > 0 ? 'Aplica' : 'No aplica'}</h3>
						</td>
						<td>{
							isArray(data.candidate.profile.fields.personal.driversLicenceType)
								? data.candidate.profile.fields.personal.driversLicenceType.map((item, key) => (
									<Tag key={key}>{item}</Tag>
								))
								: '-'
						}</td>
					</tr>
					<tr>
						{/*Languages*/}
						<td>
							{
								isArray(score.details.languages.result.job) && score.details.languages.result.job.length > 0
									? <ul>
										{
											score.details.languages.result.job.map((item, key) => (
												<li key={key}>
													<ul style={{marginBottom: 15, backgroundColor: '#f5f5f5', padding: 10}}>
														<li>Idioma: {item.language}</li>
														<li>Comprensión: {item.comprehension}</li>
														<li>Hablado: {item.speak}</li>
														<li>Escrito: {item.write}</li>
													</ul>
												</li>
											))
										}
									</ul>
									: '-'
							}
						</td>
						<td>
							<p>Idiomas</p>
							{/*<h3>{matchLanguages() ? 'Aplica' : 'No aplica'}</h3>*/}
						</td>
						<td>
							{
								isArray(score.details.languages.result.profile) && score.details.languages.result.profile.length > 0
									? <ul>
										{
											score.details.languages.result.profile.map((item, key) => (
												<li key={key}>
													<ul style={{marginBottom: 15, backgroundColor: '#f5f5f5', padding: 10}}>
														<li>Idioma: {item.language}</li>
														<li>Comprensión: {item.comprehension}</li>
														<li>Hablado: {item.speak}</li>
														<li>Escrito: {item.write}</li>
													</ul>
												</li>
											))
										}
									</ul>
									: '-'
							}
						</td>
					</tr>
					<tr>
						<td>
							<ul>{
								score.details.academic.result.job.map((item, key) => (
									<li key={key}>{findArea(item.id)} - {item.children.name}</li>
								))
							}</ul>
						</td>
						<td>
							<p>Nivel académico</p>
							{/*<h3>Aplica</h3>*/}
						</td>
						<td><ul>{
							score.details.academic.result.profile.map((item, key) => (
								<li
									key={key}>{findArea(item.academicLevel, false, false)} - {findArea(item.specialization, true, item.academicLevel)}</li>
							))
						}</ul></td>
					</tr>
					<tr>
						{/*Salary*/}
						<td>{score.details.salary.result.job}</td>
						<td>
							<p>Salario</p>
						</td>
						<td>{score.details.salary.result.profile}</td>
					</tr>
					<tr>
						<td>{
							score.details.skills.result.job.map((item, key) => (
								<Tag key={key}>{item}</Tag>
							))
						}</td>
						<td>
							<p>Habilidades</p>
						</td>
						<td>{
							score.details.skills.result.profile.map((item, key) => (
								<Tag key={key}>{item}</Tag>
							))
						}</td>
					</tr>
					</tbody>
				</table>
				{/*<h3>Job:</h3>*/}
				{/*<pre>{JSON.stringify(score, false, 2)}</pre>*/}
				{/*<h3>Profile:</h3>*/}
				{/*<pre>{JSON.stringify(data.candidate.profile.fields, false, 2)}</pre>*/}
			</div>
		</>
	)
}

ScoreMatching.propTypes = {
	data: PropTypes.shape({
		job: PropTypes.object,
		company: PropTypes.object,
		apply: PropTypes.object,
		candidate: PropTypes.object
	})
}

ScoreMatching.defaultProps = {
	data: {
		job: {},
		company: {},
		apply: {},
		candidate: {}
	}
}

export default ScoreMatching

import PropTypes from 'prop-types'
import {useStoreActions, useStoreState} from "easy-peasy";
import {useState} from "react";
import {Progress, Tag} from "antd";
import {isArray} from 'lodash'
import locale from '../../data/translates/spanish'

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
				? <h3 className="success">Aplica</h3>
				: <h3 className="nosuccess">No aplica</h3>
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
		
		let license
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
	
	// return (
	// 	<>
	// 		<div style={{display: 'flex', maxWidth: 1200, backgroundColor: '#ffffff'}}>
	// 			<div className="col" style={{width: '60%', borderRight: '1px solid grey'}}>
	// 				<h3>Data:</h3>
	// 				<pre>{JSON.stringify(data, false, 2)}</pre>
	// 			</div>
	// 			<div className="col">
	// 				<h3>Score:</h3>
	// 				<pre>{JSON.stringify(score, false, 2)}</pre>
	// 			</div>
	// 		</div>
	// 	</>
	// )
	
	return (
		<>
		<div style={{textAlign: 'center'}}>
			<Progress
				style={{margin: '0 auto 30px'}}
				width={200}
				strokeWidth={2}
				strokeColor="#585858"
				type="circle"
				percent={score.percent}
				format={percent => 	<div>
					<h2 style={percent > 65? {color: 'green', marginBottom: 0} : {color: 'red', marginBottom: 0}}>{`${percent}%`}</h2>
					Matching score 
					</div>
			
				}
			/>
		
		</div>
			<div className="umana-content content-matching ">
				<table className="table--matching">
					<thead>
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
							{data.candidate.profile.fields.personal.currentJobTitle === data.job.jobposition ? 
									<h3 className="success">100%</h3> : 
									<h3 className="noSuccess">No Aplica</h3>}
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
							{score.details.experience.result.profile > score.details.experience.result.job ? 
								<h3 className="success">Sobrecalificado</h3>
								: 
								<h3 className="noSuccess">Poca experiencia</h3>
							}
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
							{(score.details.age.result.profile >= score.details.age.result.job.min || score.details.age.result.profile <= score.details.age.result.job.max) ? 
									<h3 className="success">Aplica</h3> 
								: 
								<h3 className="nosuccess">No Aplica</h3>}
						</td>
						<td className="align-right">{score.details.age.result.profile}</td>
					</tr>
					<tr>
						{/*Workplace*/}
						<td>
							<Tag>{locale(score.details.workplace.result.job)}</Tag>
						</td>
						<td>
							<p>Lugar de trabajo</p>
							{data.candidate.profile.fields.lookingFor.workplace.indexOf(data.job.workplace) !== -1 ? 
								<h3 className="success">100%</h3>
								: 
								<h3 className="nosuccess">No aplica</h3>}
						</td>
						<td>{
							score.details.workplace.result && isArray(score.details.workplace.result.profile)
								? score.details.workplace.result.profile.map((item, key) => (
									<Tag key={key}>{locale(item)}</Tag>
								))
								: null
						}</td>
					</tr>
					<tr>
						{/*Availability*/}
						<td>
							<Tag>{locale(data.job.availability)}</Tag>
						</td>
						<td>
							<p>Disponibilidad</p>
							{
								data.candidate.profile.fields.lookingFor.availability.indexOf(data.job.availability) !== -1
									? <h3 className="success">Aplica</h3>
									: <h3 className="nosuccess">No aplica</h3>
							}
						</td>
						<td>{
							isArray(data.candidate.profile.fields.lookingFor.availability)
								?
								data.candidate.profile.fields.lookingFor.availability.map((item, key) => (
									<Tag key={key}>{locale(item)}</Tag>
								))
								: '-'
						}</td>
					</tr>
					<tr>
						{/*Location*/}
						<td>{renderJobLocation()}</td>
						<td>
							<p>Ubicación</p>
							{
								compareLocations()
							}
						</td>
						<td>{`${data.candidate.profile.fields.personal.location.address}, ${data.candidate.profile.fields.personal.location.province} - ${data.candidate.profile.fields.personal.location.city}`}</td>
					</tr>
					<tr>
						{/*Gender*/}
						<td>
							<Tag>{locale(data.job.gender)}</Tag>
						</td>
						<td>
							<p>Género</p>
							{data.job.gender === data.candidate.profile.fields.personal.gender ? 
								<h3 className="success">Aplica</h3> : 
								<h3 className="nosuccess">No aplica</h3>}
						</td>
						<td>
							<Tag>{locale(data.candidate.profile.fields.personal.gender)}</Tag>
						</td>
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
							{
								isArray(data.job.religion)
									? data.job.religion.indexOf(data.candidate.profile.fields.personal.religion) !== -1
									? 	<h3 className="success">Aplica</h3>
									: 	<h3 className="noSuccess">No Aplica</h3>
									: '-'
							}
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
						
								{data.job.relocate && data.candidate.profile.fields.lookingFor.relocate ? 
								<h3 className="success">Aplica</h3> : 
								data.candidate.profile.fields.lookingFor.relocate ? 
								<h3 className="success">Aplica</h3> : <h3 className="noSuccess">No Aplica</h3>}
							
						</td>
						<td>{data.candidate.profile.fields.lookingFor.relocate ? 'Si' : 'No'}</td>
					</tr>
					<tr>
						{/*Relocate*/}
						<td>{data.job.travel ? 'Si' : 'No'}</td>
						<td>
							<p>Viajes</p>
								{data.job.travel && data.candidate.profile.fields.lookingFor.travel ? 
									<h3 className="success">Aplica</h3> : 
									data.candidate.profile.fields.lookingFor.travel ? 
									<h3 className="success">Aplica</h3> : 
									<h3 className="noSuccess">No Aplica</h3>}
							
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
							{
								checkVehicles().length > 0 ? <h3 className="success">Aplica</h3> : <h3 className="nosuccess">No aplica</h3>
							}
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
							{checkLicence().length > 0 ? <h3 className="success">Aplica</h3> : <h3 className="success">No aplica</h3>}
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
								score.details.languages.result && isArray(score.details.languages.result.job) && score.details.languages.result.job.length > 0
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
			</div>
			
				{/*<div style={{display: 'flex', maxWidth: 1200, backgroundColor: '#ffffff'}}>*/}
				{/*	<div className="col" style={{width: '60%', borderRight: '1px solid grey'}}>*/}
				{/*		<h3>Data:</h3>*/}
				{/*		<pre>{JSON.stringify(data, false, 2)}</pre>*/}
				{/*	</div>*/}
				{/*	<div className="col">*/}
				{/*		<h3>Score:</h3>*/}
				{/*		<pre>{JSON.stringify(score, false, 2)}</pre>*/}
				{/*	</div>*/}
				{/*</div>*/}
			
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

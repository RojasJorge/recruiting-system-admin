import {action, thunk} from 'easy-peasy'
import {orderBy} from 'lodash'
import store from './index'
import moment from 'moment'

export default {
	job: null,
	list: [],
	total: 0,
	
	/**
	 * Filter the colection
	 */
	
	fill: action((state, payload) => {
		state.list = orderBy(payload.data.items, ['name', 'created_at'], ['asc', 'desc'])
		state.total = payload.data.total
	}),
	match: thunk((actions, payload) => {
		const {job, company, profile: {fields}} = payload
		
		let matchScore = {
			workplace: {result: null, score: 0},
			availability: {result: null, score: 0},
			country: {result: null, score: 0},
			province: {result: null, score: 0},
			gender: {result: null, score: 0},
			age: {result: null, score: 0},
			religion: {result: null, score: 0},
			experience: {result: null, score: 0},
			relocate: {result: null, score: 0},
			travel: {result: null, score: 0},
			vehicle: {result: null, score: 0},
			type_licence: {result: null, score: 0},
			languages: {result: null, score: 0},
			academic: {result: null, score: 0},
			salary: {result: null, score: 0},
			skills: {result: null, score: 0}
		}
		
		/**
		 * 1.-
		 * @type {boolean}
		 */
		const availability = fields.lookingFor.availability.indexOf(job.availability) !== -1
		// if (availability) matchScore = {...matchScore, availability: 10}
		if(availability) {
			matchScore.availability.result = availability
			matchScore.availability.score = 10
		}
		
		/**
		 * 2.-
		 * @type {boolean}
		 */
		const workplace = fields.lookingFor.workplace.indexOf(job.workplace) !== -1
		// if (workplace) matchScore = {...matchScore, workplace: 7}
		if(workplace) {
			matchScore.workplace.result = workplace
			matchScore.workplace.score = 7
		}
		
		
		/**
		 * 3.-
		 * @type {boolean}
		 */
		let country = false
		let province = false
		
		if (job.isBranch) {
			country = job.branch.country === fields.personal.location.country
			province = job.branch.province === fields.personal.location.province
		} else {
			country = company.location.country === fields.personal.location.country
			province = company.location.province === fields.personal.location.province
		}
		
		// if (country) matchScore = {...matchScore, country: 10}
		// if (province) matchScore = {...matchScore, province: 10}
		
		if(country) {
			matchScore.country.result = country
			matchScore.country.score = 10
		}
		
		if(province) {
			matchScore.province.result = province
			matchScore.province.score = 10
		}
		
		
		/**
		 * 5.-
		 * @type {number|string}
		 */
		const gender = job.gender = fields.personal.gender
		// if (gender) matchScore = {...matchScore, gender: 3}
		
		if(gender) {
			matchScore.gender.result = gender
			matchScore.gender.score = 3
		}
		
		
		/**
		 * 6.-
		 * @private
		 */
		const _age = store.dispatch.tools.calculateAge(fields.personal.birthday)
		if (_age >= job.age.min && _age <= job.age.max) {
			// matchScore = {...matchScore, age: 3}
			matchScore.age.result = {job: job.age, profile: _age}
			matchScore.age.score = 3
		}
		
		
		
		/**
		 * 7.-
		 * @type {boolean}
		 */
		const religion = job.religion.indexOf(fields.personal.religion) !== -1
		// if (religion) matchScore = {...matchScore, religion: 3}
		
		if(religion) {
			matchScore.religion.result = religion
			matchScore.religion.score = 3
		}
		
		
		/**
		 * 8.-
		 */
		const jobposition = fields.working.experiences.find(o => o.area == job.jobposition)
		
		let years = 0
		if (jobposition) {
			years = moment(jobposition.dateEnd).diff(jobposition.dateInit, 'years', false)
			// if (years >= job.experience) matchScore = {...matchScore, experience: 3}
			
			if (years >= job.experience) {
				matchScore.experience.result = years
				matchScore.experience.score = 3
			}
		}
		
		/**
		 * 9.-
		 */
		if (job.relocate && fields.lookingFor.relocate) {
			matchScore.relocate.result = {job: job.relocate, profile: fields.lookingFor.relocate}
			matchScore.relocate.score = 3
			// matchScore = {...matchScore, relocate: 3}
		}
		
		/**
		 * 10.-
		 */
		if (job.travel && fields.lookingFor.travel) {
			matchScore.travel.result = {job: job.travel, profile: fields.lookingFor.travel}
			matchScore.travel.score = 4
			// matchScore = {...matchScore, travel: 4}
		}
		
		
		/**
		 * 11.-
		 */
		const vehicle = fields.economic.vehicles.reduce((acc, current) => {
			if (job.vehicle.indexOf(current.type) !== -1) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		// if (vehicle.length > 0) matchScore = {...matchScore, vehicle: 3}
		
		if(vehicle.length > 0) {
			matchScore.vehicle.result = vehicle
			matchScore.vehicle.score = 3
		}
		
		
		/**
		 * 12.-
		 */
		const licence_type = fields.personal.driversLicenceType.reduce((acc, current) => {
			if (job.type_license.indexOf(current)) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		// if (licence_type.length > 0) matchScore = {...matchScore, type_licence: 3}
		
		if(licence_type.length > 0) {
			matchScore.type_licence.result = licence_type
			matchScore.type_licence.score = 3
		}
		
		
		/**
		 * 13.-
		 * @type {*[]}
		 */
		const languages = fields.others.languages.reduce((acc, current) => {
			
			if (typeof job.languages === 'undefined') return acc
			
			const found = job.languages.find(o => o.language === current.language)
			if (found && current.comprehension >= found.comprehension && current.speak >= found.speak && current.write >= found.write) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		// if (languages.length > 0) matchScore = {...matchScore, languages: 8}
		
		if(languages.length > 0) {
			matchScore.languages.result = languages
			matchScore.languages.score = 8
		}
		
		
		/**
		 * 14.-
		 * @type {boolean}
		 */
		const salary = job.salary.base_min >= fields.economic.desiredSalary.baseMin
		// if (salary) matchScore = {...matchScore, salary: 10}
		
		if(salary) {
			matchScore.salary.result = salary
			matchScore.salary.score = 10
		}
		
		/**
		 * 15.-
		 */
		const academic = fields.academic.studies.reduce((acc, current) => {
			const found = job.academic_level.find(o => {
				if (o.id === current.academicLevel || o.id === current.specialization) {
					return o
				}
			})
			
			if (found) acc.push(found)
			
			return acc
		}, [])
		
		// if (academic.length > 0) matchScore = {...matchScore, academic: 10}
		
		if(academic.length > 0) {
			matchScore.academic.result = academic
			matchScore.academic.score = 10
		}
		
		
		/**
		 * 16.-
		 */
		const jobSkills = job.skills.map(o => actions.removeAccents(o))
		
		const profileSkills = fields.others.skills.reduce((acc, current) => {
			const el = actions.removeAccents(current)
			
			if (jobSkills.indexOf(el) !== -1) acc.push(el)
			
			return acc
		}, [])
		
		if (profileSkills.length > 0) {
			matchScore.skills.result = profileSkills
			matchScore.skills.score = 10
		}
		
		console.log('Match Score:', matchScore)
		
		/** Sum all items from matchScore */
		const SUM = Object.values(matchScore).reduce((acc, current) => {
			const sc = current.score
			acc = (acc + sc)
			return parseInt(acc, 10)
		}, 0)
		
		return SUM
	}),
	
	removeAccents: thunk((actions, payload) => {
		return payload.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	})
}

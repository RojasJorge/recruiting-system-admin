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
			workplace: 0,
			availability: 0,
			country: 0,
			province: 0,
			gender: 0,
			age: 0,
			religion: 0,
			experience: 0,
			relocate: 0,
			travel: 0,
			vehicle: 0,
			type_licence: 0,
			languages: 0,
			academic: 0,
			salary: 0,
			skills: 0
		}
		
		/**
		 * 1.-
		 * @type {boolean}
		 */
		const availability = fields.lookingFor.availability.indexOf(job.availability) !== -1
		if (availability) matchScore = {...matchScore, availability: 10}
		
		/**
		 * 2.-
		 * @type {boolean}
		 */
		const workplace = fields.lookingFor.workplace.indexOf(job.workplace) !== -1
		if (workplace) matchScore = {...matchScore, workplace: 7}
		
		
		/**
		 * 3.-
		 * @type {boolean}
		 */
		let country = false
		let province = false
		
		if(job.isBranch) {
			country = job.branch.country === fields.personal.location.country
			province = job.branch.province === fields.personal.location.province
		} else {
			country = company.location.country === fields.personal.location.country
			province = company.location.province === fields.personal.location.province
		}
		
		if (country) matchScore = {...matchScore, country: 10}
		if (province) matchScore = {...matchScore, province: 10}
		
		
		/**
		 * 5.-
		 * @type {number|string}
		 */
		const gender = job.gender = fields.personal.gender
		if (gender) matchScore = {...matchScore, gender: 3}
		
		
		/**
		 * 6.-
		 * @private
		 */
		const _age = store.dispatch.tools.calculateAge(fields.personal.birthday)
		if (_age >= job.age.min && _age <= job.age.max) matchScore = {...matchScore, age: 3}
		
		
		/**
		 * 7.-
		 * @type {boolean}
		 */
		const religion = job.religion.indexOf(fields.personal.religion) !== -1
		if (religion) matchScore = {...matchScore, religion: 3}
		
		
		/**
		 * 8.-
		 */
		const jobposition = fields.working.experiences.find(o => o.area == job.jobposition)
		
		let years = 0
		if (jobposition) {
			years = moment(jobposition.dateEnd).diff(jobposition.dateInit, 'years', false)
			if (years >= job.experience) matchScore = {...matchScore, experience: 3}
		}
		
		/**
		 * 9.-
		 */
		if (job.relocate && fields.lookingFor.relocate) matchScore = {...matchScore, relocate: 3}
		
		/**
		 * 10.-
		 */
		if (job.travel && fields.lookingFor.travel) matchScore = {...matchScore, travel: 4}
		
		
		/**
		 * 11.-
		 */
		const vehicle = fields.economic.vehicles.reduce((acc, current) => {
			if (job.vehicle.indexOf(current.type) !== -1) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		if (vehicle.length > 0) matchScore = {...matchScore, vehicle: 3}
		
		
		/**
		 * 12.-
		 */
		const licence_type = fields.personal.driversLicenceType.reduce((acc, current) => {
			if (job.type_license.indexOf(current)) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		if (licence_type.length) matchScore = {...matchScore, type_licence: 3}
		
		
		/**
		 * 13.-
		 * @type {*[]}
		 */
		const languages = fields.others.languages.reduce((acc, current) => {
			
			if(typeof job.languages === 'undefined') return acc
			
			const found = job.languages.find(o => o.language === current.language)
			if (found && current.comprehension >= found.comprehension && current.speak >= found.speak && current.write >= found.write) {
				acc.push(current)
			}
			
			return acc
		}, [])
		
		if (languages.length > 0) matchScore = {...matchScore, languages: 8}
		
		
		/**
		 * 14.-
		 * @type {boolean}
		 */
		const salary = job.salary.base_min >= fields.economic.desiredSalary.baseMin
		if (salary) matchScore = {...matchScore, salary: 10}
		
		
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
		
		if (academic.length > 0) matchScore = {...matchScore, academic: 10}
		
		
		/**
		 * 16.-
		 */
		const jobSkills = job.skills.map(o => actions.removeAccents(o))
		
		const profileSkills = fields.others.skills.reduce((acc, current) => {
			const el = actions.removeAccents(current)
			
			if(jobSkills.indexOf(el) !== -1) acc.push(el)
				
				return acc
		}, [])
		
		if(profileSkills.length > 0) matchScore = {...matchScore, skills: 10}
		
		// console.log('Match payload:', payload)
		
		/** Sum all items from matchScore */
		return Object.values(matchScore).reduce((acc, current) => {
			acc = (acc + current)
			return acc
		}, 0)
	}),
	
	removeAccents: thunk((actions, payload) => {
		return payload.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	})
}

import {action} from "easy-peasy";

export default {
	personal: false,
	academic: false,
	economic: false,
	lookingFor: false,
	others: false,
	working: false,
	
	verify: action((state, payload) => {
		
		if (!payload) return false;
		
		const {
			personal,
			academic,
			economic,
			lookingFor,
			others,
			working
		} = payload /** payload = auth.user.profile.fields */
		
		/** Validate [personal] object */
		if (
			personal.currentJobTitle.length > 0 &&
			personal.birthday.length > 0 &&
			personal.email.length > 0 &&
			personal.gender.length > 0 &&
			personal.lastname.length > 0 &&
			personal.name.length > 0 &&
			personal.location.address.length > 0 &&
			personal.location.city.length > 0 &&
			personal.location.country.length > 0 &&
			personal.location.province.length > 0 &&
			personal.location.zone > 0 &&
			personal.maritalStatus.length > 0 &&
			personal.nationality.length > 0 &&
			personal.phones.length > 0 &&
			personal.religion.length > 0
		) {
			state.personal = true
		} else {
			state.personal = false
		}
		
		/** Validate [academic] object */
		if (
			academic.courses.length > 0 &&
			academic.studies.length > 0
		) {
			state.academic = true
		} else {
			state.academic = false
		}
		
		/** Validate [academic] object */
		if (
			economic.currentSalary > 1000 &&
			// economic.currentSalaryCurrency !== '' &&
			economic.desiredSalary.baseMax > 0 &&
			economic.desiredSalary.baseMin > 0 &&
			economic.desiredSalary.currency.length > 0 &&
			economic.typeHousing.length > 0
		) {
			state.economic = true
		} else {
			state.economic = false
		}
		
		/** Validate [lookingFor] object */
		if (
			lookingFor.availability.length > 0
			// lookingFor.workplace.length > 0
		) {
			state.lookingFor = true
		} else {
			state.lookingFor = false
		}
		
		/** Validate [others] object */
		if (
			others.skills.length > 0
		) {
			state.others = true
		} else {
			state.others = false
		}
		
		/** Validate [working] object */
		if (
			working.experiences.length > 0
		
		) {
			state.working = true
		} else {
			state.working = false
		}
	})
	
};

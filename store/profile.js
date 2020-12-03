import { action } from 'easy-peasy';

export default {
  personal: false,
  academic: true,
  economic: false,
  lookingFor: false,
  others: true,
  working: true,

  verify: action((state, payload) => {
    if (!payload) return false;

    const { personal, academic, economic, lookingFor, others, working } = payload; /** payload = auth.user.profile.fields */

    /** Validate [personal] object */
    if (
      personal.name.length > 0 &&
      personal.lastname.length > 0 &&
      personal.currentJobTitle.length > 0 &&
      personal.location.address.length > 0 &&
      personal.location.city.length > 0 &&
      personal.location.country.length > 0 &&
      personal.location.province.length > 0 &&
      personal.birthday.length > 0
      // personal.gender.length > 0 &&
      // personal.email.length > 0
      // personal.about.length > 0
    ) {
      state.personal = true;
    } else {
      state.personal = false;
    }

    /** Validate [academic] object */
    // if (academic.studies.length > 0) {
    //   state.academic = true;
    // } else {
    //   state.academic = false;
    // }

    /** Validate [academic] object */
    if (
      economic.currentSalary > 0 &&
      // economic.currentSalaryCurrency !== '' &&
      economic.desiredSalary.baseMax > 0 &&
      economic.desiredSalary.baseMin > 0 &&
      // economic.desiredSalary.currency.length > 0 &&
      economic.typeHousing.length > 0
    ) {
      state.economic = true;
    } else {
      state.economic = false;
    }

    /** Validate [lookingFor] object */
    if (
      lookingFor.availability.length > 0
      // lookingFor.workplace.length > 0
    ) {
      state.lookingFor = true;
    } else {
      state.lookingFor = false;
    }

    /** Validate [others] object */
    if (others.skills.length > 0) {
      state.others = true;
    } else {
      state.others = false;
    }

    /** Validate [working] object */
    if (working.experiences.length > 0) {
      state.working = true;
    } else {
      state.working = false;
    }
  }),
};

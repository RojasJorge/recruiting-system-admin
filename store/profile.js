import {
	action
} from "easy-peasy";

export default {
	steps: {
		academic: {},
		documents: {},
		economic: {},
		lookingFor: {},
		others: {},
		personal: {
			name: "",
			lastname: "",
			phones: [],
		},
		working: {}
	},
	
	/** Profile updater */
	update: action((state, payload) => state.steps = {
			...state.steps,
			[payload.field]: payload.value
		}
	)
};

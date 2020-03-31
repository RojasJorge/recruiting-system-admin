import {
	thunk,
	action
} from "easy-peasy";

import countries from "../assets/misc/locations.json";

const tools = {
	countries,
	
	makeRandomId: thunk((actions, payload) => {
		let rand = "";
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let charactersLength = characters.length;
		for (var i = 0; i < payload; i++) {
			rand += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		
		return rand;
	}),
	slugify: thunk((actions, payload) => {
		payload = payload.replace(/^\s+|\s+$/g, ""); // trim
		payload = payload.toLowerCase();
		
		// remove accents, swap ñ for n, etc
		var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to = "aaaaaaeeeeiiiioooouuuunc------";
		
		for (var i = 0, l = from.length; i < l; i++) {
			payload = payload.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
		}
		
		payload = payload
			.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
			.replace(/\s+/g, "-") // collapse whitespace and replace by -
			.replace(/-+/g, "-") // collapse dashes
			.replace(/^-+/, "") // trim - from start of text
			.replace(/-+$/, ""); // trim - from end of text
		
		return payload;
	})
};

export default tools;

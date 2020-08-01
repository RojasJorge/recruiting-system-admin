import {thunk, action} from 'easy-peasy'
import countries from '../assets/misc/locations.json'

export default {
	countries,
	makeRandomId: thunk((actions, payload) => {
		let rand = ''
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let charactersLength = characters.length
		
		for (var i = 0; i < payload; i++) {
			rand += characters.charAt(Math.floor(Math.random() * charactersLength))
		}
		
		return rand
	}),
	slugify: thunk((actions, payload) => {
		payload = payload.replace(/^\s+|\s+$/g, "")
		payload = payload.toLowerCase()
		
		// remove accents, swap ñ for n, etc
		var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;"
		var to = "aaaaaaeeeeiiiioooouuuunc------"
		
		for (var i = 0, l = from.length; i < l; i++) {
			payload = payload.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
		}
		
		payload = payload
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-+/, "")
			.replace(/-+$/, "")
		
		return payload
	})
}

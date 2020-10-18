import {thunk} from 'easy-peasy'
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
	}),
	
	calculateAge: thunk((actions, payload) => {
		// console.log('payload:', payload.toString())
		// birthday is a date
		const birthday = new Date(payload.toString())
		const ageDifMs = Date.now() - birthday.getTime();
		const ageDate = new Date(ageDifMs); // miliseconds from epoch
		
		// console.log('Age:', Math.abs(ageDate.getUTCFullYear() - 1970))
		
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}),
	
	/**
	 * To binary
	 */
	toBinary: thunk((actions, {file}) => {
		console.log('File:', file)
		// convert base64 to raw binary data held in a string
		var byteString = atob(file.split(',')[1]);
		
		// separate out the mime component
		var mimeString = file.split(',')[0].split(':')[1].split(';')[0];
		
		// write the bytes of the string to an ArrayBuffer
		var arrayBuffer = new ArrayBuffer(byteString.length);
		var _ia = new Uint8Array(arrayBuffer);
		for (var i = 0; i < byteString.length; i++) {
			_ia[i] = byteString.charCodeAt(i);
		}
		
		var dataView = new DataView(arrayBuffer);
		var blob = new Blob([dataView], {type: mimeString});
		return blob;
	})
}

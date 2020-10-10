import React, {useEffect} from "react";
import axios from 'axios'

const Index = _ => {
	
	const onSubmit = event => {
		event.preventDefault()
		event.target.submit()
	}
	
	useEffect(() => {
		axios.get('https://storage.umana.co/media').then(resp => console.log(resp)).catch(err => console.log(err))
	}, [])
	
	return(
		<div>
			<form onSubmit={onSubmit} action="http://localhost:30012" method="POST" encType="multipart/form-data">
				<input type="file" name="file"/>
				<input type="submit" value="Enviar"/>
			</form>
		</div>
	)
}

export default Index

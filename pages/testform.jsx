import React from "react";

const Index = _ => {
	
	const onSubmit = event => {
		event.preventDefault()
		event.target.submit()
	}
	
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

import {useState} from "react";
import {Checkbox, Input, Select} from "antd";
import styled from 'styled-components'

const {Option} = Select

const Label = styled.label`
	display: block;
`

const Health = ({value = {}, onChange}) => {
	
	const initVal = Object.keys(value).length > 0
		? value
		: {
			haveDisease: false,
			disease: '',
			tattoOrPiercing: false,
			whatTattoOrPiercing: ''
		}
	
	const [values, setValues] = useState(initVal)
	
	const triggerOnChange = (val) => {
		if (onChange) {
			onChange({
				...values,
				...val
			})
		}
	}
	
	const handleChange = (e, type) => {
		setValues({
			...values,
			[type]: e
		})
		
		triggerOnChange({
			[type]: e
		})
	}
	
	return (
		<div style={{
			marginTop: 24
		}}>
			<div className="row" style={{marginBottom: 20}}>
				<div className="col-md-4">
					<Label htmlFor="haveDisease">Tiene enfermedades?</Label>
					<Checkbox
						onChange={e => handleChange(e.target.checked, 'haveDisease')}
						checked={values.haveDisease}
					/>
				</div>
				
				<div className="col-md-8">
					<Label htmlFor="disease">Enfermedad</Label>
					<Input
						onChange={e => handleChange(e.target.value, 'disease')}
						value={values.disease}
						size="large"
						disabled={!values.haveDisease}
					/>
				</div>
			</div>
			
			<div className="row">
				<div className="col-md-4">
					<Label htmlFor="tattoOrPiercing">Tatuajes/Aretes</Label>
					<Checkbox
						onChange={e => handleChange(e.target.checked, 'tattoOrPiercing')}
						checked={values.tattoOrPiercing}
					/>
				</div>
				<div className="col-md-8">
					<Label htmlFor="whatTattoOrPiercing">Especifíque</Label>
					<Input
						onChange={e => handleChange(e.target.value, 'whatTattoOrPiercing')}
						value={values.whatTattoOrPiercing}
						size="large"
						disabled={!values.tattoOrPiercing}
					/>
				</div>
			</div>
		
		</div>
	)
}

export default Health

import {useState} from "react";
import {Input, InputNumber, Select, Checkbox} from "antd";
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
			tattoOrPiercing: false
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
		<div className="row" style={{
			marginTop: 24
		}}>
			<div className="col-md-12">
				<Label htmlFor="haveDisease">Tiene enfermedades?</Label>
				<Checkbox
					onChange={e => handleChange(e.target.checked, 'haveDisease')}
					checked={values.haveDisease}
				/>
			</div>
			<div className="col-md-12">
				<Label htmlFor="disease">Enfermedad</Label>
				<Input
					onChange={e => handleChange(e.target.value, 'disease')}
					value={values.disease}
					size="large"
				/>
			</div>
			<div className="col-md-12">
				<Label htmlFor="tattoOrPiercing">Tatuajes/Aretes</Label>
				<Checkbox
					onChange={e => handleChange(e.target.checked, 'tattoOrPiercing')}
					checked={values.tattoOrPiercing}
				/>
			</div>
		</div>
	)
}

export default Health

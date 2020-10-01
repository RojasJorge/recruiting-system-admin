import {useState} from "react";
import {Input, InputNumber, Select, Checkbox} from "antd";
import styled from 'styled-components'

const {Option} = Select

const Label = styled.label`
	display: block;
	
`

const Legal = ({value = {}, onChange}) => {
	
	const initVal = Object.keys(value).length > 0
		? value
		: {
			legalProblem: false,
			whatProblem: '',
			infonetOrOther: false
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
				<Label htmlFor="legalProblem">Problemas legales?</Label>
				<Checkbox
					onChange={e => handleChange(e.target.checked, 'legalProblem')}
					checked={values.legalProblem}
				/>
			</div>
			<div className="col-md-12">
				<Label htmlFor="whatProblem">Que tipo de problema?</Label>
				<Input
					onChange={e => handleChange(e.target.value, 'whatProblem')}
					value={values.whatProblem}
					size="large"
				/>
			</div>
			<div className="col-md-12">
				<Label htmlFor="infonetOrOther">Infornet u otros?</Label>
				<Checkbox
					onChange={e => handleChange(e.target.checked, 'infonetOrOther')}
					checked={values.infonetOrOther}
				/>
			</div>
		</div>
	)
}

export default Legal

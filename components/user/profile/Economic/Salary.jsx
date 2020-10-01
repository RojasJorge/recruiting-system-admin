import {useState} from "react";
import {Input, InputNumber} from "antd";

const Salary = ({value = {}, onChange}) => {
	
	const initVal = Object.keys(value).length > 0
		? value
		: {
			currency: '',
			baseMin: 0,
			baseMax: 0
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
		<>
			<div className="col-md-6">
				<label htmlFor="currency">Moneda</label>
				<Input
					onChange={e => handleChange(e.target.value, 'currency')}
					value={values.currency}
					size="large"
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="baseMin">Mínimo deseado</label>
				<InputNumber
					onChange={e => handleChange(e, 'baseMin')}
					value={values.baseMin}
					min={0}
					size="large"
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="baseMax">Máximo deseado</label>
				<InputNumber
					onChange={e => handleChange(e, 'baseMax')}
					value={values.baseMax}
					min={0}
					size="large"
				/>
			</div>
		</>
	)
}

export default Salary

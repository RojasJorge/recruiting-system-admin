import PropTypes from "prop-types";
import {Form, InputNumber, Select, Divider} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

const Salary = ({update}) => {
	
	/** Success handler */
	const onFinish = data => {
	
	}
	
	/** Error handler */
	const onFinishFailed = error => {
	
	}
	
	return (
		<>
			{/*<Form*/}
			{/*	name="salary"*/}
			{/*	initialValues={{min: 100}}*/}
			{/*	onFinish={onFinish}*/}
			{/*	onFinishFailed={onFinishFailed}*/}
			{/*>*/}
				<Divider orientation="left">Sueldo deseado</Divider>
				<div className="col">
					<label htmlFor="currency">Moneda:</label>
					<FormItem
						name="currency"
						rules={[{required: true, message: "El campo Moneda es requerido."}]}
					>
						<Select size="large" placeholder="Seleccione" style={{width: '100%'}}>
							<Option value="GTQ" key={1}>
								Quetzal
							</Option>
						</Select>
					</FormItem>
				</div>
				<div className="col">
					<label htmlFor="currency">Mínimo:</label>
					<FormItem
						name="min"
						rules={[{required: true, message: "El campo Monto Mínimo es requerido."}]}
					>
						<InputNumber size="large" style={{width: '100%'}}/>
					</FormItem>
				</div>
				<div className="col">
					<label htmlFor="max">Máximo:</label>
					<FormItem
						name="max"
						rules={[{required: true, message: "El campo Monto Máximo es requerido."}]}
					>
						<InputNumber size="large" style={{width: '100%'}}/>
					</FormItem>
				</div>
			{/*</Form>*/}
		</>
	)
};

Salary.propTypes = {
	update: PropTypes.func
};

Salary.defaultProps = {
	update: () => {
	}
};

export default Salary;

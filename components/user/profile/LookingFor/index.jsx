import {useStoreActions} from "easy-peasy";
import {Form, Select, Button, Switch} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";

const {Item} = Form;
const {Option} = Select;

const LookingFor = _ => {
	
	const update = useStoreActions(action => action.profile.update);
	
	const onFinish = fields => {
		update({
			field: "lookingFor",
			value: fields
		});
	};
	
	return (
		<>
			<Form
				onFinish={onFinish}
				initialValues={{
					relocate: false,
					abailability_travel: false
				}}
			>
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="job_type">Tipo de plaza:</label>
								<Item
									name="job_type"
									rules={[{required: true, message: "Tipo de plaza es requerido."}]}
								>
									<Select size="large" placeholder="Seleccione">
										<Option value="freelance">Independiente</Option>
										<Option value="practicing">Prácticas</Option>
										<Option value="temporal">Temporal</Option>
										<Option value="full_time">Tiempo completo</Option>
										<Option value="part_time">Medio tiempo</Option>
										<Option value="vacationer">Vacacionista</Option>
									</Select>
								</Item>
							</div>
						</div>
					</div>
					<div className="col-md-12">
						<label htmlFor="relocate">¿Está dispuesto a reubicarse?:</label>
						<Item name="relocate" valuePropName="checked">
							<Switch
								checkedChildren="Si"
								unCheckedChildren="No"
							/>
						</Item>
					</div>
					<div className="col-md-12">
						<label htmlFor="abailability_travel">¿Disponibilidad para viajar?:</label>
						<Item name="abailability_travel" valuePropName="checked">
							<Switch
								checkedChildren="Si"
								unCheckedChildren="No"
							/>
						</Item>
					</div>
				</div>
				<Item>
					<Button
						icon={<DoubleRightOutlined/>}
						type="primary"
						htmlType="submit"
						size="large">Confirmar y continuar</Button>
				</Item>
			</Form>
		</>
	);
};

export default LookingFor;

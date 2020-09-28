import {useStoreActions, useStoreState} from "easy-peasy";
import {Button, Form, notification, Select, Switch} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import xhr from "../../../../xhr";
import router from "next/router";

const {Item} = Form;
const {Option} = Select;

const LookingFor = ({switchCurrent, current}) => {
	
	/** Global state */
	const {
		profile: {
			id,
			fields: {
				lookingFor
			}
		},
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const onFinish = fields => {
		// console.log('lookingFor:', fields)
		// return true;
		let merged = Object.assign(lookingFor, fields)
		
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					lookingFor: fields
				}
			}))
			.then(resp => {
				updateProfile({type: 'lookingFor', fields: merged})
				
				/** Send notification success */
				notify('success', 'Ficha Que buscas actualizada.', 'Vamos al siguiente paso...')
				switchCurrent((current + 1))
				router.push(`${router.router.pathname}?current=${(current + 1)}`)
			})
			.catch(err => console.log('Error:', err))
	};
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description
		})
	}
	
	return (
		<>
			<Form
				onFinish={onFinish}
				initialValues={lookingFor}
			>
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="availability">Tipo de plaza:</label>
								<Item
									name="availability"
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
						<label htmlFor="travel">¿Disponibilidad para viajar?:</label>
						<Item name="travel" valuePropName="checked">
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

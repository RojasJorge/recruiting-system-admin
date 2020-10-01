import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {Button, Form, Input, InputNumber, Select, Divider, notification} from 'antd'
import {useStoreActions, useStoreState} from "easy-peasy";
import xhr from "../../../../xhr";
import router from "next/router";

const {Item, List} = Form

const Others = _ => {
	
	/** Global state */
	const {
		profile: {
			id,
			fields: {
				others
			}
		},
		
	} = useStoreState(state => state.auth.user)
	
	/** Personal info */
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const onFinish = fields => {
		
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					others: fields
				}
			}))
			.then(resp => {
				updateProfile({type: 'others', fields})
				
				/** Send notification success */
				notify('success', 'Ficha Otros actualizada.', '')
			})
			.catch(err => console.log('Error:', err))
		
	}
	
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
				initialValues={others}
			>
				<div className="row" style={{width: '100%'}}>
					<div className="col-md-12">
						<label htmlFor="softwares">Software</label>
						<Item
							name="softwares"
						>
							<Select mode="tags"/>
						</Item>
					</div>
					<div className="col-md-12">
						<label htmlFor="skills">Habilidades</label>
						<Item
							name="skills"
						>
							<Select mode="tags"/>
						</Item>
					</div>
				</div>
				<Divider orientation="left">Lenguajes</Divider>
				<div className="row">
					<div className="col-md-12">
						<p>
							Indíca que lenguajes hablas con su porcentaje:
						</p>
					</div>
				</div>
				<List name="languages">
					{(fields, {add, remove}) => {
						return (
							<>
								{
									fields.map(field => (
										<fieldset key={field.key} style={{
											width: '100%',
											marginBottom: 24,
											backgroundColor: '#f5f5f5',
											padding: 24
										}}>
											<div className="row align-items-center">
												<div className="col-md-11">
													<div className="row">
														<div className="col-md-6">
															<label htmlFor="language">Lenguaje</label>
															<Item
																{...field}
																name={[field.name, 'language']}
																fieldKey={[field.fieldKey, 'language']}
																rules={[{
																	required: true,
																	message: 'Debes agregar un nombre'
																}]}
															>
																<Input/>
															</Item>
														</div>
														<div className="col-md-6">
															<label htmlFor="comprehension">Comprensión</label>
															<Item
																{...field}
																name={[field.name, 'comprehension']}
																fieldKey={[field.fieldKey, 'comprehension']}
																rules={[{
																	required: true,
																	message: 'Debes agregar un porcentaje'
																}]}
															>
																<InputNumber min={0}/>
															</Item>
														</div>
														<div className="col-md-6">
															<label htmlFor="speak">Hablado</label>
															<Item
																{...field}
																name={[field.name, 'speak']}
																fieldKey={[field.fieldKey, 'speak']}
																rules={[{
																	required: true,
																	message: 'Debes agregar un porcentaje'
																}]}
															>
																<InputNumber min={0}/>
															</Item>
														</div>
														<div className="col-md-6">
															<label htmlFor="write">Comprensión</label>
															<Item
																{...field}
																name={[field.name, 'write']}
																fieldKey={[field.fieldKey, 'write']}
																rules={[{
																	required: true,
																	message: 'Debes agregar un porcentaje'
																}]}
															>
																<InputNumber min={0}/>
															</Item>
														</div>
													</div>
												</div>
												<div className="col">
													<MinusCircleOutlined
														onClick={() => {
															remove(field.name);
														}}
													/>
												</div>
											</div>
										</fieldset>
									))
								}
								
								<div className="row" style={{width: '100%'}}>
									<div className="col-md-12">
										<Button.Group>
											<Button
												type="dashed"
												icon={<PlusOutlined/>}
												onClick={() => {
													add();
												}}
												block
											>
												Agregar lenguaje
											</Button>
											<Button
												htmlType="submit"
												type="dashed"
											>
												Guardar
											</Button>
										</Button.Group>
									</div>
								</div>
							
							</>
						)
					}}
				</List>
			</Form>
		</>
	)
}

export default Others

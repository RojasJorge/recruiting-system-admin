import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {Button, Checkbox, Divider, Form, Input, InputNumber, notification, Select} from 'antd'
import Salary from "./Salary";
import {useState} from "react";
import Health from "./Health";
import Legal from './Legal'
import {useStoreActions, useStoreState} from "easy-peasy";
import xhr from "../../../../xhr";
import router from "next/router";

const {Item, List} = Form
const {Option} = Select

const Economic = ({current, switchCurrent}) => {
	
	const [checks, updateChecks] = useState({
		otherIncomes: false
	})
	
	/** Global state */
	let {
		profile: {
			id,
			fields: {
				economic
			}
		},
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const onFinish = fields => {
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					economic: fields
				}
			}))
			.then(resp => {
				updateProfile({type: 'economic', fields})
				
				/** Send notification success */
				notify('success', 'Experiencia laboral.', 'Actualizado correctamente..')
				switchCurrent((current + 1))
				router.push(`${router.router.pathname}?current=${(current + 1)}`)
			})
			.catch(err => notify('error', 'Error', 'Ha ocurrido un error, intenta de nuevo más tarde'))
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
				initialValues={economic}
			>
				<div className="row">
					<div className="col-md-12">
						<label htmlFor="currentSalary">Salario actual</label>
						<Item
							name="currentSalary"
						>
							<InputNumber size="large"/>
						</Item>
					</div>
					<div className="col-md-12">
						<label htmlFor="desiredSalary">Salario deseado</label>
						<Item name="desiredSalary">
							<Salary/>
						</Item>
					</div>
					<div className="col-md-6">
						<label htmlFor="otherIncome">Otros ingresos?</label>
						<Item
							name="otherIncome"
							valuePropName="checked"
						>
							<Checkbox onChange={e => updateChecks({...checks, otherIncomes: e.target.checked})}/>
						</Item>
						{
							checks.otherIncomes
								? <>
									<div>
										<label htmlFor="otherIncomeValue">Escriba monto</label>
										<Item
											name="otherIncomeValue"
										>
											<InputNumber size="large"/>
										</Item>
									</div>
									<div>
										<label htmlFor="sourceIncome">Escriba la fuente</label>
										<Item
											name="sourceIncome"
										>
											<Input size="large"/>
										</Item>
									</div>
								</>
								: null
						}
					</div>
					<div className="col-md-12">
						<Divider orientation="left">Deudas</Divider>
						<List name="debts">
							{(fields, {add, remove}) => {
								return (
									<>
										{
											fields.map(field => (
												<fieldset
													key={field.key}
													style={{
														marginBottom: 24,
														backgroundColor: '#f5f5f5',
														padding: 24
													}}
												>
													<div className="row align-items-center">
														<div className="col-md-11">
															<div className="row">
																<div className="col-md-12">
																	<label htmlFor="whatCompany">Que empresa</label>
																	<Item
																		name={[field.name, 'whatCompany']}
																		fieldKey={[field.fieldKey, 'whatCompany']}
																		rules={[{
																			required: true,
																			message: 'Escriba el nombre de la empresa'
																		}]}
																	>
																		<Input size="large"/>
																	</Item>
																</div>
																<div className="col-md-12">
																	<label htmlFor="amount">Monto</label>
																	<Item
																		name={[field.name, 'amount']}
																		fieldKey={[field.fieldKey, 'amount']}
																		rules={[{
																			required: true,
																			message: 'Escriba el monto'
																		}]}
																	>
																		<InputNumber size="large"/>
																	</Item>
																</div>
																<div className="col-md-12">
																	<label htmlFor="monthlyFee">Pago mensual</label>
																	<Item
																		name={[field.name, 'monthlyFee']}
																		fieldKey={[field.fieldKey, 'monthlyFee']}
																		rules={[{
																			required: true,
																			message: 'Escriba el monto mensual'
																		}]}
																	>
																		<InputNumber size="large"/>
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
										
										<Button
											type="dashed"
											icon={<PlusOutlined/>}
											onClick={() => {
												add();
											}}
										>
											Agregar deudas
										</Button>
									
									</>
								)
							}}
						</List>
					</div>
					<div className="col-md-6">
						<label htmlFor="typeHousing">Tipo de vivienda</label>
						<Item
							name="typeHousing"
						>
							<Select>
								{
									[{
										name: 'own',
										translation: 'Casa propia'
									}, {
										name: 'family',
										translation: 'Familiar'
									}, {
										name: 'rented',
										translation: 'Renta'
									}].map((op, index) => (
										<Option key={index} value={op.name}>{op.translation}</Option>
									))
								}
							</Select>
						</Item>
					</div>
					<div className="col-md-6">
						<label htmlFor="dependents">Dependientes</label>
						<Item
							name="dependents"
						>
							<InputNumber min={0} size="large"/>
						</Item>
					</div>
					<div className="col-md-12">
						<Divider orientation="left">Vehículos</Divider>
						<List name="vehicles">
							{
								(fields, {add: addVehicle, remove: removeVehicle}) => {
									return (
										<>
											{
												fields.map(field => (
													<fieldset
														key={field.key}
														style={{
															marginBottom: 24,
															backgroundColor: '#f5f5f5',
															padding: 24
														}}>
														<div className="row align-items-center">
															<div className="col-md-11">
																<div className="row">
																	<div className="col-md-6">
																		<label htmlFor="type">Tipo</label>
																		<Item
																			name={[field.name, 'type']}
																			fieldKey={[field.fieldKey, 'type']}
																			rules={[{
																				required: true,
																				message: 'El tipo es requerido'
																			}]}
																		>
																			<Select size="large">
																				{
																					[{
																						name: 'motorcycle',
																						translation: 'Moto'
																					}, {
																						name: 'car',
																						translation: 'Carro'
																					}].map((op, index) => (
																						<Option key={index} value={op.name}>{op.translation}</Option>
																					))
																				}
																			</Select>
																		</Item>
																	</div>
																	<div className="col-md-6">
																		<label htmlFor="brand">Marca</label>
																		<Item
																			name={[field.name, 'brand']}
																			fieldKey={[field.fieldKey, 'brand']}
																			rules={[{
																				required: true,
																				message: 'Marca de vehículo es requerido'
																			}]}
																		>
																			<Input size="large"/>
																		</Item>
																	</div>
																	<div className="col-md-6">
																		<label htmlFor="brand">Año</label>
																		<Item
																			name={[field.name, 'year']}
																			fieldKey={[field.fieldKey, 'year']}
																			rules={[{
																				required: true,
																				message: 'Año del vehículo es requerido'
																			}]}
																		>
																			<InputNumber min={1899} size="large"/>
																		</Item>
																	</div>
																	<div className="col-md-2">
																		<label htmlFor="brand">Aún debe?</label>
																		<Item
																			name={[field.name, 'debts']}
																			fieldKey={[field.fieldKey, 'debts']}
																			valuePropName="checked"
																		>
																			<Checkbox/>
																		</Item>
																	</div>
																	<div className="col-md-4">
																		<label htmlFor="brand">Monto</label>
																		<Item
																			name={[field.name, 'amount']}
																			fieldKey={[field.fieldKey, 'amount']}
																		>
																			<InputNumber min={0} size="large"/>
																		</Item>
																	</div>
																</div>
															</div>
															<div className="col">
																<MinusCircleOutlined
																	onClick={() => {
																		removeVehicle(field.name);
																	}}
																/>
															</div>
														</div>
													</fieldset>
												))
											}
											
											<Button
												type="dashed"
												icon={<PlusOutlined/>}
												onClick={() => {
													addVehicle();
												}}
											>
												Agregar vehículo
											</Button>
										
										</>
									)
								}
							}
						</List>
					</div>
					<div className="col-md-12">
						<Item name="health">
							<Health/>
						</Item>
					</div>
					<div className="col-md-12">
						<Item name="legal">
							<Legal/>
						</Item>
					</div>
					<div className="col-md-12" style={{marginTop: 60}}>
						<Item
							name="allowed"
							// rules={[{
							// 	required: true,
							// 	message: 'Es necesario '
							// }]}
							valuePropName="checked"
						>
							<Checkbox/>
						</Item>
					</div>
					<div className="col-md-12">
						<p>
							Autorizo expresamente a las empresas que distribuyen o comercializan con datos
							personales, para que distribuyan / comercialicen estudios que contengan datos personales concernientes a
							mi persona, a efecto
							de verificar la información proporcionada; y autorizo que mis datos personales sean compartidos /
							distribuidos
							a empresas que presten servicios de información personal: según los artículos
							9 numeral y 64 Ley de Acceso a la Información Pública, 19, 21, 22, 28, 46. Ley contra Lavado de Dinero y
							Otros Activos y 12 y 20 de su Reglamento:
							50, 55, 56, 58. Ley de Bancos y Grupos Financieros entre otros. Doy fe que la información
							proporcionada es verdadera y queda a disposición de ser verificada por UMANA RH.
						</p>
					</div>
					<div className="col-md-12">
						<Button
							type="dahsed"
							htmlType="submit"
						>
							Guardar
						</Button>
					</div>
				</div>
			</Form>
		</>
	)
}


export default Economic

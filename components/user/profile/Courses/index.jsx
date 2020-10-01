import {MinusCircleOutlined, PlusOutlined, SaveOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, notification} from "antd";
import styled from "styled-components";
import {useStoreActions, useStoreState} from "easy-peasy";
import xhr from "../../../../xhr";
import moment from "moment";

const {Item, List} = Form

const Wrap = styled.fieldset`
	margin-bottom: 30px;
	padding: 24px;
	background-color: #f5f5f5;
`

const AddRow = styled(Button)`
	margin: 0px;
`

const Courses = _ => {
	
	/** Global state */
	let {
		profile: {
			id,
			fields: {
				academic
			}
		},
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const onFinish = fields => {
		
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					academic: {
						courses: fields.courses
					}
				}
			}))
			.then(resp => {
				updateProfile({type: 'academic', fields: Object.assign(academic, {courses: fields.courses})})
				
				/** Send notification success */
				notify('success', 'Niveles académicos.', 'Actualizado correctamente..')
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
	
	const initialValues = _ => {
		if (academic && academic.courses.length > 0) {
			academic.courses.map((row, index) => {
				row.year = moment(row.year)
				return row
			})
			return academic
		} else {
			return {
			
			}
		}
	}
	
	// const dateFormat = 'DD/MM/YYYY'
	
	return (
		<>
			<Form
				onFinish={onFinish}
				initialValues={initialValues()}
			>
				<List name="courses">
					{(fields, {add, remove}) => {
						return (
							<>
								{
									fields.map(field => (
										<Wrap key={field.key}>
											<div className="row align-items-center">
												<div className="col-md-11">
													<div className="row">
														<div className="col-md-12">
															<label htmlFor="establishment">Establecimiento:</label>
															<Item
																{...field}
																name={[field.name, 'establishment']}
																fieldkey={[field.fieldKey, 'establishment']}
																rules={[{required: true, message: "Establecimiento es requerido."}]}
															>
																<Input/>
															</Item>
														</div>
														<div className="col-md-12">
															<label htmlFor="collegiate">Título:</label>
															<Item
																{...field}
																name={[field.name, 'titleCourse']}
																fieldkey={[field.fieldKey, 'titleCourse']}
																rules={[{required: true, message: "Título del curso es requerido."}]}
															>
																<Input/>
															</Item>
														</div>
														<div className="col-md-6">
															<label htmlFor="country">País:</label>
															<Item
																{...field}
																name={[field.name, 'country']}
																fieldkey={[field.fieldKey, 'country']}
																rules={[{required: true, message: "País es requerido."}]}
															>
																<Input/>
															</Item>
														</div>
														<div className="col-md-6">
															<label htmlFor="year">Año:</label>
															<Item
																{...field}
																name={[field.name, 'year']}
																fieldkey={[field.fieldKey, 'year']}
																rules={[{required: true, message: "Año es requerido"}]}
															>
																<DatePicker
																	picker="year"
																	style={{width: '100%'}}
																	size="large"
																/>
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
										</Wrap>
									))
								}
								
								<Button.Group>
									{/*Add button*/}
									<AddRow
										type="dashed"
										onClick={() => {
											add();
										}}
										block
									>
										<PlusOutlined/> Agregar
									</AddRow>
									
									{/*Submit button*/}
									<Button
										size="small"
										type="dashed"
										htmlType="submir"
										icon={<SaveOutlined/>}
									>Guardar
									</Button>
								</Button.Group>
							
							</>
						)
					}}
				</List>
			</Form>
		</>
	);
};

export default Courses;

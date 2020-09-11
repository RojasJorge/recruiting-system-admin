import xhr from '../../xhr'
import {Form, Input, Button, Alert} from 'antd'
import Layout from '../../views/Layout'
import 'cleave.js/dist/addons/cleave-phone.gt'
import Cleave from 'cleave.js/react'

const {Item} = Form
const {Password} = Input

const CreateAdmin = _ => {
	
	const onFinish = fields => {
		console.log('Fields:', fields)
	}
	
	return (
		<Layout title="Crear administrador">
			<div className="row">
				<div className="col-md-12">
					<h1>Crear un administrador</h1>
				</div>
				<div className="col-md-12">
					<Alert
						style={{
							marginBottom: 30
						}}
						description="Los administradores no necesitan un perfil como las empresas y candidatos"
						showIcon/>
				</div>
			</div>
			<Form
				onFinish={onFinish}
				className="row justify-content-center"
			>
				<div className="col-md-9">
					<div className="row">
						<div className="col-md-12">
							<Item
								name="email"
								label="Correo electrónico"
								rules={[{
									required: true,
									message: 'El correo electrónico es requerido'
								}, {
									type: 'email',
									message: 'No es un correo electrónico válido'
								}]}
								hasFeedback
							>
								<Input size="large"/>
							</Item>
						</div>
						<div className="col-md-6">
							<Item
								name="name"
								label="Nombre"
								rules={[{
									required: true,
									message: 'El nombre es requerido'
								}]}
								hasFeedback
							>
								<Input size="large"/>
							</Item>
						</div>
						<div className="col-md-6">
							<Item
								name="lastname"
								label="Apellido"
								rules={[{
									required: true,
									message: 'El apellido es requerido'
								}]}
								hasFeedback
							>
								<Input size="large"/>
							</Item>
						</div>
						<div className="col-md-6">
							<Item
								name="password"
								label="Contraseña"
								rules={[{
									required: true,
									message: "La contraseña no cumple con los requisitos"
								}]}
								hasFeedback
							>
								<Password size="large" style={{height: 45}}/>
							</Item>
						</div>
						<div className="col-md-6">
							<Item
								name="phone"
								label="Teléfono"
							>
								<Cleave
									className="ant-input ant-input-lg"
									options={{
										phone: true,
										phoneRegionCode: 'GT',
									}}
									name="phone"
									onChange={e => console.log(e.target.value)}
								/>
							</Item>
						</div>
						<div className="col-md-12" style={{marginTop: 30}}>
							<Item>
								<Button type="primary" htmlType="submit">Confirmar y guardar</Button>
							</Item>
						</div>
					</div>
				</div>
			</Form>
		</Layout>
	)
}

export default CreateAdmin

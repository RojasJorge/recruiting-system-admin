import Actions from '../views/Actions'
import {Alert, Button, Form, Input} from 'antd'
import xhr from "../xhr";
import {useRef, useState} from "react";
import RequestNewPassword from "../components/Misc/RequestNewPassword";

const ResetPassword = query => {
	
	const [response, setResponse] = useState({
		status: false,
		message: '',
		type: 'info'
	})
	
	const form = useRef()
	
	const onFinish = fields => {
		xhr()
			.put(`/reset-password`, JSON.stringify({
				hash: query.q,
				password: fields.password
			}))
			.then(resp => setResponse({
				...response,
				status: true,
				message: 'Contraseña actualizada exitosamente',
				type: 'success'
			}))
			.catch(err => setResponse({
				...response,
				status: true,
				message: 'Este link ha expirado',
				type: 'error'
			}))
	}
	
	const resetForm = _ => form.current.resetFields()
	
	return (
		<Actions pageTitle="Restablecer contraseña">
			{response.status && <Alert
				style={{marginBottom: 30}}
				message={response.message}
				type={response.type}
			/>}
			<Form
				onFinish={onFinish}
				className="row align-items-center justify-content-center"
				ref={form}
			>
				<div className="col-md-12">
					<div style={{textAlign: 'center', marginBottom: 30}}>
						<img src="/umana-logo.jpg" alt=""/>
					</div>
				</div>
				<div className="col-md-12" style={{marginBottom: 30, textAlign: 'center'}}>
					<h3>Recuperar cuenta</h3>
				</div>
				<div className="col-md-4">
					<Form.Item
						name="password"
						label="Nueva contraseña"
						rules={[{
							required: true,
							message: 'El campo es requerido'
						}]}
					>
						<Input.Password size="large"/>
					</Form.Item>
					<Button htmlType="submit">Enviar</Button>
				
				</div>
			</Form>
			<div style={{marginTop: 30}}>
				<RequestNewPassword linkText="Solicitar reset de nuevo"/>
			</div>
		</Actions>
	)
}

/** Access to the router query and pass it to the primary instance */
ResetPassword.getInitialProps = async ctx => ctx.query

export default ResetPassword

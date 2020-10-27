import {Alert, Form, Input, Modal, Button} from 'antd'
import xhr from "../../xhr";
import {useState} from "react";
import PropTypes from 'prop-types'

const RequestNewPassword = ({linkText, elementType}) => {
	
	const [visible, switchModal] = useState(false)
	
	const [response, setResponse] = useState({
		status: false,
		message: '',
		type: 'info'
	})
	
	const onFinish = fields => {
		xhr()
			.post('/reset-password', JSON.stringify(fields))
			.then(resp => setResponse({
				...response,
				status: true,
				message: 'Te hemos enviado un correo electrónico con el nuevo link',
				type: 'success'
			}))
			.catch(err => {
				
				setResponse({
					...response,
					status: true,
					message: err.response.status === 404 ? 'Esa cuenta no existe.' : 'Ha ocurrido un error, intenta de nuevo más tarde.',
					type: 'error'
				})
			})
	}
	
	return (
		<>
			<Button
				onClick={_ => switchModal(!visible)}
				size="small"
				type="link"
			>{linkText}</Button>
			<Modal
				visible={visible}
				title="Restablecer contraseña"
				onCancel={_ => {
					setResponse({...response, status: false, message: ''})
					switchModal(!visible)
				}}
				footer={null}
			>
				{
					response.status && <div style={{marginBottom: 20, width: '100%'}}>
						<Alert
							style={{marginBottom: 30}}
							type={response.type}
							message={response.message}
							showIcon
						/>
					</div>
				}
				<Form
					onFinish={onFinish}
					validateTrigger="onBlur"
				>
					<p>Ingresa el correo electrónico asociado con la cuenta.</p>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: 'El campo email es requerido'
							},
							{
								type: 'email',
								message: 'Debes ingresar un correo electrónico válido.'
							}
						]}
					>
						<Input size="large"/>
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit">Enviar solicitud</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

RequestNewPassword.propTypes = {
	linkText: PropTypes.string,
	elementType: PropTypes.string
}

RequestNewPassword.defaultProps = {
	linkText: 'He olvidado mi contraseña',
	elementType: 'h3'
}

export default RequestNewPassword

import {Form, Input} from 'antd';
import Phones from './Phones';

const {Item} = Form;

const Contact = ({phones, setPhones}) => {
	
	return (
		<div className="umana-form--section">
			<h2 style={{width: '100%'}}>Información de Contacto</h2>
			
			<Item
				label="Correo electrónico"
				className="form-item--lg"
				name="email"
				rules={[{message: 'Es requerido que ingrese un email/válido.', type: 'email'}]}
			>
				<Input size="large" disabled/>
			</Item>
			
			<h3 style={{width: '100%', marginTop: 20}}>Números telefónicos</h3>
			
			<Phones phones={phones} setPhones={setPhones}/>
		</div>
	);
};

export default Contact;

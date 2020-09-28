import {useStoreState} from "easy-peasy";
import {Form, Input, Divider} from "antd";
import Phones from "./Phones";
import {useState} from "react";

const {Item} = Form;

const Contact = ({phones, setPhones}) => {
	
	const user = useStoreState(state => state.auth.user);
	
	return (
		<>
			{/*<div>*/}
			{/*	<h2>PHONES:</h2>*/}
			{/*	<pre>{JSON.stringify(phones, false, 2)}</pre>*/}
			{/*</div>*/}
			<Divider orientation="left">Información de Contacto</Divider>
			<div className="col-md-12">
				<label htmlFor="email">Correo electrónico:</label>
				<Item
					name="email"
					rules={[{message: "Es requerido que ingrese un email/válido.", type: "email"}]}
				>
					<Input size="large"/>
				</Item>
			</div>
			<Divider orientation="right">Números telefónicos</Divider>
			<div className="col-md-12">
				<Phones phones={phones} setPhones={setPhones} />
			</div>
		</>
	)
};

export default Contact;

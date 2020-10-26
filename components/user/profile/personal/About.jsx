import {Button, Form, Input, notification} from 'antd';
import {useStoreActions, useStoreState} from 'easy-peasy';
import xhr from '../../../../xhr';
import router from 'next/router';
import TynyEditor from '../../../Misc/TinyEditor'

const {Item} = Form;
const {TextArea} = Input;

const About = ({switchCurrent, current}) => {
	/** Global state */
	const {
		profile: {
			id,
			fields: {personal},
		},
	} = useStoreState(state => state.auth.user);
	
	/** Personal info */
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile);
	
	const onFinish = fields => {

		const merged = Object.assign(personal, fields);
		
		xhr()
			.put(
				`/profile/${id}`,
				JSON.stringify({
					fields: {
						personal: fields,
					},
				}),
			)
			.then(resp => {
				updateProfile({type: 'personal', fields: merged});
				
				/** Send notification success */
				notify('success', 'Ficha Acerca de actualizada.', 'Vamos al siguiente paso...');
				switchCurrent(current + 1);
				router.push(`${router.router.pathname}?current=${current + 1}`);
			})
			.catch(err => console.log('Error:', err));
	};
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description,
			placement: 'bottomRight',
		});
	};
	
	return (
		<Form onFinish={onFinish} initialValues={personal}>
			<div className="umana-form--section">
				<h2>Acerca de ti</h2>
				<Item
					name="about"
					className="form-item--lg"
					label="Cuentanos acerca de ti y tu experiencia"
				>
					<TynyEditor/>
				</Item>
			</div>
			<Item>
				<Button style={{marginLeft: 'auto'}} type="orange" size="small" htmlType="submit">
					Guardar y continuar
				</Button>
			</Item>
		</Form>
	);
};

export default About;

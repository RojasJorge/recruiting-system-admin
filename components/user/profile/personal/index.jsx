import {useState} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {Button, Form, notification} from 'antd';
import Names from './Names';
import router from 'next/router';
import Locations from '../../../Location';
import General from './General';
import Contact from './Contact';
// import { UploadAvatar } from '../../../../elements';
import xhr from '../../../../xhr';
import AvatarCropper from "../../../Misc/AvatarCropper";

/** Import form sections */
const FormItem = Form.Item;

const Personal = ({switchCurrent, current, careers}) => {
	/** Global state */
	const {
		profile: {
			id,
			fields: {personal},
		},
	} = useStoreState(state => state.auth.user);
	
	/** Calculate age */
	const calculateAge = useStoreActions(actions => actions.tools.calculateAge)
	
	/** Birthday handler */
	const [birthday, setBirthday] = useState(personal.birthday);
	
	/** Danger status */
	const [danger, isDanger] = useState(false);
	
	/** Phones */
	const [phones, setPhones] = useState([]);
	
	/** Personal info */
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile);
	
	const onFinish = fields => {
		fields = {...fields, birthday, age: calculateAge(birthday)};
		
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
				updateProfile({type: 'personal', fields});
				
				/** Send notification success */
				notify('success', 'Ficha personal actualizada.', 'Vamos al siguiente paso...');
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
		});
	};
	
	return (
		<>
			{/*<pre>{JSON.stringify(personal, false, 2)}</pre>*/}
			<Form name="basic" onFinish={onFinish} initialValues={personal}>
				<div className="umana-form--section">
					{/*<UploadAvatar type="user" src="" />*/}
					<AvatarCropper/>
					<h2 style={{width: '100%', marginTop: 20}}>Información personal</h2>
					<Names careers={careers}/>
					<Form.Item name="location" label="Ubicación actual">
						<Locations/>
					</Form.Item>
				</div>
				{/*<Salary/>*/}
				<General birthday={birthday} setBirthday={setBirthday} calculateAge={calculateAge}/>
				<Contact phones={phones} setPhones={setPhones}/>
				
				<FormItem>
					<Button
						type="orange"
						htmlType="submit"
						size="small"
						danger={danger}
						style={{width: '100%'}}
					>
						Confirmar y continuar
					</Button>
				</FormItem>
			</Form>
		</>
	);
};

export default Personal;

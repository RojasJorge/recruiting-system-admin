import {useState} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {Button, Form, notification} from 'antd';
import Names from './Names';
import router from 'next/router';
import Locations from '../../../Location';
import General from './General';
import Contact from './Contact';
import xhr from '../../../../xhr';
import AvatarCropper from "../../../Misc/AvatarCropper";
import storage from "../../../../storage";

/** Import form sections */
const FormItem = Form.Item;

const Personal = ({switchCurrent, current}) => {
	/** Global state */
	const {
		profile: {
			id,
			fields: {personal},
		},
	} = useStoreState(state => state.auth.user)
	
	/** Birthday handler */
	const [birthday, setBirthday] = useState(personal.birthday);
	
	/** Danger status */
	const [danger, isDanger] = useState(false);
	
	/** Avatar info */
	const [avatar, updateAvatar] = useState([])
	
	/** Avatar info */
	const [removed, updateRemoved] = useState(null)
	
	/** Phones */
	const [phones, setPhones] = useState([]);
	
	/** Personal info */
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile);
	
	const onFinish = fields => {
		
		avatar.map(o => {
			o.thumbUrl = process.env.NEXT_PUBLIC_APP_FILE_STORAGE + o.response.url
			return o
		})
		
		fields = {...fields, birthday, avatar}
		
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
	
	/** Removes the avatar from server if avatar is an empty array */
	const confirmRemoveAvatarFromStorage = file => {
		console.log('Remove this from storage:', file)
		// storage()
		// 	.delete(`/delete/${file.response.url.split('/')[2]}`)
		// 	.then(resp => {
		// 		confirmUpload()
		// 	})
		// 	.catch(err => console.log(err))
	}
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description,
		});
	};
	
	return (
		<>
			<pre>{JSON.stringify(avatar, false, 2)}</pre>
			<Form name="basic" onFinish={onFinish} initialValues={personal}>
				<div className="umana-form--section">
					
					{/*AVATAR UPLOADER*/}
					<AvatarCropper
						personal={personal}
						avatar={avatar}
						updateAvatar={updateAvatar}
						confirmRemoveAvatarFromStorage={confirmRemoveAvatarFromStorage}
					/>
					
					{/*SIMPLE DIVIDER*/}
					<h2 style={{width: '100%', marginTop: 20}}>Información personal</h2>
					
					{/*NAMES FRAGMENT*/}
					<Names/>
					
					{/*CUSTOM LOCATIONS FIELD*/}
					<Form.Item name="location" label="Ubicación actual">
						<Locations/>
					</Form.Item>
				</div>
				
				{/*GENERAL INFO LIKE NATIONALITY, AGE, MARITAL STATUS, ETC...*/}
				<General
					birthday={birthday}
					setBirthday={setBirthday}
				/>
				
				{/*SIMPLE CONTACT INFO*/}
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

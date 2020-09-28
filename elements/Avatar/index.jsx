import PropTypes from 'prop-types';
import {Avatar, Button} from 'antd';
import {useEffect, useState} from "react";
import axios from 'axios'
import {useStoreActions} from "easy-peasy";

const UploadAvatar = props => {
	
	const toBinary = useStoreActions(actions => actions.tools.toBinary)
	
	/** Image data */
	const [image, setImage] = useState({
		file: null,
		imagePreview: null,
		binary: null
	})
	
	const onChange = e => {
		let reader = new FileReader()
		let file = e.target.files[0]
		
		// console.log('binary:', toBinary({file}))
		
		reader.onloadend = () => {
			setImage({
				file,
				imagePreview: reader.result,
				// binary: toBinary(file)
			})
		}
		
		reader.readAsDataURL(file)
	}
	
	const storeAvatar = _ => {
		axios
			.post(`http://localhost:30011/file`, {media: image.imagePreview, mediaType: 'image/jpg'})
			.then(response => console.log('Response:', response))
			.catch(err => console.log(err))
	}
	
	useEffect(() => {
		setImage({imagePreview: 'http://localhost:30011/file'})
	}, [])
	
	return (
		<div className="umana-avatarUp">
			<div className="umana-avatarUp__content">
				<h3>{props.type === 'company' ? 'Logotipo de la empresa' : 'Foto de perfil'}</h3>
				<p>Sube una fotografía en JPG de no más de 800x800 pixeles.</p>
				<Button type={props.type === 'company' ? 'green' : 'orange'} size="small">
					subir fotografía
					<input
						type="file"
						id="uploadfield"
						// accept="image/jpeg"
						onChange={onChange}/>
				</Button>
				<Button
					size="small"
					disabled={!image.imagePreview}
					onClick={() => storeAvatar()}
				>Confirmar
				</Button>
			</div>
			<div className="umana-avatarUp__avatar">
				<Avatar
					className={props.type}
					icon={
						<i className="material-icons">
							{props.type === 'company' ? 'domain' : 'person_outline'}
						</i>
					}
					src={image.imagePreview || null}
					size={120}
				/>
				<Button type={props.type === 'company' ? 'circle-green' : 'circle-orange'} size="small">
					<i className="material-icons">add</i>
				</Button>
				<input type="file" className="inputUploadfield" accept="image/jpeg" onChange={onChange}/>
			</div>
			{/*<div style={{width: '100%'}}>*/}
			{/*	<h3 style={{color: 'red'}}>Image object:</h3>*/}
			{/*	<pre>{JSON.stringify(image, false, 2)}</pre>*/}
			{/*</div>*/}
		</div>
	);
};

UploadAvatar.propTypes = {
	type: PropTypes.string,
};

UploadAvatar.defaultProps = {
	type: 'company',
};

export default UploadAvatar;

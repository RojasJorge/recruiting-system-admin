import PropTypes from 'prop-types';
import {Button, Modal} from 'antd';
import {useEffect, useState} from "react";
import axios from 'axios'
import {useStoreActions} from "easy-peasy";
import ReactCropper from '../../components/Misc/Cropper'

const UploadAvatar = props => {
	
	const [visible, switchModal] = useState(false)
	
	/** Image data */
	const [image, setImage] = useState({
		file: null,
		imagePreview: null,
		binary: null
	})
	
	return (
		<div className="umana-avatarUp">
			<div>
				<Button
					type="dashed"
					onClick={() => switchModal(!visible)}
				>Agregar/Editar mi avatar</Button>
			</div>
			<div className="umana-avatarUp__avatar">
				{/*<Avatar*/}
				{/*	className={props.type}*/}
				{/*	icon={*/}
				{/*		<i className="material-icons">*/}
				{/*			{props.type === 'company' ? 'domain' : 'person_outline'}*/}
				{/*		</i>*/}
				{/*	}*/}
				{/*	src={image.imagePreview || null}*/}
				{/*	size={120}*/}
				{/*/>*/}
				{/*<Button type={props.type === 'company' ? 'circle-green' : 'circle-orange'} size="small">*/}
				{/*	<i className="material-icons">add</i>*/}
				{/*</Button>*/}
				{/*<input type="file" className="inputUploadfield" accept="image/jpeg" onChange={onChange}/>*/}
			</div>
			{/*<div style={{width: '100%'}}>*/}
			{/*	<h3 style={{color: 'red'}}>Image object:</h3>*/}
			{/*	<pre>{JSON.stringify(image, false, 2)}</pre>*/}
			{/*</div>*/}
			<Modal
				title="Subir imágen de perfil"
				visible={visible}
				footer={null}
				width={800}
				onCancel={() => switchModal(!visible)}
			>
				<div className="umana-avatarUp__content">
					<h3>{props.type === 'company' ? 'Logotipo de la empresa' : 'Foto de perfil'}</h3>
					<p>Sube una fotografía en JPG de no más de 800x800 pixeles.</p>
					<div className="crop-container">
						<ReactCropper/>
					</div>
				</div>
			</Modal>
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

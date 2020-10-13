import React, {useEffect, useState} from "react";
import Cropper from "react-cropper";
import axios from 'axios'
import {Button} from 'antd'
import xhr from "../../xhr";
import {useStoreState, useStoreActions} from "easy-peasy";
// import AvatarCropper from "./AvatarCropper";

export const Demo = React.FC = () => {
	
	const {
		profile: {
			id,
			fields: { personal },
		},
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const [image, setImage] = useState();
	const [cropData, setCropData] = useState("#");
	const [cropper, setCropper] = useState();
	const [crop, setCrop] = useState(null)
	
	const onChange = (e) => {
		e.preventDefault()
		
		/** Prevent crash if no file selected */
		if (e.target.files.length <= 0) return false
		
		if (e.target.files[0].size > 1000000) {
			alert('La imagen seleccionada es muy pesada, por favor elige otra')
			return false
		}
		
		let files;
		
		if (e.dataTransfer) {
			files = e.dataTransfer.files
		} else if (e.target) {
			files = e.target.files
		}
		const reader = new FileReader()
		reader.onload = () => {
			setImage(reader.result)
		};
		reader.readAsDataURL(files[0])
	};
	
	const getCropData = () => {
		if (typeof cropper !== "undefined") {
			// setCropData(cropper.getCroppedCanvas().toDataURL());
			storeImage(cropper.getCroppedCanvas().toDataURL())
		}
	};
	
	const updateAvatar = url =>
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					personal: {
						avatar: url
					}
				}
			}))
			.then(resp => {
				const fields = Object.assign(personal, {avatar: url})
				updateProfile({ type: 'personal', fields })
			})
			.catch(err => console.log(err))
	
	const storeImage = async data => {
		
		let reader = new FileReader()
		let file = dataURLtoBlob(data)
		
		reader.readAsDataURL(file)
		const formData = new FormData()
		formData.append('file', file)
		
		axios({
			method: 'post',
			url: `${process.env.NEXT_PUBLIC_APP_FILE_STORAGE}/upload`,
			data: formData,
			config: {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Access-Control-Allow-Origin': "*"
				}
			}
		})
			.then(function (response) {
				console.log('response from file storage', response)
				updateAvatar(response.data.url)
			})
			.catch(function (response) {
				console.log('Response ERROR from file storage:', response)
			})
	}
	
	const dataURLtoBlob = (dataurl) => {
		let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new Blob([u8arr], {type: mime})
	}
	
	useEffect(() => {
		setImage(process.env.NEXT_PUBLIC_APP_FILE_STORAGE + personal.avatar)
	}, [])
	
	return (
		<div>
			<div>
				<input
					// accept="image/jpg"
					type="file"
					onChange={onChange}
					style={{marginBottom: 24}}
				/>
				<Button
					type="orange"
					style={{float: "right"}}
					onClick={getCropData}
					disabled={(crop && crop.detail.width <= 500 && crop.detail.height <= 500 && crop.detail.width > 300 && crop.detail.height > 300) ? false : true}
				>
					Guardar recorte
				</Button>
			</div>
			<div style={{width: "100%", marginTop: 80}}>
				
				<Cropper
					style={{height: 400, width: "100%"}}
					preview=".img-preview"
					src={image}
					rotable={true}
					scalable={false}
					guides={true}
					background={true}
					dragMode="move"
					responsive={true}
					crop={e => setCrop(e)}
					autoCropArea={0.4}
					checkOrientation={false}
					onInitialized={(instance) => {
						setCropper(instance);
					}}
				/>
			</div>
			<div>
				<div className="box" style={{width: "50%", float: "right"}}>
					<h1>Preview</h1>
					<div
						className="img-preview"
						style={{width: "100%", float: "left", height: "300px", overflow: 'hidden'}}
					/>
				</div>
			</div>
			<br style={{clear: "both"}}/>
		</div>
	);
};

export default Demo;

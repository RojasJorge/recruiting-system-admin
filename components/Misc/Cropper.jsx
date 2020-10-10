import React, {useState} from "react";
import Cropper from "react-cropper";
import axios from 'axios'

const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo = React.FC = () => {
	const [image, setImage] = useState(defaultSrc);
	const [cropData, setCropData] = useState("#");
	const [cropper, setCropper] = useState();
	
	const onChange = (e) => {
		e.preventDefault();
		
		/** Prevent crash if no file selected */
		if (e.target.files.length <= 0) return false
		
		let files;
		
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(files[0]);
	};
	
	const getCropData = () => {
		if (typeof cropper !== "undefined") {
			// setCropData(cropper.getCroppedCanvas().toDataURL());
			storeImage(cropper.getCroppedCanvas().toDataURL())
		}
	};
	
	const storeImage = async data => {
		
		let reader = new FileReader()
		// let file = data[0]
		let file = dataURLtoBlob(data)
		
		reader.readAsDataURL(file)
		
		// console.log('File as url:', file)
		
		const formData = new FormData()
		// formData.append("file", data)
		formData.append('file', file);
		
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
				//handle success
				console.log(response);
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		
		// const data = new FormData(document.getElementById('formulario'));
		// fetch('https://storage.umana.co', {
		// 	method: 'POST',
		// 	body: formData
		// })
		// 	.then(function(response) {
		// 		if(response.ok) {
		// 			return response.text()
		// 		} else {
		// 			throw "Error en la llamada Ajax";
		// 		}
		//
		// 	})
		// 	.then(function(texto) {
		// 		console.log(texto);
		// 	})
		// 	.catch(function(err) {
		// 		console.log(err);
		// 	});
		
	}
	
	const dataURLtoBlob = (dataurl) => {
		let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {type:mime});
	}
	
	return (
		<div>
			<div style={{width: "100%"}}>
				<input
					accept="image/jpg"
					type="file"
					onChange={onChange}
					style={{marginBottom: 24}}
				/>
				<button style={{float: "right"}} onClick={getCropData}>
					Subir imagen
				</button>
				<Cropper
					style={{height: 400, width: "100%"}}
					initialAspectRatio={1}
					preview=".img-preview"
					src={image}
					viewMode={1}
					guides={true}
					minCropBoxHeight={10}
					minCropBoxWidth={10}
					background={true}
					responsive={true}
					autoCropArea={0}
					checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
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

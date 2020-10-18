import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {SaveTwoTone} from '@ant-design/icons'
import {Upload} from 'antd'
import ImgCrop from "antd-img-crop";
import xhr from "../../xhr";
import {useStoreActions, useStoreState} from "easy-peasy";
import storage from "../../storage";

const SaveBtn = styled.span`
	font-size: 16px;
	border: 1px solid #c7c7c7;
	cursor: pointer;
	padding: 5px 10px;
`

const AvatarCropper = ({personal, updateAvatar, confirmRemoveAvatarFromStorage}) => {
	
	const {
		profile: {
			id,
			// fields: {
			// 	personal
			// }
		}
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const [fileList, setFileList] = useState(personal.avatar || [])
	
	const onChange = ({fileList: newFileList}) => {
		setFileList(newFileList)
		updateAvatar(newFileList)
	}
	
	const onPreview = async file => {
		let src = file.url;
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};
	
	// const confirmUpload = _ => {
	//
	// 	const fields = fileList.map(o => {
	// 		o.thumbUrl = process.env.NEXT_PUBLIC_APP_FILE_STORAGE + o.response.url
	// 		return o
	// 	})
	//
	// 	xhr()
	// 		.put(`/profile/${id}`, JSON.stringify({
	// 			fields: {
	// 				personal: {
	// 					avatar: fields
	// 				}
	// 			}
	// 		}))
	// 		.then(resp =>
	// 			updateProfile({
	// 				type: 'personal', fields: Object.assign(personal, {
	// 					avatar: fields
	// 				})
	// 			}))
	// 		.catch(err => console.log(err))
	// }
	
	const onRemove = file =>
		confirmRemoveAvatarFromStorage(file)
	
	useEffect(() => {
		updateAvatar(fileList)
	})
	
	return (
		<>
			{/*<pre>{JSON.stringify(personal, false, 2)}</pre>*/}
			{/*<pre>{JSON.stringify(fileList, false, 2)}</pre>*/}
			<ImgCrop>
				<Upload
					// action={process.env.NEXT_PUBLIC_APP_FILE_STORAGE + '/upload'}
					listType="picture-card"
					fileList={fileList}
					onChange={onChange}
					onPreview={onPreview}
					onRemove={onRemove}
					// multiple={false}
				>
					{fileList.length < 1 && 'Seleccionar'}
				</Upload>
			</ImgCrop>
			
			{/*{fileList.length > 0 && <SaveBtn*/}
			{/*	onClick={_ => confirmUpload()}*/}
			{/*>*/}
			{/*	<SaveTwoTone/> Guardar*/}
			{/*</SaveBtn>}*/}
		</>
	)
}

export default AvatarCropper

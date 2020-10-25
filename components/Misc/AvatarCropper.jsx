import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SaveTwoTone } from '@ant-design/icons';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import xhr from '../../xhr';
import { useStoreActions, useStoreState } from 'easy-peasy';
import storage from '../../storage';

const SaveBtn = styled.span`
  font-size: 16px;
  border: 1px solid #c7c7c7;
  cursor: pointer;
  padding: 5px 10px;
`;

const AvatarCropper = ({ personal, updateAvatar, updateToDelete }) => {
  const [fileList, setFileList] = useState(personal.avatar || []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    updateAvatar(newFileList);
  };

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

  const onRemove = file => updateToDelete(file);

  useEffect(() => {
    updateAvatar(fileList);
  });

  return (
    <div className="umana-avatar-upload">
      <ImgCrop>
        <Upload
          action={process.env.NEXT_PUBLIC_APP_FILE_STORAGE + '/upload'}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={onRemove}
        >
          {fileList.length < 1 && 'Seleccionar'}
        </Upload>
      </ImgCrop>
      <p>Sube una fotografía en JPG o PNG de no más de 800x800 pixeles, no mayor de 2MB.</p>
    </div>
  );
};

export default AvatarCropper;

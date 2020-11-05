import { useState } from 'react';
import { Button, Divider, Form, Input, InputNumber, message, notification, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import xhr from '../../../../xhr';
import storage from '../../../../storage';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { filter, isEmpty } from 'lodash';

const { Item } = Form;
const { Option } = Select;
const { Dragger } = Upload;

const Documents = ({ switchCurrent, current }) => {
  /** Global state */
  const {
    profile: {
      id,
      fields: { personal, documents },
    },
  } = useStoreState(state => state.auth.user);

  const [files, updateFiles] = useState(documents);
  const [deleted, setDeleted] = useState([]);

  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const onFinish = fields => {
    let merged = Object.assign(personal, fields);

    xhr()
      .put(
        `/profile/${id}`,
        JSON.stringify({
          fields: {
            personal: fields,
            documents: files,
          },
        }),
      )
      .then(resp => {
        updateProfile({ type: 'personal', fields: merged });
        updateProfile({ type: 'documents', fields: files });

        if (!isEmpty(deleted)) {
          deleted.forEach(obj => {
            deleteFromStorage(obj);
          });
        }

        setDeleted([]);

        /** Send notification success */
        notify('success', 'Ficha documentos actualizada.', 'Vamos al siguiente paso...');
        switchCurrent(current + 1);
        router.push(`${router.router.pathname}?current=${current + 1}`);
      })
      .catch(err => console.log('Error:', err));
  };

  const deleteFromStorage = async doc => {
    storage()
      .delete(`/delete/${doc.response.url.split('/')[2]}`)
      .then(resp => true)
      .catch(err => console.log(err));
  };

  /** Notifications */
  const notify = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight',
    });
  };

  const props = {
    name: 'file',
    mode: 'multiple',
    action: process.env.NEXT_PUBLIC_APP_FILE_STORAGE + '/upload',
    accept: ['.png, .jpg, .pdf, .docx, .xlsx, .docx, .doc, .odf'],
    defaultFileList: documents,
    onChange(info) {
      const { status } = info.file;

      if (status === 'done') {
        updateFiles(info.fileList);
      } else if (status === 'error') {
        message.error(`${info.file.name} no se ha podido subir.`);
      }
    },
    onRemove(doc) {
      if (typeof doc.response === 'object' && doc.response.url) setDeleted([...deleted, doc]);
      updateFiles(filter(files, o => o.uid !== doc.uid));
    },
  };

  return (
    <>
      <Form className="animated fadeInUp" onFinish={onFinish} initialValues={personal} validateTrigger="onBlur">
        <div className="umana-form--section">
          <h2>Documentos de identificación</h2>
          <Item name="dpi" label="DPI" className="form-item--md">
            <Input style={{ width: '100%' }} min={0} size="large" />
          </Item>

          <Item name="passport" label="Pasaporte" className="form-item--md">
            <InputNumber style={{ width: '100%' }} min={0} size="large" />
          </Item>

          <Item name="nit" label="NIT" className="form-item--md">
            <Input size="large" />
          </Item>

          <Item name="driversLicence" label="Número de Licencia" className="form-item--md">
            <InputNumber style={{ width: '100%' }} min={0} size="large" />
          </Item>

          <Item name="driversLicenceType" label="Tipo de licencia" className="form-item--md">
            <Select size="large" mode="multiple">
              <Option value="a">A</Option>
              <Option value="b">B</Option>
              <Option value="c">C</Option>
              <Option value="motorcicle">Motocicleta</Option>
            </Select>
          </Item>

          <Divider orientation="left">Archivos adjuntos:</Divider>
          <div className="col-md-12">
            <Item>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Subir DPI(ambos lados) | Pasaporte | Licencia, en formato .docx o .pdf o .jpg. <br /> de no más de 2mb.
                </p>
                <p className="ant-upload-note">En caso de ser extranjero, subir permiso de trabajo.</p>
              </Dragger>
            </Item>
          </div>
        </div>

        {/*Ends row*/}
        <Item>
          <Button size="small" htmlType="submit" type="orange" style={{ marginLeft: 'auto' }}>
            Guardar y continuar
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default Documents;

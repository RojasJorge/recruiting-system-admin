import {Alert, Button, Drawer, Form, Input, Select, Switch} from 'antd';
import {useState} from "react";
// const { TreeNode } = TreeSelect;

const EditModal = ({
	                   visible,
	                   switchEdit,
	                   title,
	                   data,
	                   clear,
	                   treeData,
	                   edit,
	                   setEdit,
	                   onSubmit,
                   }) => {
	
	const [active, setActive] = useState(false)
	
	const onFinish = field => {
		if (edit) {
			onSubmit(field, edit, data.id);
		} else {
			onSubmit(field, false);
		}
	};
	
	const onReset = () => {
		clear({});
		switchEdit(false);
		setEdit(false);
	};
	
	const onValuesChange = (changed, all) => {
		if (changed.status) {
			setActive(false)
		} else {
			setActive(true)
		}
	}
	
	return (
		<Drawer
			placement="right"
			closable={true}
			onClose={() => onReset()}
			visible={visible}
			width={600}
			title={title}
			destroyOnClose={true}
		>
			<div className="umana-drawer">
				<h3>{edit ? 'Editar' : 'Agregar'}</h3>
				{data && data.name ? (
					<Form
						onFinish={onFinish}
						initialValues={data}
						validateTrigger="onBlur"
						onValuesChange={onValuesChange}
					>
						<Form.Item
							label="Título"
							name="name"
							rules={[
								{
									required: true,
									message: 'Campo requerido',
								},
							]}
						>
							<Input size="large"/>
						</Form.Item>
						<Form.Item label="Padre" name="parent">
							<Select
								style={{width: '100%'}}
								dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
								placeholder="Seleccione un padre"
								size="large"
							>
								{treeData
									? treeData.map(e => (
										<Select.Option key={e.id} value={e.id}>
											{e.name}
										</Select.Option>
									))
									: null}
							</Select>
						</Form.Item>
						<Form.Item
							name="status"
							valuePropName="checked"
						>
							<Switch checkedChildren="Activo" unCheckedChildren="Inactivo"/>
						</Form.Item>
						
						
						{/*Update warning*/}
						{
							active && <Alert
								message="Nota"
								description="Toma en cuenta que si desactivas una categoría padre, también estás desactivando las subcategorías contenidas en él."
								type="warning"
								showIcon
							/>
						}
						
						<div className="umana-form--footer columns">
							{/*<Button type="cancel" size="large" htmlType="button" onClick={onReset}>*/}
							{/*  Cancelar*/}
							{/*</Button>*/}
							<Button type="primary" size="large" htmlType="submit">
								{edit ? 'Editar' : 'Agregar'}
							</Button>
						</div>
					</Form>
				) : (
					<Form onFinish={onFinish}>
						<Form.Item
							label="Título"
							name="name"
							rules={[
								{
									required: true,
									message: 'Campo requerido',
								},
							]}
						>
							<Input/>
						</Form.Item>
						<Form.Item label="Padre" name="parent">
							<Select
								style={{width: '100%'}}
								dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
								placeholder="Seleccione un padre"
								showSearch
								optionFilterProp="label"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
									option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{treeData
									? treeData.map(e => (
										<Select.Option key={e.id} value={e.id}>
											{e.name}
										</Select.Option>
									))
									: null}
							</Select>
						</Form.Item>
						<div className="umana-form--footer columns">
							{/*<Button type="cancel" size="small" onClick={onReset} style={{ width: '50%' }}>*/}
							{/*  Cancelar*/}
							{/*</Button>*/}
							<Button type="primary" size="small" htmlType="submit" style={{width: '50%'}}>
								{edit ? 'Editar' : 'Agregar'}
							</Button>
						</div>
					</Form>
				)}
			</div>
		</Drawer>
	);
};

export default EditModal;

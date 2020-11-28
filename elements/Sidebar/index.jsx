import {SendOutlined, MailOutlined} from '@ant-design/icons'
import {Button, Menu, notification, Modal} from 'antd';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {isEmpty} from 'lodash';
import {Can} from "../../components/Can";
import xhr from "../../xhr";

const Sitebar = props => {
	const router = useRouter();
	const [collapsed, setCollapsed] = useState(false);
	
	const [contact, updateContact] = useState(null)
	
	// const toggleCollapsed = () => {
	//   if (collapsed) {
	//     setCollapsed(false);
	//   } else {
	//     setCollapsed(true);
	//   }
	// };
	
	const onBack = () => {
		router.back();
	};
	
	const onCompanyInvite = _ =>
		xhr()
			.post('/invite-a-user', JSON.stringify(contact))
			.then(resp => notification.success({
				message: 'Email',
				description: 'Se ha enviado un correo electrónico al candidado invitándolo a aplicar a la plaza.'
			}))
			.catch(err => notification.error({
				message: 'Email',
				description: 'Ha ocurrido un error al intentar invitar al candidado vía email, por favor intente de nuevo más tarde.'
			}))
	
	useEffect(() => {
		if (Object.keys(router.query).length > 0 &&
			router.query.profileId &&
			router.query.companyId &&
			router.query.jobId &&
			router.pathname === '/admin/profile/[id]') {
			updateContact({
				companyId: router.query.companyId,
				jobId: router.query.jobId,
				profileId: router.query.profileId
			})
		}
	}, [])
	
	const onUserInviteConfirm = _ =>
		Modal.info({
			content: '¿Confirma que desea invitar al candidato a aplicar a esta plaza?',
			okText: 'Si, contactar',
			cancelText: 'Cancelar',
			icon: false,
			onOk: () => onCompanyInvite(),
			okButtonProps: {
				type: "dashed",
				size: "large",
				block: true,
				icon: <MailOutlined style={{fontSize: 16}}/>
			}
		})
	
	return (
		<div className={`umana-sitebar theme-${props.theme ? props.theme : 'blue'}`}>
			{!isEmpty(props.header) ? (
				<div className="umana-sitebar__header">
					{props.header.icon ? (
						<div className="header-icon">
							<i className="material-icons">{props.header.icon}</i>
						</div>
					) : null}
					<div className="header-content">
						<h4>{props.header.title}</h4>
						{props.header.subtitle ? <p>{props.header.subtitle}</p> : null}
						{props.header.urlDinamic ? (
							props.header.urlAction ? (
								<Link href={`${props.header.urlAction}${props.header.urlParam ? props.header.urlParam : '[id]'}`}
								      as={`${props.header.urlAction}${props.header.urlDinamic}`}>
									<a>
										{props.header.titleAction} <i className="material-icons">{props.header.action}</i>
									</a>
								</Link>
							) : (
								<a>
									{props.header.titleAction} <i className="material-icons">{props.header.action}</i>
								</a>
							)
						) : props.header.urlAction === 'back' ? (
							<Button onClick={() => onBack()} type="link">
								{props.header.titleAction} <i className="material-icons">{props.header.action}</i>
							</Button>
						) : props.header.urlAction ? (
							<Link href={props.header.urlAction} passHref>
								<a>
									{props.header.titleAction} <i className="material-icons">{props.header.action}</i>
								</a>
							</Link>
						) : (
							<a>
								{props.header.titleAction} <i className="material-icons">{props.header.action}</i>
							</a>
						)}
					</div>
				</div>
			) : null}
			{!isEmpty(props.data) ? (
				<Menu mode="inline" theme="light" inlineCollapsed={collapsed}
				      className={`theme-${props.theme ? props.theme : 'blue'}`}>
					{!isEmpty(props.data)
						? props.data.map((e, idx) => (
							<Menu.Item key={idx} icon={<i className="material-icons">{e.icon}</i>}>
								{e.id ? (
									<Link href={`${e.url}[id]`} as={`${e.url}${e.id}`}>
										<a>{e.title}</a>
									</Link>
								) : (
									<Link href={e.url} passHref>
										<a>{e.title}</a>
									</Link>
								)}
							</Menu.Item>
						))
						: null}
				</Menu>
			) : null}
			<div className="umana-sitebar-childrens">{props.children}</div>
			<Can I="view" a="CONTACT_CANDIDATE_BTN">
				{contact && <>
					<Button
						style={{marginTop: 20}}
						icon={<SendOutlined/>}
						onClick={_ => onUserInviteConfirm()}
					>Contactar al candidato
					</Button>
				</>}
			</Can>
		</div>
	);
};

Sitebar.propTypes = {
	header: PropTypes.object,
	data: PropTypes.array,
};

Sitebar.defaultProps = {
	header: {},
	data: [],
};

export default Sitebar;

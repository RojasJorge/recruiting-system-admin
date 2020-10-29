import Layout from '../../views/Layout';
import {EmptyElemet, PageTitle} from '../../elements';
import candidateImg from '../../images/welcome-talento.png';
import companyImg from '../../images/welcome-company.png';
import {Can} from '../../components/Can';
import {useStoreActions, useStoreState} from "easy-peasy";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import PageLoader from "../../components/Misc/PageLoader";

const Welcome = () => {
	
	const router = useRouter()
	
	const profile = useStoreState(state => state.profile)
	const auth = useStoreState(state => state.auth)
	const checkProfile = useStoreActions(actions => actions.profile.verify)
	
	const redirect = _ => {
		if (
			profile.personal &&
			profile.academic &&
			profile.economic &&
			profile.lookingFor &&
			profile.others &&
			profile.working
		) {
			return true
		} else {
			return false
		}
	}
	
	useEffect(() => {
		checkProfile(auth.user.profile.fields)
	}, [])
	
	if (redirect()) {
		router.replace('/admin/requests')
	} else {
		return (
			<Layout title="Bienvenido(a)">
				<>
					<pre>{JSON.stringify(profile, false, 2)}</pre>
					<PageTitle title="Bienvenido(a)"/>
					<Can I="edit" a="JOBS">
						<EmptyElemet
							data={{
								title: 'Ahora eres parte de Umana.',
								content: `Crear empresas y plazas para encontrar los mejores candidatos de la plataforma.`,
								beforeButton: 'Crea tu primera empresa',
								buttonTitle: 'Comenzar',
								url: '/admin/companies/add',
								img: companyImg,
							}}
							type="green"
						/>
						:
					</Can>
					<Can I="apply" a="JOBS">
						<EmptyElemet
							data={{
								title: 'Ahora eres parte de Umana.',
								content: `Para continuar debes completar tu perfil, asegurate de brindar toda la información que se te solicita y ver las mejores plazas para ti.`,
								beforeButton: 'Estas listo(a)',
								buttonTitle: 'Comenzar',
								url: '/admin/profile/edit?current=0',
								img: candidateImg,
							}}
							type="orange"
						/>{' '}
						:
					</Can>
				</>
			</Layout>
		);
	}
	
	return <PageLoader active={true}/>
};

export default Welcome;

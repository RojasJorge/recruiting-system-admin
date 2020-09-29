import {useState, useEffect} from 'react'
import {StoreProvider} from 'easy-peasy';
import {ConfigProvider} from 'antd';
import {AbilityContext} from '../components/Can';
import store from '../store';
import ability from '../ability';
import esEs from 'antd/lib/locale-provider/es_ES';
import NextNProgress from '../components/Progress';
import '../assets/css/global.scss';

const WebApp = ({Component, pageProps}) => {
	
	const [permissions, setPermissions] = useState(['guest'])
	
	useEffect(() => {
		setPermissions(JSON.parse(localStorage.getItem('uScopes')))
	}, [])
	
	return (
		<StoreProvider store={store}>
			<AbilityContext.Provider value={ability(permissions)}>
				<ConfigProvider locale={esEs}>
					<NextNProgress/>
					<Component {...pageProps} />
				</ConfigProvider>
			</AbilityContext.Provider>
		</StoreProvider>
	)
}

export default WebApp;

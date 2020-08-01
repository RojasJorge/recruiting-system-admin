import Router from 'next/router'
import Login from '../components/user/Login'
import {useEffect, useState} from 'react'

const LoginPage = _ => {
	
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		if (localStorage.getItem('uToken')) Router.replace('/admin')
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])
	
	return <Login />
	// if (loading) return (
	// 	<>
	// 		<p>Verificando...</p>
	// 		<style jsx>{`
	// 		text-align: center;
	// 	`}</style>
	// 	</>
	// )
	//
	// if(!loading) return <Login />
}

export default LoginPage

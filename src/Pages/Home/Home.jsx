import React, { useContext, useEffect, useState } from 'react'
import styles from "./Home.module.css"
import AuthContext from '../../Context/AuthContext'
import { Link } from 'react-router-dom'

const Home = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	useEffect(() => {
		const verifyParams = new URLSearchParams(window.location.search)
		const params = verifyParams.get("refresh")
		if (params) {
			if (params === "true") {
				window.location.assign("/")
			}
		}
	}, [])

	return (
		<div className={styles.home}>
			<div className={styles.welcome}>
				<p> Olá, você esta na tela de home! </p> 

				{!auth.currentUser && 
					<div className={styles.welcomeSubdivision}>
						{!auth.currentUser && <Link to="/register" className="nonNavLink">Cadastre-se</Link>}
						<p> OU </p>
						{!auth.currentUser && <Link to="/login" className="nonNavLink">Entre</Link>}
					</div>
				}
			</div>
			<hr />
	
		</div>
	)
}

export default Home
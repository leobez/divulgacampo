import React, { useContext } from 'react'
import styles from "./Home.module.css"
import AuthContext from '../../Context/AuthContext'

const Home = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	return (
		<div className={styles.home}>
			<p> Olá, você esta na tela de home! </p> 
			{!auth.currentUser && <p>Cadastre-se!</p>}		
		</div>
	)
}

export default Home
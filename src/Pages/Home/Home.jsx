import React, { useContext } from 'react'
import styles from "./Home.module.css"
import AuthContext from '../../Context/AuthContext'
import { Link } from 'react-router-dom'

const Home = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	return (
		<div className={styles.home}>
			<div className={styles.welcome}>
				<p> Olá, você esta na tela de home! </p> 

				{!auth.currentUser && 
					<div className={styles.welcomeSubdivision}>
						{!auth.currentUser && <Link to="/register" className={styles.homeLink}>Cadastre-se</Link>}
						<p> ou faça </p>
						{!auth.currentUser && <Link to="/login" className={styles.homeLink}>Login</Link>}
					</div>
				}
			</div>
			<hr />
	
		</div>
	)
}

export default Home
import React, { useContext } from 'react'
import styles from "./MyProfile.module.css"
import AuthContext from '../../Context/AuthContext'

const MyProfile = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	return (
		<div className={styles.myprofile}>
			{!isEmailVerified ? (
				<div className='unverifiedemail'>
					<p>Verifique seu email para ter acesso a essas informações.</p>
				</div>
			) : (
				<>
					<h1>Suas informações: </h1>
					<hr />
					<p className={styles.info}>Seu uid é: <span>{auth.currentUser.uid}</span></p>
					<p className={styles.info}>Seu email é: <span>{auth.currentUser.email}</span></p>
					<p className={styles.info}>Seu displayName é: <span>{auth.currentUser.displayName}</span></p>
				</>
			)}

		</div>
	)
}

export default MyProfile
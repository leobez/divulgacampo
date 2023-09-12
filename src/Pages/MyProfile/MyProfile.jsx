import React, { useContext } from 'react'
import styles from "./MyProfile.module.css"
import AuthContext from '../../Context/AuthContext'

const MyProfile = () => {

	const auth = useContext(AuthContext)

	return (
		<div className={styles.myprofile}>
			<p>Seu uid é: {auth.currentUser.uid}</p>
			<p>seu email é: {auth.currentUser.email}</p>
			<p>seu displayName é: {auth.currentUser.displayName} </p>
		</div>
	)
}

export default MyProfile
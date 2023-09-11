import React from 'react'
import styles from "./MyProfile.module.css"

const MyProfile = ({uid, email, displayName}) => {
	return (
		<div className={styles.myprofile}>
			<p>Seu uid é: {uid}</p>
			<p>seu email é: {email}</p>
			<p>seu displayName é: {displayName} </p>
		</div>
	)
}

export default MyProfile
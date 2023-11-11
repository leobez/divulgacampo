import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from './ValidationEmailSent.module.css'

const ValidationEmailSent = () => {

	const [email, setEmail] = useState()

	useEffect(() => {
		const verifyParams = new URLSearchParams(window.location.search)
		const params = verifyParams.get("email")
		if (params) {
			setEmail(params)
		}
	}, [])

	return (
		<div className={styles.validationemailsent}>
			{email ? (
			<div>
				<p>Para entrar, verifique o email: <span>{email}</span> </p>
			</div>
			) 
			: 
			(
			<div>
				<p>Email de validação enviado.</p>
			</div>
			) }
		</div>
	)
}

export default ValidationEmailSent
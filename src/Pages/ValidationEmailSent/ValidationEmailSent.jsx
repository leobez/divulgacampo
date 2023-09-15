import React, { useState } from 'react'
import { useEffect } from 'react'

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
		<div className='verifyemailwarn'>
			{email ? (
			<p>Para entrar, verifique o email:<span>{email}</span></p>) 
			: 
			(<p><span>Email de verificação enviado.</span></p>) }
		</div>
	)
}

export default ValidationEmailSent
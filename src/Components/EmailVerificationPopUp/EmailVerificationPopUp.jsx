import React, { useEffect, useState } from 'react'

const EmailVerificationPopUp = ({userEmail}) => {

	const [showIt, setShowIt] = useState(true)

	useEffect(() => {

		const showPopUp = () => {
			setShowIt(false)
		}

		const timeout = setTimeout(showPopUp, 3000)

		return () => clearTimeout(timeout)
		
	}, [])

	if (showIt) {
		return 	<div className='verifyemailwarn'>
					<p>Verifique seu email: <span>{userEmail}</span></p>
				</div>
	}
}

export default EmailVerificationPopUp
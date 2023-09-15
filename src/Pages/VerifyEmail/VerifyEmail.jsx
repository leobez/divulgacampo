import React, { useContext, useEffect, useState } from 'react'
import styles from './VerifyEmail.module.css'
import AuthContext from '../../Context/AuthContext'
import { applyActionCode } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = ({setIsEmailVerified}) => {

	const [error, setError] = useState()
	const auth = useContext(AuthContext)
	const verifyEmailParams = new URLSearchParams(window.location.search)
	const mode = verifyEmailParams.get('mode')
	const actionCode = verifyEmailParams.get('oobCode')
	const navigate = useNavigate()

/* 	const continueUrl = verifyEmailParams.get('continueUrl')
	const lang = getParameterByName('lang') || 'en';  */

	const handleVerifyEmail = async() => {
		try {
			const resp = await applyActionCode(auth, actionCode)
			setIsEmailVerified(true)
			navigate("/")
		} catch (error) {
			setError(error.message)
			navigate("/")
		}
	}

	useEffect(() => {
		handleVerifyEmail(auth, actionCode)
	}, [])

	return (
		<div>
			{error ? 
			(<div className='error'><p>Algo de errado aconteceu. Tente mais tarde.</p></div>) :

			(<div className={styles.noterror}><p>Seu email foi verificado!</p></div>)}
		</div>
	)
}

export default VerifyEmail
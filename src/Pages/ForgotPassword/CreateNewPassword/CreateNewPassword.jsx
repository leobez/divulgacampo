import React, { useState } from 'react'
import styles from './CreateNewPassword.module.css'
import { applyActionCode, getAuth } from 'firebase/auth'
import { useEffect } from 'react'

const CreateNewPassword = () => {

	const [error, setError] = useState("")
	const verifyEmailParams = new URLSearchParams(window.location.search)
	const mode = verifyEmailParams.get('mode')
	const actionCode = verifyEmailParams.get('oobCode')

	useEffect(() => {

		const handleActionCodeAsync = async(auth, actionCode) => {
			console.log("TESTE: ", auth, actionCode)
			try {
				const resp = await applyActionCode(auth, actionCode)
				console.log(resp)
			} catch (error) {
				console.log(error)
				setError("Algo deu errado")
				//navigate("/")
			}
		}

		handleActionCodeAsync(getAuth(), actionCode)

	}, [])

	return (
		<div>
			
			{error ? 
				(
				<div className='error'>
					<p>{error}</p>
				</div>
				) : (
				<div className='warn'>
					<p>Certo</p>
				</div>
				) 
			}

		</div>
	)
}

export default CreateNewPassword
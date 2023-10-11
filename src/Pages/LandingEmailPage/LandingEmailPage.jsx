import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { applyActionCode, confirmPasswordReset, getAuth } from 'firebase/auth'
import styles from './LandingEmailPage.module.css'

const LandingEmailPage = () => {

	const [error, setError] = useState("")
	const [warn, setWarn] = useState("")

	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const verifyEmailParams = new URLSearchParams(window.location.search)
	const mode = verifyEmailParams.get('mode')
	const actionCode = verifyEmailParams.get('oobCode')

	const resetUserPassword = async(auth, actionCode) => {
		try {
			const randomPassword = `senha${Math.floor(Math.random() * 100)}`
			await confirmPasswordReset(auth, actionCode, randomPassword);
			setWarn(`Sua nova senha é: ${randomPassword}. Entre e troque sua senha imediatamente.`)
		} catch (error) {
			console.log(error)
			if (error.message.includes("invalid-action-code")) {
				setError("Algo deu errado. Verifique se clicou no link correto em seu e-mail.")
			} else {
				setError("Algo deu errado.")
			}
		}
	}

	const verififyUserEmail = async(auth, actionCode) => {
		try {
			await applyActionCode(auth, actionCode)
			setWarn("Email verificado com sucesso!")
			setTimeout(() => navigate("/login"), 1500)
		} catch (error) {
			if (error.message.includes("invalid-action-code")) {
				setError("Algo deu errado. Verifique se clicou no link correto em seu e-mail.")
			} else {
				setError("Algo deu errado.")
			}
		}
	}

	useEffect(() => {

		const verifyAction = async(auth, actionCode, mode) => {
			switch (mode) {
				case "resetPassword": 
					console.log("RESETAR SENHA")
					await resetUserPassword(getAuth(), actionCode)
					break;
				case "verifyEmail":
					console.log("VERIFICAR EMAIL")
					await verififyUserEmail(auth, actionCode)
					break;
				case "recoverEmail":
					console.log("RECUPERAR EMAIL")
					break;
				default:
					console.log("DEFAULT")
					setWarn("...")
			} 
		}

		verifyAction(auth, actionCode, mode)

	}, [])

	return (
		<div className={styles.landingemailpage}>
			{error ? 
				(<div className='error'><p>{error}</p></div>) 
				:
				(<div className='warn'><p>{warn}</p></div>
			)}
		</div>
	)
}

export default LandingEmailPage
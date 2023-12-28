import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { applyActionCode, confirmPasswordReset, getAuth } from 'firebase/auth'
import styles from './LandingEmailPage.module.css'
import { Link } from 'react-router-dom'

const LandingEmailPage = () => {

	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const verifyEmailParams = new URLSearchParams(window.location.search)
	const mode = verifyEmailParams.get('mode')
	const actionCode = verifyEmailParams.get('oobCode')

	const resetUserPassword = async(auth, actionCode) => {
		try {
			const randomPassword = `senha${Math.floor(Math.random() * 100)}`
			await confirmPasswordReset(auth, actionCode, randomPassword);
			setSuccess(`Sua nova senha é: ${randomPassword}. Entre e troque sua senha imediatamente.`)
		} catch (error) {
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
			setSuccess("Email verificado com sucesso!")
		} catch (error) {
			if (error.message.includes("invalid-action-code")) {
				setError("Algo deu errado. Verifique se clicou no link correto em seu e-mail.")
			} else {
				setError("Algo deu errado.")
			}
		}
	}

	const recoverUserEmail = async(auth, actionCode) => {
		try {
			await applyActionCode(auth, actionCode)
			setSuccess("Seu e-mail foi recuperado. Entre e troque sua senha imediatamente.")
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
					await resetUserPassword(getAuth(), actionCode)
					break;
				case "verifyEmail":
					await verififyUserEmail(auth, actionCode)
					break;
				case "recoverEmail":
					await recoverUserEmail(auth, actionCode)
					break;
				default:
					setSuccess("...")
			} 
		}

		verifyAction(auth, actionCode, mode)

	}, [])

	return (
		<div className={styles.landingemailpage}>
				{error ? 
				(<div className='error'><p><span>{error}</span></p></div>) 
				:
				(<div className='success'>
					<p>
						<span>{success}</span>
					</p>
					<Link to="/login">Entre</Link>
				</div>
			)}
		</div>
	)
}

export default LandingEmailPage
import React from 'react'
import styles from "./ForgotPassword.module.css"
import { useState } from 'react'
import { useForgotPassword } from '../../Hooks/useForgotPassword'

const ForgotPassword = () => {

	const [email, setEmail] = useState(undefined)
	const [error, setError] = useState("")
	const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false)
	const {apiError, loading, forgotUserPassword} = useForgotPassword()

	const handleSubmit = async(e) => {
		e.preventDefault()

		if (email === undefined || email.trim() === "") {
			setError("Preencha todos os campos.")
			return;
		}

		const resp = await forgotUserPassword(email)
		setPasswordResetEmailSent(resp)
	}

	return (
		<div className={styles.forgotpassword}>
			 <div>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className='formtitle'>
						<h1>Mude sua senha</h1>
					</div>

					<div>
						<label htmlFor="email">E-mail: </label>
						<input 
						placeholder='Digite seu email'
						type="email" 
						name="email" 
						onChange={(e) => setEmail(e.target.value)}/>
					</div>

					{!loading ? (<input type="submit" value="Enviar"/>):(
					<input type="submit" value="Carregando..." className='loadingButton' disabled/>)}

					<div className="error">
						{error && <p>{error}</p>}
						{apiError && <p>{apiError}</p>}
					</div>

					{passwordResetEmailSent &&
						<div className="warn">
							<p>E-mail para restaurar senha foi enviado!</p>
						</div>
					}
					
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
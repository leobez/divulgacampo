import React from 'react'
import styles from "./ForgotPassword.module.css"
import { useState } from 'react'
import { useForgotPassword } from '../../Hooks/useForgotPassword'

const ForgotPassword = () => {

	const [email, setEmail] = useState(undefined)

	const [error, setError] = useState("")
	const [success, setSuccess] = useState(null)

	const {apiError, loading, forgotUserPassword} = useForgotPassword()

	const handleSubmit = async(e) => {
		e.preventDefault()
		setError("")
		setSuccess(null)

		if (email === undefined || email.trim() === "") {
			setError("Preencha todos os campos.")
			return;
		}

		const resp = await forgotUserPassword(email)
		setSuccess("E-mail para restaurar senha foi enviado!")
	}

	return (
		<div className={styles.forgotpassword}>
			 <div>
				<form onSubmit={handleSubmit} className="form">
					<div>
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

					<div>
						{!loading ? (<input type="submit" value="Enviar"/>):(
						<input type="submit" value="Carregando..." className='loadingButton' disabled/>)}
					</div>
				
					<div className="error">
						{error && <p><span>{error}</span></p>}
						{apiError && <p><span>{apiError}</span></p>}
					</div>

					{success &&
						<div className="success">
							<p>
								<span>{success}</span>
							</p>
						</div>
					}
					
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
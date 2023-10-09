import React from 'react'
import styles from "./ForgotPassword.module.css"
import { useState } from 'react'

const ForgotPassword = () => {

	const [email, setEmail] = useState(undefined)
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(email)
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

					{/* {!loading ? (<input type="submit" value="Enviar"/>):(
					<input type="submit" value="Carregando..." className='loadingButton' disabled/>)} */}
					<input type="submit" value="Enviar"/>

					<div className="error">
						{error && <p>{error}</p>}
					</div>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
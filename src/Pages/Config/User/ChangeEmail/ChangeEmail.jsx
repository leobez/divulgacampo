import React, { useContext } from 'react'
import styles from './ChangeEmail.module.css'
import { useState } from 'react'
import AuthContext from '../../../../Context/AuthContext' 
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail } from 'firebase/auth'
import { useAuthentication } from '../../../../Hooks/useAuthentication'

const ChangeEmail = () => {

	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const auth = useContext(AuthContext)

	const [password, setPassword] = useState(undefined)
	const [passwordAgain, setPasswordAgain] = useState(undefined)
	const [email, setEmail] = useState(undefined)

	const {authError, logoutUser} = useAuthentication()

	const handleSubmit = async(e) => {
		e.preventDefault()

		if (
			password === undefined || 
			passwordAgain === undefined || 
			email === undefined || 
			password.trim() === "" || 
			passwordAgain.trim() === "" || 
			email.trim() === ""
		) {
			setError("Preencha todos os campos.")
			return;
		}

		if (password.trim().length > 80) {
			setError("Tamanho máximo para senha: 80 caracteres")
			return;
		}

		if (password !== passwordAgain) {
			setError("Senhas devem ser iguais.")
			return;
		}
		setError("")
		setSuccess("")

		try {
			setLoading(true)
			const credential = EmailAuthProvider.credential(auth.currentUser.email, password)
			await reauthenticateWithCredential(auth.currentUser, credential)
			await updateEmail(auth.currentUser, email)
			await sendEmailVerification(auth.currentUser)
			setSuccess("Seu e-mail foi atualizado.")
			setLoading(false)
			setTimeout(() => logoutUser(auth), 1500)
		} catch (error) {
			setLoading(false)
			if (error.message.includes("wrong-password")) {
				setError("Senha incorreta.")
			} else {
				setError("Algo deu errado.")
			}
		}
	}

    return (
        <div className={styles.changeemail}>
            <div>
				<form onSubmit={handleSubmit} className="form">

					<div>
						<h1>Para alterar seu e-mail, digite sua senha:</h1>
					</div>

					<div>
						<label htmlFor="password">Senha: </label>
						<input 
						placeholder='Digite sua senha'
						type="password" 
						name="password" 
						onChange={(e) => setPassword(e.target.value)}/>
					</div>

					<div>
						<label htmlFor="password-again">Confirmar senha:</label>
						<input 
						placeholder='Confirme sua senha'
						type="password" 
						name="password-again" 
						onChange={(e) => setPasswordAgain(e.target.value)}/>
					</div>
					<hr />
					<div>
						<label htmlFor="email">Digite seu novo e-mail: </label>
						<input 
						placeholder='Digite seu novo email'
						type="email" 
						name="email" 
						onChange={(e) => setEmail(e.target.value)}/>
					</div>

					<div>
						{!loading ? (<input type="submit" value="Confirmar"/>) : (<input type="submit" className="loadingButton" value="Carregando..." disabled/>)} 
					</div>

					<div className="error">
						{error && <p><span>{error}</span></p>}
						{authError && <p><span>{authError}</span></p>}
					</div>

					<div className="success">
						{success && <p><span>{success}</span></p>}
					</div>

				</form>
			</div>
        </div>
    )
}

export default ChangeEmail
import React, {useState } from 'react'
import { useChangeUserInfo } from '../../../../Hooks/useChangeUserInfo'
import styles from './DeleteAccount.module.css'

const DeleteAccount = () => {

	const {loading, authError, deleteUserAccount} = useChangeUserInfo()
	const [error, setError] = useState("")

	const [password, setPassword] = useState(undefined)
	const [passwordAgain, setPasswordAgain] = useState(undefined)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (
			password === undefined || 
			passwordAgain === undefined |
			password.trim() === "" || 
			passwordAgain.trim() === ""
		) {
			setError("Preencha todos os campos.")
			return;
		}

		if (password !== passwordAgain) {
			setError("Senhas devem ser iguais.")
			return;
		}

		deleteUserAccount(password)
	}

	return (
		<div className={styles.deleteaccount}>
			<div>
				<form onSubmit={handleSubmit}>

					<div className='formtitle'>
						<h1>Digite sua senha para excluir a conta:</h1>
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

					{!loading ? (<input type="submit" value="Excluir"/>) : (<input type="submit" className="loadingButton" value="Carregando..." disabled/>)}

					<div className="error">
						{error && <p>{error}</p>}
						{authError && <p>{authError}</p>}
					</div>

				</form>
			</div>
		</div>
	)
}

export default DeleteAccount
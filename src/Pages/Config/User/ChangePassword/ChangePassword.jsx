import React from 'react'
import styles from './ChangePassword.module.css'
import { useState } from 'react'
import { useChangeUserInfo } from '../../../../Hooks/useChangeUserInfo'

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState(undefined)
    const [newPassword, setNewPassword] = useState(undefined)
	const [newPasswordAgain, setNewPasswordAgain] = useState(undefined)
    const [error, setError] = useState("")

    const {loading, authError, updateUserPassword} = useChangeUserInfo()

    const handleSubmit = async(e) => {
        e.preventDefault()

		if (
			currentPassword === undefined || 
			newPassword === undefined || 
			newPasswordAgain === undefined || 
			currentPassword.trim() === "" || 
			newPassword.trim() === "" || 
			newPasswordAgain.trim() === ""
		) {
			setError("Preencha todos os campos.")
			return;
		}

		if (newPassword.trim().length > 80) {
			setError("Tamanho máximo para senha: 80 caracteres")
			return;
		}

		if (newPassword !== newPasswordAgain) {
			setError("Senhas devem ser iguais.")
			return;
		}

        const data = {
            currentPassword,
            newPassword
        }

        await updateUserPassword(data)

    }

    return (
        <div className={styles.changepassword}>
            <div>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className='formtitle'>
						<h1>Mude sua senha</h1>
					</div>

					<div>
						<label htmlFor="currentpassword">Senha atual: </label>
						<input 
						placeholder='Digite sua senha atual'
						type="password" 
						name="currentpassword" 
						onChange={(e) => setCurrentPassword(e.target.value)
						}/>
					</div>
                    <hr />

					<div>
						<label htmlFor="newPassword">Nova senha: </label>
						<input 
						placeholder='Digite sua nova senha'
						type="password" 
						name="newPassword" 
						onChange={(e) => setNewPassword(e.target.value)}/>
					</div>

					<div>
						<label htmlFor="newPasswordAgain">Confirmar senha:</label>
						<input 
						placeholder='Confirme sua nova senha'
						type="password" 
						name="newPasswordAgain" 
						onChange={(e) => setNewPasswordAgain(e.target.value)}/>
					</div>

					{!loading ? (<input type="submit" value="Mudar"/>):(
					<input type="submit" value="Carregando..." className='loadingButton' disabled/>)}

					<div className="error">
						{error && <p>{error}</p>}
                        {authError && <p>{authError}</p>}
					</div>
				</form>
			</div>
        </div>
    )
}

export default ChangePassword
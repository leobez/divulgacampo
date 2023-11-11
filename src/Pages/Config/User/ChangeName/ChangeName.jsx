import React, { useState } from 'react'
import styles from './ChangeName.module.css'
import { useChangeUserInfo } from '../../../../Hooks/useChangeUserInfo'

const ChangeName = () => {

	const [name, setName] = useState("")
	const [error, setError] = useState("")

	const {loading, authError, updateName} = useChangeUserInfo()

	const handleSubmit = async(e) => {
		e.preventDefault()
		setError("")

		if (
			name === undefined || 
			name.trim() === ""  
		) {
			setError("Preencha todos os campos.")
			return;
		}

		if (name.trim().length > 40) {
			setError("Tamanho máximo para nome: 40 caracteres")
			return;
		}

		await updateName(name)


	}

	return (
		<div className={styles.changename}>
			<div>
				<form onSubmit={handleSubmit} className="form">

					<div>
						<h1>Mude seu nome</h1>
					</div>

					<div>
						<label htmlFor="newName">Digite seu novo nome: </label>
						<input 
						type="name" 
						name="name" 
						onChange={(e) => setName(e.target.value)}/>
					</div>

					<div>
						{!loading ? 
						(<input type="submit" value="Mudar"/>) : 
						(<input type="submit" className="loadingButton" value="Carregando..." disabled/>)}
					</div>
					
					<div className="error">
						{error && <p><span>{error}</span></p>}
						{authError && <p><span>{authError}</span></p>}
					</div>

				</form>
			</div>
		</div>
	)
}

export default ChangeName
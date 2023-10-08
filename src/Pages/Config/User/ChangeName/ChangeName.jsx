import React, { useState } from 'react'
import styles from './ChangeName.module.css'

const ChangeName = () => {

	const [name, setName] = useState("")
	const [error, setError] = useState("")


	const handleSubmit = (e) => {
		e.preventDefault()

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

		


	}

	return (
		<div className={styles.changename}>
			<div>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className='formtitle'>
						<h1>Mude seu nome</h1>
					</div>

					<div>
						<label htmlFor="newName">Digite seu novo nome: </label>
						<input 
						type="name" 
						name="name" 
						onChange={(e) => setName(e.target.value)}/>
					</div>

					<input type="submit" value="Mudar"/>

{/* 					{!loading ? 
					(<input type="submit" value="Mudar"/>) : 
					(<input type="submit" className="loadingButton" value="Carregando..." disabled/>)} */}

					<div className="error">
						{error && <p>{error}</p>}
					</div>
				</form>
			</div>
		</div>
	)
}

export default ChangeName
import React from 'react'
import styles from './ChangeEmail.module.css'
import { useState } from 'react'

const ChangeEmail = () => {

	const [email, setEmail] = useState(undefined)
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()

		if (email === undefined || email.trim() === "") {
			setError("Preencha todos os campos.")
			return;
		}

		console.log("EMAIL: ", email)
	}

    return (
        <div className={styles.changeemail}>
            <div>
				<form onSubmit={handleSubmit} className={styles.form}>

					<div className='formtitle'>
						<h1>Alterar email</h1>
					</div>

					<div>
						<label htmlFor="email">Digite seu novo email: </label>
						<input 
						placeholder='Digite seu novo email'
						type="email" 
						name="email" 
						onChange={(e) => setEmail(e.target.value)}/>
					</div>

					<input type="submit" value="Confirmar"/>

					{/* {!loading ? (<input type="submit" value="Confirmar"/>) : (<input type="submit" className="loadingButton" value="Carregando..." disabled/>)} */}

					<div className="error">
						{error && <p>{error}</p>}
						{/* {authError && <p>{authError}</p>} */}
					</div>

				</form>
			</div>
        </div>
    )
}

export default ChangeEmail
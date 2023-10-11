import React, { useContext } from 'react'
import styles from './ChangeEmail.module.css'
import { useState } from 'react'
import { useSendEmail } from '../../../../Hooks/useSendEmail'
import AuthContext from '../../../../Context/AuthContext' 

const ChangeEmail = () => {

	const auth = useContext(AuthContext)
	const [email, setEmail] = useState(undefined)
	const [error, setError] = useState("")

	const {error: email_error, loading, sendEmail} = useSendEmail()

	const handleSubmit = (e) => {
		e.preventDefault()

		if (email === undefined || email.trim() === "") {
			setError("Preencha todos os campos.")
			return;
		}

		console.log("EMAIL: ", email)
	}

	const handleSubmit2 = (e) => {
		e.preventDefault()

		data = {
			serviceId: 'service_3xbqpjb', 
			templateId: 'template_vyln8oj', 
			templateParams: {
				name: auth.currentUser.displayName,
				message: "Clique no botão para alterar seu email."
			}
		}

	}

    return (
        <div className={styles.changeemail}>
            <div>
				<form onSubmit={handleSubmit2} className={styles.form}>

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
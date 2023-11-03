import React, { useState } from 'react'
import styles from './Contact.module.css'

const Contact = () => {

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()

		if (
			name.trim() === "" || 
			name.trim() === undefined || 
			name.trim() === null ||
			email.trim() === "" || 
			email.trim() === undefined ||
			email.trim() === null ||
			message === "" || 
			message === undefined ||
			message === null
		) {
			setError("Preencha todos os campos.")
			return;
		}

	}

	return (
		<div className={styles.contact}>
			<div>
				<form onSubmit={handleSubmit} className="form">

					<div>
						<h1>Nos contate: </h1>
					</div>

					<div>
						<label htmlFor="name">Nome: </label>
						<input 
						placeholder='Digite seu nome'
						type="text" 
						name="name" 
						onChange={(e) => setName(e.target.value)
						}/>
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
						<label htmlFor="message">Mensagem: </label>
						<textarea 
							type='text' 
							name='message'
							placeholder='Mensagem'
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
					
					<div>
						<input type="submit" value="Enviar"/>
					</div>
					

					{/* <div>
						{!loading ? (<input type="submit" value="Enviar"/>):(
						<input type="submit" value="Carregando..." className='loadingButton' disabled/>)}
					</div> */}

					<div className="error">
						{error && <p><span>{error}</span></p>}
					</div> 

					{/* <div className="error">
						{error && <p><span>{error}</span></p>}
						{authError && <p><span>{authError}</span></p>}
					</div> */}
				</form>
			</div>
		</div>
	)
}

export default Contact
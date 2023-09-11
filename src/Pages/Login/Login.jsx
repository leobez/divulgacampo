import { useState } from 'react'
import styles  from "./Login.module.css"

import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

const Login = ({auth}) => {

	const [email, setEmail] = useState(undefined)
	const [password, setPassword] = useState(undefined)

	const [error, setError] = useState("")

	const navigate = useNavigate()

	const loginUser = async(user, auth) => {
		try {
			await signInWithEmailAndPassword(auth, user.email, user.password)
		} catch (error) {
			console.log(error)
			setError(error.message)
		}

	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (email === undefined || password === undefined) {
			setError("Deve digitar todos os campos!")
			return;
		}

		const user = {
			email: email,
			password: password,
		}
		setError("")

		loginUser(user, auth)
		navigate("/")
		
		//console.log("USER: ", user)
	}

    return (
		<div className={styles.login}>
		<div>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div>
					<label htmlFor="email">E-mail: </label>
					<input 
					placeholder='Digite seu email'
					type="email" 
					name="email" 
					onChange={(e) => setEmail(e.target.value)}/>
				</div>

				<div>
					<label htmlFor="password">Senha: </label>
					<input 
					placeholder='Digite sua senha'
					type="password" 
					name="password" 
					onChange={(e) => setPassword(e.target.value)}/>
				</div>

				<input type="submit" value="Entrar"/>

				<div className={styles.error}>
					{error && <p>{error}</p>}
				</div>
				
			</form>
		</div>
	</div>
    )
}

export default Login
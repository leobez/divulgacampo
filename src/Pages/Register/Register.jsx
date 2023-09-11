import { useState } from 'react'
import styles  from "./Register.module.css"
import {db} from "../../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Register = ({auth}) => {

	const [name, setName] = useState(undefined)
	const [email, setEmail] = useState(undefined)
	const [password, setPassword] = useState(undefined)
	const [passwordAgain, setPasswordAgain] = useState(undefined)
	const [error, setError] = useState("")

	const navigate = useNavigate()

	const createUser = async(auth, userData) => {
		try {
			const {user} = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
			await updateProfile(user, {displayName: userData.displayName})
			return user
		} catch (error) {
			console.log(error)
			setError(error.message)
		}
	}

	const handleSubmit = async(e) => {
		e.preventDefault()

		if (password !== passwordAgain) {
			setError("Senhas devem ser iguais!")
			return;
		}

		if (name === undefined || email === undefined || password === undefined || passwordAgain === undefined) {
			setError("Deve digitar todos os campos!")
			return;
		}

		const user = {
			displayName: name,
			email: email,
			password: password,
		}
		setError("")

		await createUser(auth, user)

		navigate("/")

		//console.log("USER: ", user)
	}

	return (
		<div className={styles.register}>
			<div>
				<form onSubmit={handleSubmit} className={styles.form}>
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

					<input type="submit" value="Cadastrar"/>

					<div className={styles.error}>
						{error && <p>{error}</p>}
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register
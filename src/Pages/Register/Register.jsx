import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles  from "./Register.module.css"
import { useAuthentication } from '../../Hooks/useAuthentication'
import AuthContext from '../../Context/AuthContext'

const Register = () => {

	const [name, setName] = useState(undefined)
	const [email, setEmail] = useState(undefined)
	const [password, setPassword] = useState(undefined)
	const [passwordAgain, setPasswordAgain] = useState(undefined)

	const {loading, authError, registerUser} = useAuthentication()
	const [error, setError] = useState()
	const auth = useContext(AuthContext)

	const handleSubmit = async(e) => {
		e.preventDefault()

		if (
			name === undefined || 
			email === undefined || 
			password === undefined || 
			passwordAgain === undefined || 
			name.trim() === "" || 
			email.trim() === "" || 
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

		const user = {
			displayName: name,
			email: email,
			password: password,
		}
		setError("")

		await registerUser(auth, user)
	}

	return (
		<div className={styles.register}>
			<input type= 'name' placeholder ='Nome'/>
			<input type ='email' placeholder='E-mail'/>
        	<input type ='password' placeholder='Senha'/>
			<input type ='password' placeholder='Repetir Senha'/>
        	<button type = 'button' >Cadastrar</button>
		</div>
	)
}

export default Register
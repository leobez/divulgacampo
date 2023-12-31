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

		if (name.trim().length > 40) {
			setError("Tamanho máximo para nome: 40 caracteres")
			return;
		}
		if (password.trim().length > 80) {
			setError("Tamanho máximo para senha: 80 caracteres")
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
			<div>
				<form onSubmit={handleSubmit} className="form">

					<div>
						<h1>Cadastre-se !</h1>
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
					
					<div>
						{!loading ? (<input type="submit" value="Cadastrar"/>):(
						<input type="submit" value="Carregando..." className='loadingButton' disabled/>)}
					</div>
			
					<div className={styles.extralinks}>
						<Link to="/login" className="nonNavLink">Já criou uma conta?</Link>
						<Link to="/forgotpassword" className="nonNavLink">Esqueceu sua senha?</Link>
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

export default Register
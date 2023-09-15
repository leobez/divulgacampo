import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles  from "./Login.module.css"
import { useAuthentication } from '../../Hooks/useAuthentication'
import AuthContext from '../../Context/AuthContext'

const Login = () => {

	const [email, setEmail] = useState(undefined)
	const [password, setPassword] = useState(undefined)
	const [error, setError] = useState("")

	const {loading, authError, loginUser} = useAuthentication()
	const auth = useContext(AuthContext)

	const handleSubmit = async(e) => {
		e.preventDefault()

		if (email === undefined || password === undefined || email.trim() === "" || password.trim() === "") {
			setError("Preencha todos os campos.")
			return;
		}

		const user = {
			email: email,
			password: password,
		}
		setError("")

		await loginUser(auth, user)
	}

    return (
		<div className={styles.login}>
		<div>
			<form onSubmit={handleSubmit} className={styles.form}>

				<div className={styles.title}>
					<h1>Entre !</h1>
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

				{!loading ? (<input type="submit" value="Entrar"/>) : (<input type="submit" className="loadingButton" value="Carregando..." disabled/>)}

				<div className={styles.extrabuttons}>
					<Link to="/register" className="nonNavLink">Já criou uma conta?</Link>
					<Link to="/resetpassword" className="nonNavLink">Esqueceu sua senha?</Link>
				</div>

				<div className="error">
					{error && <p>{error}</p>}
					{authError && <p>{authError}</p>}
				</div>
			</form>
		</div>
	</div>
    )
}

export default Login
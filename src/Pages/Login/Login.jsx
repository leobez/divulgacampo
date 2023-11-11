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
				<form onSubmit={handleSubmit} className="form">

					<div>
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

					<div>
						{!loading ? (<input type="submit" value="Entrar"/>) : (<input type="submit" className="loadingButton" value="Carregando..." disabled/>)}
					</div>

					<div className={styles.extralinks}>
						<Link to="/register" className="nonNavLink">Não tem conta?</Link>
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

export default Login
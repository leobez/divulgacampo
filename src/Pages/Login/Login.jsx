import { useContext, useState } from 'react'
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
/* 
		loginUser(auth, user).then((message) => {
			console.log(message)
		}).catch((message) => {
			console.log(message)
		}) */

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

				{!loading ? (<input type="submit" value="Entrar"/>) : (<input type="submit" className="loadingButton" value="Carregando..." disabled/>)}

				<div className={styles.error}>
					{error && <p>{error}</p>}
				</div>
				<div className={styles.error}>
					{authError && <p>{authError}</p>}
				</div>

			</form>
		</div>
	</div>
    )
}

export default Login
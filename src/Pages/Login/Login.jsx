import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
            
           <input type ='email' placeholder='E-mail'/>
           <input type ='password' placeholder='Senha'/>
           <button type = 'button' >Entrar</button>
           {/* <h1>Não Possui Cadastro?</h1> */}
           
           <button type = 'button' >Cadastrar</button>
        </div>
        
    )
}


export default Login
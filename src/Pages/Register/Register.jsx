import React from 'react'
import styles  from "./Register.module.css"

const Register = () => {
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
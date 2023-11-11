import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../Context/AuthContext'
import styles from './User.module.css'
import { Link } from 'react-router-dom'

const User = () => {

	const auth = useContext(AuthContext)

	return (
		<div className={styles.configuser}> 

			{!auth.currentUser && <p>Cadastre para ter acesso a essas configurações!</p>}
			{ auth.currentUser &&
				<>
					<h1>Suas informações: </h1>
					<hr />
					<p className={styles.info}>Seu id é: <span>{auth.currentUser.uid}</span></p>
					<p className={styles.info}>Seu nome é: <span>{auth.currentUser.displayName}</span></p>
					<p className={styles.info}>Seu email é: <span>{auth.currentUser.email}</span></p>
					<hr />
					
					<div>
						<Link to="/changename">Trocar nome </Link>
					</div>

					<div>
						<Link to="/changeemail"> Trocar email </Link>
					</div>

					<div>
						<Link to="/changepassword"> Trocar senha </Link>
					</div>

					<div>
						<Link to="/deleteaccount"> Excluir conta </Link>
					</div>
				</>
			}
			
		</div>
	)
}

export default User
import React from 'react'
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useAuthentication } from '../../Hooks/useAuthentication'

const Navbar = () => {

	const auth = useContext(AuthContext)

	const {logoutUser} = useAuthentication()
	
	const handleLogout = async () => {
		await logoutUser(auth)
	}

	return (
		<nav className={styles.navbar}>

			{/* LINKS FOR ALL USERS */}
			<NavLink to="/">
				Home
			</NavLink>

			<NavLink to="/about">
				Sobre
			</NavLink>

			{/* LINKS FOR AUTHENTICATED/NON-AUTHENTICADED USERS */}
			{auth.currentUser ?
				(
					<>
						<NavLink to="/myprofile">
							Meu perfil
						</NavLink>
						
						<NavLink to="/createpost">
							Criar postagem
						</NavLink>

						<button  onClick={handleLogout}>
							Sair
						</button>
					</>
				)
				:
				(
					<>
						<NavLink
							to="/login"
							className={({ isActive }) => isActive ? "active" : ""}>
							Entrar
						</NavLink>

						<NavLink
							to="/register"
							className={({ isActive }) => isActive ? "active" : ""}>
							Cadastro
						</NavLink>
					</>
				)
			}
		</nav>
	)
}

export default Navbar
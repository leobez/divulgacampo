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
		<nav className="navbar">
			<NavLink
				to="/"
				className={({ isActive }) => isActive ? styles.active : ""}>
				Home
			</NavLink>

			<NavLink
				to="/about"
				className={({ isActive }) => isActive ? styles.active : ""}>
				Sobre
			</NavLink>

			{auth.currentUser ?
				(
					<>
						<NavLink
							to="/myprofile"
							className={({ isActive }) => isActive ? styles.active : ""}>
							Meu perfil
						</NavLink>
						
						<NavLink
							to="/createpost"
							className={({ isActive }) => isActive ? styles.active : ""}>
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
							className={({ isActive }) => isActive ? styles.active : ""}>
							Entrar
						</NavLink>

						<NavLink
							to="/register"
							className={({ isActive }) => isActive ? styles.active : ""}>
							Cadastro
						</NavLink>
					</>
				)
			}

		</nav>
	)
}

export default Navbar
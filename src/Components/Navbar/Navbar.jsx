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
				className={({ isActive }) => isActive ? "active" : ""}>
				Home
			</NavLink>

			<NavLink
				to="/about"
				className={({ isActive }) => isActive ? "active" : ""}>
				Sobre
			</NavLink>

			{auth.currentUser ?
				(
					<>
						<NavLink
							to="/myprofile"
							className={({ isActive }) => isActive ? "active" : ""}>
							Meu perfil
						</NavLink>
						
						<NavLink
							to="/createpost"
							className={({ isActive }) => isActive ? "active" : ""}>
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
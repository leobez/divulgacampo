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
			<NavLink
				to="/"
				className={({ isActive }) => isActive ? styles.active : ""}>
				Home
			</NavLink>

			{auth.currentUser ?
				(
					<>
						<NavLink
							to="/myprofile"
							className={({ isActive }) => isActive ? styles.active : ""}>
							Meu perfil
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
							Login
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
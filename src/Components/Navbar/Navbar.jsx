import React from 'react'
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'

const Navbar = ({ auth, isLogged, setIsLogged }) => {

	const handleLogout = async () => {
		console.log("DESLOGANDO USUARIO: ", auth)
		try {
			await signOut(auth)
			setIsLogged(false)
			console.log("DESLOGADO")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<nav className={styles.navbar}>
			<NavLink
				to="/"
				className={({ isActive }) => isActive ? styles.active : ""}>
				Home
			</NavLink>

			{isLogged ?
				(
					<button  onClick={handleLogout}>
						Sair
					</button>
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
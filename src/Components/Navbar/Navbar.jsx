import React from 'react'
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ auth, isLogged, setIsLogged }) => {

	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await signOut(auth)
			setIsLogged(false)
			console.log("DESLOGADO")
			navigate("/")
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
import React from 'react'
import styles  from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
	
    return (
		<nav className={styles.navbar}>
			<NavLink 
			to="/" 
			className={({isActive}) => isActive ? styles.active : ""}>
				Home
			</NavLink>

			<NavLink 
			to="/login" 
			className={({isActive}) => isActive ? styles.active : ""}>
				Login
			</NavLink>			
			
			<NavLink 
			to="/register" 
			className={({isActive}) => isActive ? styles.active : ""}>
				Cadastro
			</NavLink>	  	
		</nav>
	)
}

export default Navbar
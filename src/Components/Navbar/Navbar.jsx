import React from 'react'
import { NavLink } from "react-router-dom"
import styles  from "./Navbar.module.css"

const Navbar = () => {

    return (
		<nav className={styles.navbar}>
			<NavLink className={styles.brand} to="/">
				TC <span>Campo</span>
			</NavLink>
			<ul className={styles.links_list}>
				<li>
					<NavLink
					to="/"
					className={({ isActive }) => (isActive ? styles.active : "")}
					>
					Home
					</NavLink>
				</li>
			</ul>
	  </nav>
	)
}

export default Navbar
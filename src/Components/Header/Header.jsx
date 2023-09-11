import React from 'react'
import styles from "./Header.module.css"

import Home from "../../Pages/Home/Home"
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className={styles.header}>
			<Link to="/" element={<Home></Home>}>
				<div>
					<span className={styles.divulga}>Divulga</span>
					<span className={styles.campo}>Campo</span>
				</div>
			</Link>
		</div>
	)
}

export default Header
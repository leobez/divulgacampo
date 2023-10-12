import React from 'react'
import styles from './Config.module.css'
import { NavLink, Navigate } from 'react-router-dom'
import User from './User/User'

const Config = ({element}) => {

	return (
		<div className={styles.config}>
			
			<div className={styles.confignavbarcontainer}>
				<nav className="navbar">

					<NavLink to="/config/user">
						Usuário
					</NavLink>

				</nav>
			</div>
			
			<div className={styles.configcontainer}>
				{element === "config" && <p>{<Navigate to='user'/>}</p>}
				
				{element === "user" && <User/>}
			</div>
		</div>
	)
}

export default Config
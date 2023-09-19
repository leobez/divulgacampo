import React from 'react'
import styles from './Config.module.css'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import User from './User/User'

const Config = ({element}) => {

	const navigate = useNavigate()

	return (
		<div className={styles.config}>
			
			<div className={styles.confignavbarcontainer}>
				<nav className="navbar">

					<NavLink
						to="/config/user"
						className={({ isActive }) => isActive ? styles.active : ""}>
						Usuário
					</NavLink>

					<NavLink
						to="/config/appearance"
						className={({ isActive }) => isActive ? styles.active : ""}>
						Aparência
					</NavLink>

					<NavLink
						to="/config/accessibility"
						className={({ isActive }) => isActive ? styles.active : ""}>
						Acessibilidade
					</NavLink>

				</nav>
			</div>
			
			<div className={styles.configcontainer}>
				{element === "config" && <p>{<Navigate to='user'/>}</p>}
				{element === "user" && <User/>}
				{element === "appearance" && <p>Configuração de aparência</p>}
				{element === "accessibility" && <p>Configuração de acessibilidade</p>}
			</div>
		</div>
	)
}

export default Config
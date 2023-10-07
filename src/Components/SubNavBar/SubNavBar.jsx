import React from 'react'
import styles from './SubNavBar.module.css'
import { NavLink } from 'react-router-dom'
import RefreshButton from '../RefreshButton/RefreshButton'

const SubNavBar = () => {

	return (
		<div className={styles.subnavbar}>

			<div>
				<RefreshButton/>
			</div>

			<div>
				<NavLink 
				className={({ isActive }) => isActive ? styles.configlinkactive : styles.configlink} 
				to='/config'>
					<img src="..\src\assets\icons8-settings-50.png" alt="config-icon" />
				</NavLink>

				<NavLink className={styles.contactlink} to='/contact'>
					Contato
				</NavLink>
			</div>
		</div>
	)
}

export default SubNavBar
import React from 'react'
import styles from './SubNavBar.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import RefreshButton from '../RefreshButton/RefreshButton'

const SubNavBar = () => {

	const location = useLocation()

	return (
		<div className={styles.subnavbar}>

			{location.pathname === "/" &&
				<div className={styles.subnavbarunfixed}> 
					<RefreshButton/>
				</div>
			}
			{location.pathname === "/myprofile" &&
				<div className={styles.subnavbarunfixed}> 
					<RefreshButton/>
				</div>
			}

			<div className={styles.subnavbarfixed}>
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
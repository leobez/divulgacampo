import React from 'react'
import styles from './SubNavBar.module.css'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'

const SubNavBar = () => {

	const auth = useContext(AuthContext)

	return (
		<div className={styles.subnavbar}>
			
			<NavLink to='/config'>
				Menu
			</NavLink>

			<NavLink to='/contact'> 
				Contato 
			</NavLink> 
			
		</div>
	)
}

export default SubNavBar
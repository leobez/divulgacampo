import React, { useContext } from 'react'
import AuthContext from '../../../Context/AuthContext'
import styles from './User.module.css'
import { Link } from 'react-router-dom'

const User = () => {
	
	const auth = useContext(AuthContext)

	return (
		<div className={styles.configuser}> 
			<p>Configuração de usuário</p>
			{ auth.currentUser &&
				<>
					<div>
						<Link className='nonNavLink' to="/">Trocar senha </Link>
					</div>

					<div>
						<Link className='nonNavLink' to="/">Trocar email </Link>
						<span>{auth.currentUser.email}</span>
					</div>

					<div>
						<Link className='nonNavLink' to="/">Trocar displayName </Link>
						<span>{auth.currentUser.displayName}</span>
					</div>
				</>
			}
			
		</div>
	)
}

export default User
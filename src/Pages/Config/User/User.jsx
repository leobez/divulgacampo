import React, { useContext } from 'react'
import AuthContext from '../../../Context/AuthContext'
import styles from './User.module.css'

const User = () => {
	
	const auth = useContext(AuthContext)

	return (
		<div className={styles.configuser}> 
			<p>Configuração de usuário</p>
			<hr />
			{ auth.currentUser &&
				<>
					<div>
						<button>Trocar de senha </button>
					</div>

					<div>
						<button>Trocar de email </button>
						<span>{auth.currentUser.email}</span>
					</div>

					<div>
						<button>Trocar displayName </button>
						<span>{auth.currentUser.displayName}</span>
					</div>
				</>
			}
			
		</div>
	)
}

export default User
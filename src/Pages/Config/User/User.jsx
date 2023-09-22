import React, { useContext } from 'react'
import AuthContext from '../../../Context/AuthContext'

const User = () => {
	
	const auth = useContext(AuthContext)

	return (
		<div>
			<p>Configuração de usuário</p>
			<hr />
			{ auth.currentUser &&
				<>
					<p>Trocar de senha </p>
					<p>Trocar de email: <span>{auth.currentUser.email}</span></p>
					<p>Trocar displayName:  <span>{auth.currentUser.displayName}</span></p>
				</>
			}
			
		</div>
	)
}

export default User
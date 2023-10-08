import React, { useEffect, useState } from 'react'
import { useChangeUserInfo } from '../../../../Hooks/useChangeUserInfo'

const DeleteAccount = () => {

	const {loading, authError, deleteUserAccount} = useChangeUserInfo()

	useEffect(() => {
		deleteUserAccount()
	}, [])

	return (
		<div>
			<div className="warn">
				{loading && <p>Excluindo conta...</p>}
			</div>
			<div className="error">
				{authError && <p>{authError}</p>}
			</div>
		</div>
	)
}

export default DeleteAccount
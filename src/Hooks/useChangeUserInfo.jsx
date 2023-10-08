import { useContext, useState } from "react"

import AuthContext from '../Context/AuthContext'
import { updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const useChangeUserInfo = () => {

	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const [authError, setAuthError] = useState("")
	const [loading, setLoading] = useState(false)

	const updateName = async(newName) => {
		try {
			setLoading(true)
			await updateProfile(auth.currentUser, {
				displayName: newName
			})
			setLoading(false)

			navigate("/config/user")

		} catch (error) {
			setLoading(false)
			setAuthError("Algo deu errado.")
		}
	}


	return {
		loading,
		authError,
		updateName	
	}
}
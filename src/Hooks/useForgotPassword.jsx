import { useState } from "react"
import { sendPasswordResetEmail, getAuth, generatePasswordResetLink } from 'firebase/auth'

export const useForgotPassword = () => {

	const [apiError, setApiError] = useState("")
	const [loading, setLoading] = useState(false)

	const forgotUserPassword = async(email) => {

		const auth = getAuth()

		try {
			setLoading(true)
			await sendPasswordResetEmail(getAuth(), email)
			setLoading(false)
			return true
		} catch (error) {
			setLoading(false)
			console.log(error)
			setAuthError("Algo deu errado.")
		}
	}

	return {
		apiError,
		loading,
		forgotUserPassword,
	}
}
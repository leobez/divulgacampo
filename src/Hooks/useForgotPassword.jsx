import { useState } from "react"

export const useForgotPassword = () => {

	const [apiError, setApiError] = useState("")
	const [loading, setLoading] = useState(false)

	const forgotUserPassword = async(email) => {
		try {
			setLoading(true)
			console.log(email)
			setLoading(false)
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
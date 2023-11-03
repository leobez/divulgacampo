import { useState } from "react"

export const useSendContactEmail = () => {


	const [apiError, setApiError] = useState("")
	const [loading, setLoading] = useState(false)

	const sendEmail = async() => {
		setApiError("")

		try {
			setLoading(true)
			console.log("chegou")
			setLoading(false)

		} catch (error) {
			setLoading(false)
			setApiError("Algo deu errado")
			console.log(error)
		}

	}

	return {
		loading, 
		apiError,
		sendEmail
	}
}
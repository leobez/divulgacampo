import { useState } from "react"

export const useSendEmail = () => {

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	return {
		error,
		loading,
	}
} 
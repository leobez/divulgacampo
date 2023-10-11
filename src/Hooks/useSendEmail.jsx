import { useState } from "react"
import { emailjs } from "../emailjs/config"

export const useSendEmail = () => {

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	

	return {
		error,
		loading
	}
} 
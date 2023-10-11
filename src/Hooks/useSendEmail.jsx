import { useState } from "react"
import { emailjs } from "../emailjs/config"

export const useSendEmail = () => {

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const sendEmail = async({serviceId, templateId, templateParams}) => {
		try {
			const res = await emailjs.send(serviceId, templateId, templateParams)
			console.log(res)
		} catch (error) {
			console.log(error)
			setError("Algo deu errado.")
		}	
	}


	return {
		error,
		loading,
		sendEmail
	}
} 
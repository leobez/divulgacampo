import { useState } from "react"
import emailjs from '@emailjs/browser';
import emailjsconfig from '../emailjs/config'

export const useSendContactEmail = () => {


	const [apiError, setApiError] = useState("")
	const [apiSuccess, setApiSuccess] = useState("")
	const [loading, setLoading] = useState(false)

	const sendEmail = async(data) => {
		setApiError("")
		setApiSuccess("")

		try {
			setLoading(true)
			await emailjs.send(
				emailjsconfig.Service_ID, 
				emailjsconfig.Template_ID,
				data, 
				emailjsconfig.Public_key
			)

			setApiSuccess("Email enviado com sucesso.")
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
		apiSuccess,
		sendEmail
	}
}
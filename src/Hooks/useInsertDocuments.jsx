import { useState } from "react"
import {db} from "../firebase/config"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const useInsertDocument = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const navigate = useNavigate()

	const insertDocument = async(data) => {
		setApiError("")

 		try {

			setLoading(true)

			const expiresIn = new Date()
			expiresIn.setDate(
				Timestamp.now().toDate().getDate() + data.postTTL
			)

			await addDoc(collection(db, collectionName), {
				uid: data.uid,
				displayName: data.displayName,
				title: data.title,
				description: data.description,
				quizLinks: data.quizLinks,
				keywords: data.keywords,
				createdAt: Timestamp.now(),
				expiresIn: expiresIn
			})
			setLoading(false)
			navigate("/")

		} catch (error) {
			setLoading(false)
			setApiError("Algo deu errado")
		}  
	}

	return {
		loading,
		apiError,
		insertDocument
	}
}
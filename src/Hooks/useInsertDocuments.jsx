import { useState } from "react"
import {db} from "../firebase/config"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const useInsertDocument = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const navigate = useNavigate()

	const insertDocument = async(data) => {

		try {
			setLoading(true)
			await addDoc(collection(db, collectionName), {
				uid: data.uid,
				displayName: data.displayName,
				title: data.title,
				description: data.description,
				quizLinks: data.quizLinks,
				createdAt: Timestamp.now()
			})
			setLoading(false)
			navigate("/")

		} catch (error) {
			setLoading(false)
			setApiError(error)
		} 
	}

	return {
		loading,
		apiError,
		insertDocument
	}
}
import { useState } from "react"
import {db} from "../firebase/config"
import { Timestamp, addDoc, collection, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const useUpdateDocument = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const navigate = useNavigate()

	const updateDocument = async(docId) => {

		try {
			setLoading(true)
			const docRef = doc(db, collectionName, docId)
			console.log("ATUALIZANDO POST: ", docId)
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
		updateDocument
	}
}
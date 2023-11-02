import { useState } from "react"
import {db} from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const useUpdateDocument = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const navigate = useNavigate()

	const updateDocument = async(docId, newData) => {

		try {
			setLoading(true)
			const docRef = doc(db, collectionName, docId)
			await updateDoc(docRef, newData)
			setLoading(false)
			navigate("/myprofile")
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
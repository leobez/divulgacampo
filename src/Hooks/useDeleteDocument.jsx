import { deleteDoc, doc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase/config"

export const useDeleteDocument = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")

	const deleteDocument = async(docId) => {
		setApiError("")

		try {
			setLoading(true)
			const docRef = doc(db, collectionName, docId)
			await deleteDoc(docRef)
			setLoading(false)
		} catch (error) {
			setApiError("Algo deu errado.")
			console.log(error)
		}
	}
	
	return {
		loading,
		apiError,
		deleteDocument
	}

}
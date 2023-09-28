import { deleteDoc, doc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase/config"

export const useDeleteDocument = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")

	const deleteDocument = async(docId) => {
		try {
			setLoading(true)
			console.log("deletando doc: ", docId)
			const docRef = doc(db, collectionName, docId)
			await deleteDoc(docRef)
			setLoading(false)
		} catch (error) {
			setApiError("Erro de api.")
			console.log(error)
		}
	}
	
	return {
		loading,
		apiError,
		deleteDocument
	}

}
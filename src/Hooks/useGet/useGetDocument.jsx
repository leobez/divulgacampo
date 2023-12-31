import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { doc, getDoc} from "firebase/firestore"

export const useGetDocument = (collectionName, docId=null) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")

	const [cancelled, setCancelled] = useState(false)
	const [listOfDocs, setListOfDocs] = useState([])

	useEffect(() => {

		const getDocument = async(docId) => {
			
			setApiError("")
			
			if (cancelled) return;

			setListOfDocs([])

			try {
				setLoading(true)
				const docRef = doc(db, collectionName, docId)
				const docSnap = await getDoc(docRef)
				setLoading(false)
				setListOfDocs([docSnap.data()])
			} catch (error) {
				setApiError("Algo deu errado.")
				setLoading(false)
			}
		}
		
		getDocument(docId)

		return () => setCancelled(true)

	}, [collectionName, docId, cancelled])

	return {
		loading, 
		apiError,
		listOfDocs,
	}
}
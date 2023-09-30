import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"

export const useGetDocuments = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")

	const [cancelled, setCancelled] = useState(false)
	const [listOfDocs, setListOfDocs] = useState([])

	useEffect(() => {

		const getDocuments = async() => {
			if (cancelled) return;

			try {
				setLoading(true)
				const col = collection(db, collectionName)
				const q = await query(col, orderBy('createdAt', 'desc'))
	
				await onSnapshot(q, (querySnapshot) => {
					console.log("TRIGGER: getDocuments")
					if (querySnapshot.docs.length <= 0) setListOfDocs([])
					querySnapshot.docs.forEach(doc => {
						setListOfDocs((prev) => [...prev, {postData: doc.data(), postId: doc.id}])
					});
				})

				setLoading(false)

			} catch (error) {
				setApiError("Algo deu errado.")
				console.log(error)
				setLoading(false)
			}
		}

		getDocuments()
		
		return () => setCancelled(true)

	}, [collectionName, cancelled])

	return {
		loading, 
		apiError,
		listOfDocs,
	}
}
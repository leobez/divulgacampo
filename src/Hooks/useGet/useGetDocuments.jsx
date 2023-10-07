import { useState } from "react"
import {db} from "../../firebase/config"
import { collection, getDocs, orderBy, query } from "firebase/firestore"

export const useGetDocuments = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const [listOfDocs, setListOfDocs] = useState([])

	const getDocuments = async() => {
		
		setListOfDocs([])
		try {
			setLoading(true)
			const col = collection(db, collectionName)
			const q = await query(col, orderBy('createdAt', 'desc'))
			const snapshot = await getDocs(q)

			if (snapshot.docs.length <= 0) {
				setListOfDocs([])
			} else {
				snapshot.docs.forEach(
					(doc) => setListOfDocs((prev) => [...prev, {postData: doc.data(), postId: doc.id}])
				)
			}
			
			setLoading(false)

		} catch (error) {
			setApiError("Algo deu errado.")
			console.log(error)
			setLoading(false)
		}
	}

	return {
		loading, 
		apiError,
		getDocuments,
		listOfDocs,
	}
}
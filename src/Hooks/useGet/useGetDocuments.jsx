import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"

export const useGetDocuments = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const [message, setMessage] = useState("")

	const [listOfDocs, setListOfDocs] = useState([])
	const [lastPost, setLastPost] = useState([])

	const [getMoreDocs, setGetMoreDocs] = useState(0)
	const [refresh, setRefresh] = useState(false)

	/* TO DO: 
		CREATE A FUNCTION TO REMOVE EXPIRED DOCUMENTS 
		USEEFFECT KEEPS RUNNING WHEN CODE IS CHANGED
		*/

	useEffect(() => {
		// No more posts to load
		if (lastPost === undefined) {
			setMessage("Não há mais posts.")
		} else {
			setMessage("")
		}
	}, [lastPost])

	useEffect(() => {

		const getDocuments = async() => {

			if (refresh) {
				setListOfDocs([])
				setGetMoreDocs(0)
				setRefresh(false)
				return;
			}

			console.log("getDocuments")
			const PAGINATION_LIMIT = 5;

			try {
				setLoading(true)
				const col = collection(db, collectionName)

				let q;

				// First query
				if (getMoreDocs === 0) {
					q = await query(
						col, 
						orderBy("createdAt", "desc"),
						limit(PAGINATION_LIMIT))
				} else {
					q = await query(
						col, 
						orderBy("createdAt", "desc"),
						startAfter(lastPost),
						limit(PAGINATION_LIMIT))
				}
	
				const snapshot = await getDocs(q)
				setLastPost(snapshot.docs[snapshot.docs.length-1])
				
				console.log("LASTPOST: ", lastPost === snapshot.docs[snapshot.docs.length-1])

				snapshot.docs.forEach(
					(doc) => setListOfDocs((prev) => [...prev, {postData: doc.data(), postId: doc.id}])
				)

				setLoading(false)
	
			} catch (error) {
				setApiError("Algo deu errado.")
				console.log(error)
				setLoading(false)
			}
		}

		getDocuments()
		
	}, [collectionName, getMoreDocs, refresh])



	return {
		loading, 
		apiError,
		message,
		listOfDocs,
		setGetMoreDocs,
		setRefresh,
	}
}
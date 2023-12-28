import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"

export const useGetDocuments = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const [message, setMessage] = useState("")

	const [listOfDocs, setListOfDocs] = useState([])
	const [listOfFilteredDocs, setListOfFilteredDocs] = useState([])
	const [lastPost, setLastPost] = useState([])

	const [getMoreDocs, setGetMoreDocs] = useState(0)
	const [search, setSearch] = useState("")
	const [beingSearched, setBeingSearched] = useState(false)

	const PAGINATION_LIMIT = 5;

	useEffect(() => {
		const currentDate = new Date()
		const tempList = listOfDocs.filter((doc) => currentDate < doc.postData.expiresIn.toDate())
		setListOfFilteredDocs(tempList)
	}, [listOfDocs])


	useEffect(() => {
		// No more posts to load
		if (lastPost === undefined && !beingSearched) {
			setMessage("Não há mais posts.")
		} else {
			setMessage("")
		}
	}, [lastPost])

	useEffect(() => {

		const getDocuments = async() => {
			setApiError("")
			try {
				if (!(getMoreDocs > 0)) setLoading(true)
				const col = collection(db, collectionName)
				let q;

				// These queries are for the initial load and loadMore button
				if (getMoreDocs === 0) {
					setListOfDocs([])
					setBeingSearched(false)
					q = await query(col, orderBy("createdAt", "desc"), limit(PAGINATION_LIMIT))
				} else {
					q = await query(col, orderBy("createdAt", "desc"), startAfter(lastPost), limit(PAGINATION_LIMIT))
				}

				// This query is for when user searches
				if (search.length > 0) {
					setBeingSearched(true)
					setListOfDocs([])
					if (search[0] === "#") {
						q = await query(col, where("displayName", "==", search.replace(/#/, "")))
					} else {
						q = await query(col, where("keywords", "array-contains",  search.toLowerCase()))
					} 
					setSearch("")
				}
				
				const snapshot = await getDocs(q)
				setLastPost(snapshot.docs[snapshot.docs.length-1])
				snapshot.docs.map((doc) => {
					setListOfDocs((prev) => [...prev, {postData: doc.data(), postId: doc.id}])
				})

				setLoading(false)
			} catch (error) {
				setApiError("Algo deu errado.")
				setLoading(false)
			}
		}

		getDocuments()

	}, [getMoreDocs])

	return {
		loading, 
		apiError,
		message,
		listOfFilteredDocs,
		setGetMoreDocs,
		beingSearched,
		setSearch
	}
}
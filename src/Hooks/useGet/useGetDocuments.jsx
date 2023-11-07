import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"

export const useGetDocuments = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const [message, setMessage] = useState("")

	const [listOfDocs, setListOfDocs] = useState([])
	const [lastPost, setLastPost] = useState([])

	const [getMoreDocs, setGetMoreDocs] = useState(0)
	const [search, setSearch] = useState("")

	const PAGINATION_LIMIT = 5;

	/* TO DO: 
		CREATE A FUNCTION TO REMOVE EXPIRED DOCUMENTS 
		USEEFFECT KEEPS RUNNING WHEN CODE IS CHANGED
		REMOVE LOAD MORE BUTTON WHEN 'SEARCHING'
		ARRUMAR: REFRESH, GETMOREDOCS, SEARCH TO WORK TOGHETER
	*/

	/* 
		QUERIES:
			refresh and initial
			q = await query(col, orderBy("createdAt", "desc"), limit(PAGINATION_LIMIT))
			q = await query(col, orderBy("createdAt", "desc"), limit(PAGINATION_LIMIT))

			getmoredocs
			q = await query(col, orderBy("createdAt", "desc"),startAfter(lastPost), limit(PAGINATION_LIMIT))

			
			search
			if (search[0] === "#") {
				q = await query(col, where("displayName", "==", search.replace(/#/, "")))
			} else {
				q = await query(col, where("keywords", "array-contains",  search.toLowerCase()))
			} 
	
	*/

	useEffect(() => {
		console.log("DOCS: ", listOfDocs)
	}, [listOfDocs])

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
			console.log("getDocuments")
			setApiError("")
			try {
				setLoading(true)
				const col = collection(db, collectionName)
				let q;
				if (getMoreDocs === 0) {
					setListOfDocs([])
					q = await query(col, orderBy("createdAt", "desc"), limit(PAGINATION_LIMIT))
				} else {
					q = await query(col, orderBy("createdAt", "desc"), startAfter(lastPost), limit(PAGINATION_LIMIT))
				}
				
				const snapshot = await getDocs(q)
				console.log("SNAPSHOT LENGTH", snapshot.docs.length)
				setLastPost(snapshot.docs[snapshot.docs.length-1])
				snapshot.docs.map((doc) => {
					setListOfDocs((prev) => [...prev, {postData: doc.data(), postId: doc.id}])
				})

				setLoading(false)
			} catch (error) {
				setApiError("Algo deu errado.")
				console.log(error)
				setLoading(false)
			}
		}

		getDocuments()

	}, [getMoreDocs])

	return {
		loading, 
		apiError,
		message,
		listOfDocs,
		setGetMoreDocs,
		setSearch
	}
}
import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { Timestamp, collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"

export const useGetDocuments = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")
	const [queryMessage, setQueryMessage] = useState("")

	const [listOfDocs, setListOfDocs] = useState([])
	const [sortedListOfDocs, setSortedListOfDocs] = useState([])
	const [lastPost, setLastPost] = useState([])

	// Reseting messages and list of documents 
	const resetStates = () => {
		setListOfDocs([])
		setQueryMessage("")
		setApiError("")
		return;
	}

	// TO DO: filter posts that have expired
	// OR cloud functions
	useEffect(() => {

		if (listOfDocs.length <= 0) {
			return;
		}

		let sortedList = []
		listOfDocs.map((doc) => {
			sortedList.push(doc)
		})
		sortedList.sort(
			(a, b) => b.postData.createdAt.toDate().getTime() - a.postData.createdAt.toDate().getTime() 
		)

		setSortedListOfDocs(() => sortedList)
	}, [listOfDocs])

	const getDocumentsByQuery = async(searchQuery) => {
		resetStates()

		try {
			setLoading(true)

			const col = collection(db, collectionName)

			let que;
			if (searchQuery[0] === "#") {
				que = await query(col, where("displayName", "==", searchQuery.replace(/#/, "")))
			} else {
				que = await query(col, where("keywords", "array-contains",  searchQuery.toLowerCase()))
			} 

			const snapshot = await getDocs(que)

 			if (snapshot.docs.length <= 0) {
				setListOfDocs([])
				setQueryMessage("Nenhum post foi encontrado.")
			} else {
				setQueryMessage("")
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

	const getDocuments = async(paginationLimit) => {
		resetStates()
		console.log("getDocuments")
		try {
			setLoading(true)
			const col = collection(db, collectionName)
			let q;

			// First query
			if (paginationLimit === 5) {
				q = await query(
					col, 
					orderBy("createdAt", "desc"),
					limit(paginationLimit))
			} else {
				q = await query(
					col, 
					orderBy("createdAt", "desc"),
					startAfter(lastPost),
					limit(paginationLimit))
			}

			const snapshot = await getDocs(q)

			setLastPost(snapshot.docs[snapshot.docs.length-1].data())

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
		getDocumentsByQuery,
		listOfDocs,
		sortedListOfDocs,
		queryMessage,
	}
}
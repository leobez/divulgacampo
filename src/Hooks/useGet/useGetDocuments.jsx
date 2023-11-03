import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { Timestamp, collection, getDocs, orderBy, query, where } from "firebase/firestore"

export const useGetDocuments = (collectionName) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")

	const [listOfDocs, setListOfDocs] = useState([])
	const [sortedListOfDocs, setSortedListOfDocs] = useState([])
	const [queryMessage, setQueryMessage] = useState("")

	// Creating a list for sorted documents by 'createdAt' field
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
		setApiError("")
		setListOfDocs([])
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

	const getNonExpiredDocuments = async() => {
		setListOfDocs([])
		setQueryMessage("")
		setApiError("")
		try {
			setLoading(true)
			const col = collection(db, collectionName)
			const q = await query(col, where('expiresIn', '>', Timestamp.now()))

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

	const getDocuments = async() => {
		setApiError("")
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
		getNonExpiredDocuments,
		getDocumentsByQuery,
		listOfDocs,
		sortedListOfDocs,
		queryMessage,
	}
}
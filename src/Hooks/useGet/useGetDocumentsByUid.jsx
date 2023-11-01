import { useEffect, useState } from "react"
import {db} from "../../firebase/config"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"

export const useGetDocumentsByUid = (collectionName, uid) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")

	const [cancelled, setCancelled] = useState(false)
	const [listOfDocs, setListOfDocs] = useState([])
	const [sortedListOfDocs, setSortedListOfDocs] = useState([])

	// Creating a list for sorted documents by 'createdAt' field
	useEffect(() => {

		if (listOfDocs.length <= 0) return;

		let sortedList = []
		listOfDocs.map((doc) => {
			sortedList.push(doc)
		})
		sortedList.sort(
			(a, b) => b.postData.createdAt.toDate().getTime() - a.postData.createdAt.toDate().getTime() 
		)

		setSortedListOfDocs(() => sortedList)
		
	}, [listOfDocs])

	useEffect(() => {

		const getDocumentsByUid = async(uid) => {
			if (cancelled) return;
			setListOfDocs([])
			try {
				setLoading(true)
				const col = collection(db, collectionName)
				const q = await query(col, where("uid", "==", uid), orderBy("createdAt", "desc"))
	
				await onSnapshot(q, (querySnapshot) => {
					console.log("TRIGGER: getDocumentsByUid")
					if (querySnapshot.docs.length <= 0) setListOfDocs([])
					let temp = []
					querySnapshot.docs.forEach(doc => {
						temp.push({postData: doc.data(), postId: doc.id})
					});
					setListOfDocs([...temp])
				})
				setLoading(false)

			} catch (error) {
				setApiError("Algo deu errado.")
				console.log(error)
				setLoading(false)
			}
		}

		getDocumentsByUid(uid)

		return () => setCancelled(true)

	}, [collectionName, uid, cancelled])

	return {
		loading, 
		apiError,
		listOfDocs,
		sortedListOfDocs
	}
}
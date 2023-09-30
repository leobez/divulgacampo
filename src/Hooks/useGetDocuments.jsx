import { useEffect, useState } from "react"
import {db} from "../firebase/config"
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore"

export const useGetDocuments = (collectionName, uid=null, docId=null) => {

	const [loading, setLoading] = useState(false)
	const [apiError, setApiError] = useState("")

	const [cancelled, setCancelled] = useState(false)
	const [listOfDocs, setListOfDocs] = useState([])

	useEffect(() => {

		const getDocument = async(docId) => {
			if (cancelled) return;

			try {
				setLoading(true)
				const docRef = doc(db, collectionName, docId)
				const docSnap = await getDoc(docRef)
				setLoading(false)
				console.log("teste: ", [docSnap.data()])
				setListOfDocs([docSnap.data()])
			} catch (error) {
				setApiError("Algo deu errado.")
				console.log(error)
				setLoading(false)
			}

		}

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

		const getDocumentsByUid = async(uid) => {
			if (cancelled) return;

			try {
				setLoading(true)
				const col = collection(db, collectionName)
				const q = await query(col, where("uid", "==", uid), orderBy("createdAt", "desc"))
	
				await onSnapshot(q, (querySnapshot) => {
					console.log("TRIGGER: getDocumentsByUid")
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
		
		if (docId) {
			getDocument(docId)
		}else if (uid) {
			getDocumentsByUid(uid)
		} else {
			getDocuments()
		}

		return () => setCancelled(true)

	}, [collectionName, uid, cancelled])

	return {
		loading, 
		apiError,
		listOfDocs,
	}
}
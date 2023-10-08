import { useContext, useState } from "react"

import AuthContext from '../Context/AuthContext'
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useDeleteDocument } from "./useDeleteDocument"
import { useGetDocumentsByUid } from "./useGet/useGetDocumentsByUid"

export const useChangeUserInfo = () => {

	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const [authError, setAuthError] = useState("")
	const [loading, setLoading] = useState(false)

	const {
		apiError: deleteDocumentsApiError, 
		deleteDocument
	} = useDeleteDocument("posts")

	const {
		apiError: getDocumentsByUidApiError, 
		listOfDocs
	} = useGetDocumentsByUid("posts", auth.currentUser.uid)

	const updateName = async(newName) => {
		try {
			setLoading(true)
			await updateProfile(auth.currentUser, {
				displayName: newName
			})
			setLoading(false)
			navigate("/config/user")
		} catch (error) {
			setLoading(false)
			setAuthError("Algo deu errado.")
		}
	}

	const deleteUserAccount = async(password) => {
		try {
			setLoading(true)
			const credential = EmailAuthProvider.credential(auth.currentUser.email, password)
			await reauthenticateWithCredential(auth.currentUser, credential)

			// DELETE EACH DOC OWNED BY THE USER
			await listOfDocs.map((doc) => {
				//console.log("DELETANDO DOCUMENTO DE ID: ", doc.postId)
				deleteDocument(doc.postId)
			})

			await deleteUser(auth.currentUser)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			if (error.message.includes("wrong-password")) {
				setAuthError("Senha incorreta.")
			} else {
				setAuthError("Algo deu errado.")
			}
		}
	}

	return {
		loading,
		authError,
		updateName,
		deleteUserAccount,
	}
}
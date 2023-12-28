import { useContext, useState } from "react"

import AuthContext from '../Context/AuthContext'
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useDeleteDocument } from "./useDeleteDocument"
import { useGetDocumentsByUid } from "./useGet/useGetDocumentsByUid"
import { useUpdateDocument } from "./useUpdateDocument"

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
		listOfDocs
	} = useGetDocumentsByUid("posts", auth.currentUser.uid)
	
	const {
		updateDocument,
	} = useUpdateDocument("posts")

	const updateName = async(newName) => {
		setAuthError("")

		try {

			setLoading(true)
			await updateProfile(auth.currentUser, {
				displayName: newName
			})

			// Update all docs related to this user
			listOfDocs.map(async(doc) => {
				let newData = doc.postData
				newData.displayName = newName
				await updateDocument(doc.postId, newData)
			})
			setLoading(false)
			navigate("/config/user?changed=displayName")
			
		} catch (error) {
			setLoading(false)
			setAuthError("Algo deu errado.")
		}
	}

	const deleteUserAccount = async(password) => {
		setAuthError("")
		try {
			setLoading(true)
			const credential = EmailAuthProvider.credential(auth.currentUser.email, password)
			await reauthenticateWithCredential(auth.currentUser, credential)

			// DELETE EACH DOC OWNED BY THE USER
			await listOfDocs.map((doc) => {
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

	const updateUserPassword = async({currentPassword, newPassword}) => {
		setAuthError("")
		try {
			setLoading(true)

			// Reauthenticate the user
			const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
			await reauthenticateWithCredential(auth.currentUser, credential)

			// Change the users password
			await updatePassword(auth.currentUser, newPassword)
			setLoading(false)
			navigate("/config/user?changed=password")

		} catch (error) {
			setLoading(false)
			if (error.message.includes("wrong-password")) {
				setAuthError("Senha atual incorreta.")
			} else if (error.message.includes("weak-password")) {
				setAuthError("Nova senha muito fraca. Tente outra.")
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
		updateUserPassword,
	}
}
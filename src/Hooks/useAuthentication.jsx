import { useState } from "react"

import { 
		createUserWithEmailAndPassword, 
		signInWithEmailAndPassword, 
		signOut, 
		updateProfile,
		sendEmailVerification
	} from "firebase/auth"

import { useNavigate } from "react-router-dom"

export const useAuthentication = () => {

	const navigate = useNavigate()

	const [authError, setAuthError] = useState("")
	const [loading, setLoading] = useState(false)

	const registerUser = async(auth, userData) => {

		try {
			setLoading(true)
			const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
			navigate(`/validationemailsent/?email=${userCredential.user.email}`)
			await updateProfile(userCredential.user, {displayName: userData.displayName})
			await sendEmailVerification(userCredential.user)
			await signOut(auth)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
			if (error.message.includes("email-already-in-use")) {
				setAuthError("Email já usado. Tente outro.")
			} else if (error.message.includes("weak-password")) {
				setAuthError("Senha muito fraca. Tente outra.")
			} else {
				setAuthError("Algo de errado aconteceu. Tente novamente mais tarde.")
			}
		}
	}

	const loginUser = async(auth, userData) => {

		try {
			setLoading(true)
			const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password)
			setLoading(false)
			if (!userCredential.user.emailVerified) {
				navigate(`/validationemailsent/?email=${userCredential.user.email}`)
				await signOut(auth)
			}
			//navigate("/")
		} catch (error) {
			setLoading(false)
			console.log(error)
			if (error.message.includes("user-not-found")) {
				setAuthError("Usuário não foi encontrado.")
			} else if (error.message.includes("wrong-password")) {
				setAuthError("Email ou senha incorreto.")
 			} else {
				setAuthError("Algo de errado aconteceu. Tente novamente mais tarde.")
			}
		}
	}

	const logoutUser = async(auth) => {
		try {
			setLoading(true)
			await signOut(auth)
			setLoading(false)
			navigate("/")
		} catch (error) {
			setLoading(false)
			//console.log(error)
			//setAuthError(error.message)
		}
	}

	return {
		loading,
		authError,
		registerUser,
		loginUser,
		logoutUser,
		
	}

}
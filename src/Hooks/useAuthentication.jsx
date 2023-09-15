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
			await updateProfile(userCredential.user, {displayName: userData.displayName})
			await sendEmailVerification(userCredential.user)
			await signOut(auth)
			setLoading(false)
			navigate(`/validationemailsent/?email=${userCredential.user.email}`)
		} catch (error) {
			setLoading(false)
			console.log(error)
			if (error.message.includes("email-already-in-use")) {
				setAuthError("Email já usado. Tente outro.")
			} else if (error.message.includes("weak-password")) {
				setAuthError("Senha muito fraca. Tente outra.")
			} else {
				setAuthError("Algo aconteceu. Tente mais tarde.")
			}
			//setAuthError(error.message)
		}
	}

	const loginUser = async(auth, userData) => {

		try {
			setLoading(true)
			const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password)
			setLoading(false)
			console.log("TESTE: ", userCredential.user.emailVerified)
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
				setAuthError("Algo aconteceu. Tente mais tarde.")
			}
			//setAuthError(error.message)
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
			console.log(error)
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
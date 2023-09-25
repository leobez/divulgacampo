import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './CreatePost.module.css'
import { useInsertDocument } from '../../Hooks/useInsertDocuments'
import AuthContext from '../../Context/AuthContext'
 
const CreatePost = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	const maxcharlimit_title = 50
	const [title, setTitle] = useState("")
	const titleRef = useRef()
	const [titlecharcounter, setTitlecharcounter] = useState(0)
	useEffect(() => {
		if (title != null) {
			setTitlecharcounter(title.length)
		}
	}, [title])

	const maxcharlimit_desc = 400
	const [description, setDescription] = useState("")
	const [descriptioncharcounter, setDescriptioncharcounter] = useState(0)
	useEffect(() => {
		if (description != null) {
			setDescriptioncharcounter(description.length)
		}
	}, [description])

	const [amountOfQuizLinks, setAmountOfQuizLinks] = useState(0)
	const quizContainerRef = useRef()
	const addQuiz = () => {
		const quiz_div = document.createElement("div")
		quiz_div.setAttribute("class", "quizcontainer")

		const quiz_label = document.createElement("label")
		quiz_label.setAttribute("for", `quiz_${amountOfQuizLinks}`)
		quiz_label.innerText = `Questionário ${amountOfQuizLinks}`

		const quiz_input = document.createElement("input")
		quiz_input.setAttribute("type", "text") // CHANGE TO URL
		quiz_input.setAttribute("name", `quiz_${amountOfQuizLinks}`)
		quiz_input.setAttribute("placeholder", "Digite o link para seu questionário")

		setAmountOfQuizLinks((prev) => prev+1)
		quiz_div.append(quiz_label, quiz_input)
		quizContainerRef.current.appendChild(quiz_div)
	}
	const removeQuiz = () => {
		quizContainerRef.current.removeChild(quizContainerRef.current.children[amountOfQuizLinks-1])
		setAmountOfQuizLinks((prev) => prev-1)
	}

	const [error, setError] = useState("")
	const {loading, apiError, insertDocument} = useInsertDocument("posts")

	const handleSubmit = async(e) => {	
		e.preventDefault()

		// Create quizLinks obj
		const quizLinks = {}
		const quizInputs = document.querySelectorAll(".quizcontainer")
		quizInputs.forEach((value, key) => {
			if (value.lastChild.value.trim() !== "") {
				quizLinks[key] = value.lastChild.value
			}
		})

		if (
			title.trim() === "" || 
			title.trim() === undefined || 
			title.trim() === null ||
			description.trim() === "" || 
			description.trim() === undefined ||
			description.trim() === null ||
			Object.keys(quizLinks).length <= 0 ||
			Object.keys(quizLinks).length === undefined ||
			Object.keys(quizLinks).length === null 
		) {
			setError("Preencha todos os campos.")
			return;
		}

		if (
			title.length > maxcharlimit_title ||
			description.length > maxcharlimit_desc
		) {
			setError("Limite de caracteres ultrapassado.")
			return;	
		}

		console.log(auth.currentUser.uid)

		const postData = {
			uid: auth.currentUser.uid,
			displayName: auth.currentUser.displayName,
			title: title,
			description: description,
			quizLinks: quizLinks  
		}
		setError("")

		await insertDocument(postData)

		console.log(postData)
	}

	return (
		<div className={styles.createpost}>
			{!isEmailVerified ? (
				<div className='unverifiedemail'>
					<p>Verifique seu email para ter acesso a essas informações.</p>
				</div>
			) : (
				<form onSubmit={handleSubmit} className={styles.createpostform}>

					<div className='formtitle'>
						<h1><span>Divulgue sua pesquisa de campo!</span></h1>
					</div>

					<div className={styles.formtextcontent}>
						<div>
							<input 
								className={styles.inputtitle}
								type='text' 
								name='titulo'
								placeholder='Titulo'
								ref={titleRef}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<div className={styles.wordcounter}>
								{titlecharcounter <= maxcharlimit_title ? (
									<div>
										<span>
											{titlecharcounter}/{maxcharlimit_title}
										</span>
									</div>
								) : (
									<div className={styles.wordcounterlimitreached} >
										<span>
											{titlecharcounter}/{maxcharlimit_title}
										</span>
									</div>
								)}
							</div>
						</div>
						
						<div>
							<textarea 
								className={styles.inputdescription}
								type='text' 
								name='description'
								placeholder='Descrição'
								onChange={(e) => setDescription(e.target.value)}
							/>
							<div className={`${styles.wordcounter} ${styles.bordertop}`}>
								{descriptioncharcounter <= maxcharlimit_desc ? (
									<div>
										<span>
											{descriptioncharcounter}/{maxcharlimit_desc}
										</span>
									</div>
								) : (
									<div className={styles.wordcounterlimitreached} >
										<span>
											{descriptioncharcounter}/{maxcharlimit_desc}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className={styles.formquizcontent} >
						<div className={styles.linksarea} ref={quizContainerRef}>
						</div>

						<div className={styles.buttonarea}>

							{amountOfQuizLinks <= 10 &&
								<button type="button" onClick={addQuiz} className={styles.addquiz}>
									Adicionar Questionário +
								</button>
								}

							{amountOfQuizLinks > 0 &&
								<button type="button" onClick={removeQuiz} className={styles.removequiz}>
									Remover Questionário -
								</button>
							}
						</div>
					</div>
					{!loading ? (<input type="submit" value="Enviar"/>) : (<input type="submit" className="loadingButton" value="Enviando..." disabled/>)}

					<div className="error">
						{error && <p>{error}</p>}
						{apiError && <p>{apiError}</p>}
					</div>

				</form>
			)}

		</div>
	)
}

export default CreatePost
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './CreatePost.module.css'
import { useInsertDocument } from '../../Hooks/useInsertDocuments'
import AuthContext from '../../Context/AuthContext'
import { useValidateURL } from '../../Hooks/useValidateURL'
 
const CreatePost = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	const maxcharlimit_title = 200
	const [title, setTitle] = useState("")
	const titleRef = useRef()
	const [titlecharcounter, setTitlecharcounter] = useState(0)
	useEffect(() => {
		if (title != null) {
			setTitlecharcounter(title.length)
		}
	}, [title])

	const maxcharlimit_desc = 1000
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
		quiz_label.innerText = `Questionário ${amountOfQuizLinks+1}`

		const quiz_input = document.createElement("input")
		quiz_input.setAttribute("type", "url") // CHANGE TO URL
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

	const [postTTL, setPostTTL] = useState(0)
	const [error, setError] = useState("")
	const {loading, apiError, insertDocument} = useInsertDocument("posts")

	const {validateURL} = useValidateURL()

	const handleSubmit = async(e) => {	
		e.preventDefault()
		setError("")

		// Create quizLinks obj
		const quizLinks = {}
		const quizInputs = document.querySelectorAll(".quizcontainer")
		quizInputs.forEach((value, key) => {
			if (value.lastChild.value.trim() !== "") {
				quizLinks[key] = value.lastChild.value
			}
		})

		// Validate if links are from google forms
		if (!validateURL(quizLinks)) {
			setError("URL invalida.")
			return;
		}

		// Removing duplicates
		const filteredQuizLinks = {...[...new Set(Object.values(quizLinks))]}

		// Create keywords array
		const keyWords = []
		const keyWordsInputs = document.querySelectorAll(".keyword")
		keyWordsInputs.forEach((input) => {
			if (
				input.value &&
				input.value !== "" && 
				input.value !== null && 
				input.value !== undefined &&
				input.value.length > 0
				) {
				keyWords.push(input.value)
			}
		})

		if (keyWords.length > 3) {
			setError("Muitas palavras chaves")
			return;
		}

		keyWords.map((keyword) => {
			if (keyword.length > 30) {
				setError("Palavras-chave muito grande.")
				return;
			}
		})

		if (
			title.trim() === "" || 
			title.trim() === undefined || 
			title.trim() === null ||
			description.trim() === "" || 
			description.trim() === undefined ||
			description.trim() === null ||
			postTTL === "" || 
			postTTL === undefined ||
			postTTL === null ||
			postTTL < 30 ||
			postTTL > 90
		) {
			setError("Preencha todos os campos.")
			return;
		}

		if (
			Object.keys(quizLinks).length <= 0 ||
			Object.keys(quizLinks).length === undefined ||
			Object.keys(quizLinks).length === null 
		) {
			setError("Você precisa divulgar ao menos um questionário.")
			return;
		}


		if (
			title.length > maxcharlimit_title ||
			description.length > maxcharlimit_desc
		) {
			setError("Limite de caracteres ultrapassado.")
			return;	
		}
		
		const keyWordLowered = keyWords.map((keyword) => keyword.toLocaleLowerCase())

		const postData = {
			uid: auth.currentUser.uid,
			displayName: auth.currentUser.displayName,
			title: title,
			description: description,
			quizLinks: filteredQuizLinks,
			postTTL: postTTL,
			keywords: keyWordLowered
		}
		
		await insertDocument(postData)
	}

	return (
		<div className={styles.createpost}>
			{!isEmailVerified ? (
				<div>
					<p>Verifique seu email para ter acesso a essas informações.</p>
				</div>
			) : (

				<form onSubmit={handleSubmit} className={styles.createpostform}>

					<div className={styles.titleofform}>
						<h1><span>Divulgue sua pesquisa de campo!</span></h1>
					</div>

					<div className={styles.titlearea}>
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
								<span>
									{titlecharcounter}/{maxcharlimit_title}
								</span>
							) : (
								<span className={styles.wordcounterlimitreached}>
									{titlecharcounter}/{maxcharlimit_title}
								</span>
							)}
						</div>
					</div>
					
					<div className={styles.descriptionarea}>
						<textarea 
							className={styles.inputdescription}
							type='text' 
							name='description'
							placeholder='Descrição'
							onChange={(e) => setDescription(e.target.value)}
						/>
						<div className={styles.wordcounter}>
							{descriptioncharcounter <= maxcharlimit_desc ? (
								<span>
									{descriptioncharcounter}/{maxcharlimit_desc}
								</span>
							) : (
								<span className={styles.wordcounterlimitreached} >
									{descriptioncharcounter}/{maxcharlimit_desc}
								</span>
							)}
						</div>
					</div>

					<div className={styles.keywordsarea}>
						<div>
							<p>
								Defina algumas palvras chaves para sua postagem <span>(opcional)</span>:
							</p>
						</div>
						<hr />
						<div className={styles.keywords}>
							<div>
								<label htmlFor="keyword1">Palavra chave 1: </label>
								<input 
								placeholder='Ex.: tecnologia, matematica, educacao ...'
								type="text" 
								name="keyword1" 
								className="keyword"
								/>
							</div>
							<div>
								<label htmlFor="keyword2">Palavra chave 2: </label>
								<input 
								type="text" 
								name="keyword2" 
								className="keyword"
								/>
							</div>
							<div>
								<label htmlFor="keyword3">Palavra chave 3: </label>
								<input 
								type="text" 
								name="keyword3" 
								className="keyword"
								/>
							</div>
						</div>
					</div>

					<div className={styles.expiresarea}>
						<div>
							<p>Sua postagem ficará ativa por: </p>
						</div>

						<hr />

						<div>
							<div>
								<input type="radio" id="30_days" name="post_ttl" value="30" 
								onChange={() => setPostTTL(30)}/>
								<label htmlFor="30_days">30 dias</label>
							</div>

							<div>
								<input type="radio" id="60_days" name="post_ttl" value="60"
								onChange={() => setPostTTL(60)}/>
								<label htmlFor="60_days">60 dias</label>
							</div>

							<div>
								<input type="radio" id="90_days" name="post_ttl" value="90"
								onChange={() => setPostTTL(90)}/>
								<label htmlFor="90_days">90 dias</label>	
							</div>
						</div>

					</div>	

					<div className={styles.reference}>
						<p>
							Crie seus formulários utilizando os serviços recomendados:
						</p>
						<hr />
						<div>
							<a href="https://www.google.com/intl/pt-BR/forms/about/" target='_blank'>
								Google Forms
							</a>
						</div>
					</div>

					<div className={styles.quizarea}>

						<div className={styles.linksarea} ref={quizContainerRef}>
						</div>
						<hr />
						<div className={styles.buttonarea}>

							{amountOfQuizLinks < 5 &&
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

					<div className={styles.buttonarea}>
						{!loading ? (<input type="submit" value="Enviar"/>) : (<input type="submit" className="loadingButton" value="Enviando..." disabled/>)}
					</div>
					
					<div className='error'>
						{error && <p><span>{error}</span></p>}
						{apiError && <p><span>{apiError}</span></p>}
					</div>

				</form>
			)}

		</div>
	)
}

export default CreatePost
import React, { useEffect, useRef, useState } from 'react'
import styles from './CreatePost.module.css'

const CreatePost = ({isEmailVerified}) => {

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

	const [quizLinks, setQuizLinks] = useState([])
	const [amountOfQuizLinks, setAmountOfQuizLinks] = useState(0)

	const quizContainerRef = useRef()
	const addQuiz = () => {
		const quiz_div = document.createElement("div")
		quiz_div.setAttribute("class", "quizcontainer")

		const quiz_label = document.createElement("label")
		quiz_label.setAttribute("for", `quiz_${amountOfQuizLinks}`)
		quiz_label.innerText = `Questionário ${amountOfQuizLinks}`

		const quiz_input = document.createElement("input")
		quiz_input.setAttribute("type", "text") // CHANGE TO TYPE TO URL
		quiz_input.setAttribute("name", `quiz_${amountOfQuizLinks}`)
		quiz_input.setAttribute("placeholder", "Digite o link para seu questionário")
		quiz_input.addEventListener("input", (e) => {
			var k = Number(e.target.name.replace("quiz_", ""))
			console.log(k, ": ", e.target.value)
			// PAREI AQUI
			return setQuizLinks((prev) => [{k : e.target.value}])
		})
				
		setAmountOfQuizLinks((prev) => prev+1)
		quiz_div.append(quiz_label, quiz_input)
		quizContainerRef.current.appendChild(quiz_div)
	}
	const removeQuiz = () => {
		quizContainerRef.current.removeChild(quizContainerRef.current.children[amountOfQuizLinks-1])
		setAmountOfQuizLinks((prev) => prev-1)
	}

	const handleSubmit = (e) => {	
		e.preventDefault()

		const form = {
			title: title,
			description: description,
			link: quizLinks
		}

		console.log(form)
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
							<div className={styles.wordcounter}>
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
							<button type="button" onClick={addQuiz}>
								Adicionar Questionário +
							</button>
							{amountOfQuizLinks > 0 &&
								<button type="button" onClick={removeQuiz}>
									Remover Questionário -
								</button>
							}
						</div>
					</div>

					<input type="submit" value="Enviar"/>

				</form>
			)}

		</div>
	)
}

export default CreatePost
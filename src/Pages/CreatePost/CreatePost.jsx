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

	const addQuiz = () => {

	}

	const handleSubmit = (e) => {	
		e.preventDefault()
		console.log(title, description)
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

					<div className={styles.formquizcontent}>
						<button onClick={addQuiz}></button>
					</div>

					<input type="submit" value="Enviar"/>

				</form>
			)}

		</div>
	)
}

export default CreatePost
import styles from './EditPostForm.module.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../../../Context/AuthContext'
import { useUpdateDocument } from '../../../Hooks/useUpdateDocument'

const EditPostForm = ({post, postId}) => {

	const auth = useContext(AuthContext)
	const {loading, apiError, updateDocument} = useUpdateDocument("posts")
	const [error, setError] = useState("")

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

	useEffect(() => {
		setTitle(post.title)
		setDescription(post.description)
	}, [post])

	const handleSubmit = async(e) => {
		e.preventDefault()

		if (
			title.trim() === "" || 
			title.trim() === undefined || 
			title.trim() === null ||
			description.trim() === "" || 
			description.trim() === undefined ||
			description.trim() === null
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

		const newData = {
			title,
			description
		}
		setError("")

		await updateDocument(postId, newData)
	}

	return (
		<div className={styles.editpostform}>
			<form onSubmit={handleSubmit}>
				<div className='formtitle'>
					<h1><span>Editando postagem: {postId}</span></h1>
				</div>

				<div className={styles.formtextcontent}>
					<div>
						<input 
							className={styles.inputtitle}
							type='text' 
							name='titulo'
							placeholder='Titulo'
							ref={titleRef}
							value={title}
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
							value={description}
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

				<div className={styles.formquizcontent}>
					<div className={styles.quizunreachable}></div>
					<div className={styles.linksarea}>
						{Object.values(post.quizLinks).map((link, index) => (
							<div className={styles.quizcontainer} key={index}>
								<label htmlFor={`quiz_${index}`}>Questionário {index}</label>
								<input type="text" name={`quiz_${index}`} value={link}disabled/>
							</div>
						))}
					</div>
				</div>

				{!loading ? (<input type="submit" value="Editar"/>) : (<input type="submit" className="loadingButton" value="Editando..." disabled/>)}

				<div className="error">
					{error && <p>{error}</p>}
					{apiError && <p>{apiError}</p>}
				</div>

			</form>
		</div>
	)
}

export default EditPostForm
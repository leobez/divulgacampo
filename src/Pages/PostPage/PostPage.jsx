import React, { useEffect } from 'react'
import styles from './PostPage.module.css'
import { useParams } from 'react-router-dom'
import { useGetDocument } from '../../Hooks/useGet/useGetDocument'

const PostPage = () => {

	const {postId} = useParams()

	const {loading, apiError, listOfDocs} = useGetDocument("posts", postId)

	return (
		<div className={styles.postpage}>
			{listOfDocs[0] && 
				<>

					<div>Criado por: 
						<span>{listOfDocs[0].displayName}</span>
					</div>

					<div>
						{listOfDocs[0].title}
					</div>
					
					<div>
						{listOfDocs[0].description}
					</div>

					<div>
						Responda meus questionários:
						{Object.values(listOfDocs[0].quizLinks).map((link, index) => (
							<div className={styles.quizcontainer} key={index}>
								<p>Questionário {index+1}:</p>
								<a href={`${link}`}>{link}</a>
							</div>
						))}
					</div>
				</>			
			}
			{loading && <p>Carregando...</p>}
			{apiError && <div className='error'><span>Algo deu errado</span></div >}
		</div>
	)
}

export default PostPage
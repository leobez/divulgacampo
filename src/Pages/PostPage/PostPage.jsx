import React, { useEffect, useRef } from 'react'
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
						<p><span>{listOfDocs[0].title}</span></p>
						<hr />
					</div>
					
					<div>
						<p><span>Descrição</span></p>
						<p>{listOfDocs[0].description}</p>
					</div>

					<div>
						<hr />
						<p><span> Meus questionários </span></p>
						{Object.values(listOfDocs[0].quizLinks).map((link, index) => (
							<div className={styles.quizcontainer} key={index}>
								<p>Questionário {index+1}:</p>
								<a href={`${link}`}>{link}</a>
								<iframe src={`${link}`} height={600}></iframe>
								<hr />
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
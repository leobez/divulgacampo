import React, { useEffect, useRef } from 'react'
import styles from './PostPage.module.css'
import { useParams } from 'react-router-dom'
import { useGetDocument } from '../../Hooks/useGet/useGetDocument'

const PostPage = () => {

	const {postId} = useParams()

	const {loading, apiError, listOfDocs} = useGetDocument("posts", postId)

	useEffect(() => {
		if (listOfDocs[0]) console.log(listOfDocs[0].quizLinks)
	}, [listOfDocs])

	const myformref = useRef()
/* 	useEffect(() => {
		if (!myformref.current) return
		myformref.current.target = 'my-response-iframe';
		// detect when the iframe reloads
		var iframe = document.getElementById('my-response-iframe');
		if (iframe) {
			iframe.onload = function () {
			// now you can do stuff, such as displaying a message or redirecting to a new page.
			}
		}
	}, [myformref]) */

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
								{/* <iframe src={`${link}`}></iframe> */}
								<hr />
							</div>
						))}
						<form ref={myformref} id="my-form" target="my-response-iframe" action="https://docs.google.com/forms/d/e/1FAIpQLSdG8ipS3laaTJH3uWTrxcMd15rrwUPUAfvwWdjh4Vli7yAcXA/viewform?embedded=true" method="post">
						</form>
						<iframe id="my-response-iframe" name="my-response-iframe"></iframe>
					</div>
				</>			
			}

			{loading && <p>Carregando...</p>}
			{apiError && <div className='error'><span>Algo deu errado</span></div >}

		</div>
	)
}

export default PostPage
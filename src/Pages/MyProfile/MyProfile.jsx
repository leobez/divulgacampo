import React, { useContext, useEffect, useState } from 'react'
import styles from "./MyProfile.module.css"
import AuthContext from '../../Context/AuthContext'
import { useGetDocuments } from '../../Hooks/useGetDocuments'
import { useDeleteDocument } from '../../Hooks/useDeleteDocument'
import { Link } from 'react-router-dom'

const MyProfile = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	const {loading, apiError, getDocumentsByUid, listOfDocs} = useGetDocuments("posts")
	const {loading: deleteLoading, apiError: deleteApiError, deleteDocument} = useDeleteDocument("posts")

	useEffect(() => {

		const asyncGetDocumentsByUid = async(uid) => {
			await getDocumentsByUid(uid)
		}
		asyncGetDocumentsByUid(auth.currentUser.uid)

	}, [])

	const handleDeleteClick = (e) => {
		deleteDocument(e.target.id)
	}

	return (
		<div className={styles.myprofile}>
			{!isEmailVerified ? (
				<div className='unverifiedemail'>
					<p>Verifique seu email para ter acesso a essas informações.</p>
				</div>
			) : (
				<>
					<h1>Suas informações: </h1>
					<hr />
					<p className={styles.info}>Seu uid é: <span>{auth.currentUser.uid}</span></p>
					<p className={styles.info}>Seu email é: <span>{auth.currentUser.email}</span></p>
					<p className={styles.info}>Seu displayName é: <span>{auth.currentUser.displayName}</span></p>
					<hr />
					<div className={styles.historycontainer}>
						<h1>Histórico de postagens: </h1>
						<div className={styles.history}>

						{listOfDocs && listOfDocs.map((post) => (
								<div 
								key={post.postId} 
								className={styles.historypost}>
									<div className={styles.historyposttitle}>
										{post.postData.title}
									</div>
									<div className={styles.historypostdesc}>
										{post.postData.description}
									</div>
									<div className={styles.historypostlinks}>
										<Link to={`/post/${post.postId}`}>Acessar</Link>
										<Link to="/">Editar</Link>
										<button id={post.postId} onClick={handleDeleteClick}>Excluir</button>
									</div>
								</div>
							))}

							<div className={styles.extrainfo}>
								<div className='loading'>
									{loading && <p>Carregando posts...</p>}
								</div>
								<div className="error">
									{apiError && <p>{apiError}</p>}
								</div>
								<div className="warn">
									{listOfDocs.length <= 0 && <p>Não há posts.</p>}
								</div>	
							</div>

						</div>

					</div>

				</>
			)}

		</div>
	)
}

export default MyProfile
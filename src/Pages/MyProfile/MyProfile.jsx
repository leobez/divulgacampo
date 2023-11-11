import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./MyProfile.module.css"
import AuthContext from '../../Context/AuthContext'
import { useGetDocumentsByUid } from '../../Hooks/useGet/useGetDocumentsByUid'
import { useDeleteDocument } from '../../Hooks/useDeleteDocument'
import { Link } from 'react-router-dom'

const MyProfile = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	const {loading, apiError, sortedListOfDocs: userSortedDocs} = useGetDocumentsByUid("posts", auth.currentUser.uid)
	const {loading: deleteLoading, apiError: deleteApiError, deleteDocument} = useDeleteDocument("posts")

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
					<p className={styles.info}>Seu email é: <span>{auth.currentUser.email}</span></p>
					<p className={styles.info}>Seu nome é: <span>{auth.currentUser.displayName}</span></p>
					<hr />
					<div className={styles.historycontainer}>
						<h1>Histórico de postagens: </h1>

						<div className={styles.history}>

						{userSortedDocs && userSortedDocs.map((post) => (
								<div 
								key={post.postId} 
								className={styles.historypost}>
									<div className={styles.historyposttitle}>
										<p>Titulo: </p>
										<hr />
										<p>{post.postData.title}</p>
									</div>
									<div className={styles.historypostdesc}>
										<p>Descrição:</p>
										<hr />
										<p>{post.postData.description}</p>
									</div>
									<div className={styles.historypostlinks}>
										<Link to={`/post/${post.postId}`}>Acessar</Link>
										<Link to={`/editpost/${post.postId}`}>Editar</Link>
										<button id={post.postId} onClick={handleDeleteClick}>Excluir</button>
									</div>
								</div>
							))}

							<div className={styles.extrainfo}>
								<div>
									{loading && <p>Carregando posts...</p>}
								</div>
								<div className="error">
									{apiError && <p>{apiError}</p>}
								</div>
								<div>
									{userSortedDocs.length <= 0 && <p>Não há posts.</p>}
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
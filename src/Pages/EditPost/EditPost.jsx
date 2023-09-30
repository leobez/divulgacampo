import React, { useEffect, useState } from 'react'
import styles from './EditPost.module.css'
import { useParams } from 'react-router-dom';
import { useGetDocuments } from '../../Hooks/useGetDocuments';
import EditPostForm from './EditPostForm/EditPostForm';

const EditPost = () => {

	const {postId} = useParams()

	const {loading, apiError, listOfDocs: doc} = useGetDocuments("posts", null, postId)

	return (
		<div className={styles.editpost}>

			{doc && doc[0] && 
				<EditPostForm post={doc[0]} postId={postId}></EditPostForm>
			}
			<div className='loading'>
				{loading && <p>Carregando...</p>}
			</div>
			<div className="error">
				{apiError && <p>{apiError}</p>}
			</div>
			
		</div>
	)
}

export default EditPost
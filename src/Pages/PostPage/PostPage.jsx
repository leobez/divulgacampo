import React, { useEffect } from 'react'
import styles from './PostPage.module.css'
import { useParams } from 'react-router-dom'

const PostPage = () => {

	const {postId} = useParams()

	return (
		<div>
			Voce esta acessando o post: <span>{postId}</span>
		</div>
	)
}

export default PostPage
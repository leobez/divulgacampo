import React, { useEffect, useState } from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom'

const Post = ({postData, postId}) => {

	const [postedAt, setPostedAt] = useState("")
	const [expiresIn, setExpiresIn] = useState("")

	useEffect(() => {
		const postedAt = postData.createdAt.toDate().toLocaleDateString()
		setPostedAt(postedAt)

		const expiresIn = postData.expiresIn.toDate().toLocaleDateString()
		setExpiresIn(expiresIn)
	}, [])

	return (
		<div className={styles.post}>

			<div className={styles.topinfo}>
				<div className={styles.displayName}>
					Criado por: <span>{postData.displayName}</span>
				</div>

				<div>
					<div>
						Postado em: <span>{postedAt}</span>
					</div>
					<div>
						Valido até: <span>{expiresIn}</span>
					</div>
				</div>

			</div>

			<hr />

			<div className={styles.title}>
				<p><span>{postData.title}</span></p>
			</div>

			<hr />

			<div className={styles.description}>
				<p>{postData.description}</p>
				<div className={styles.fadeeffect}></div>
			</div>

			<div className={`${styles.linktoenter}`}>
				<Link to={`/post/${postId}`}>Acessar</Link>
			</div>

		</div>
	)
}

export default Post
import React from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom'

const Post = ({postData, postId}) => {

	return (
		<div className={styles.post}>

			<div className={styles.topinfo}>
				<div className={styles.displayName}>
					Criado por: <span>{postData.displayName}</span>
				</div>
				<div className={styles.displayName}>
					Ficará ativo por: <span>X dias</span>
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
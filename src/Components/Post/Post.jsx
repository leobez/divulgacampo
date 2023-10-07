import React from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom'

const Post = ({postData, postId}) => {

	return (
		<div className={styles.post}>

			<div className={styles.displayName}>
				Criado por: <span>{postData.displayName}</span>
			</div>

			<div className={styles.title}>
				{postData.title}
			</div>

{/* 			<div className={styles.description}>
				{postData.description}
			</div>

			<div className={styles.quizlinks}>
				<p>Meus questionários: </p>
				{Object.entries(postData.quizLinks).map(([key, value]) => (
					<div key={key} className={styles.quizlink}>
						<a href={`${value}`}>{value}</a>
					</div>
				))}
			</div> */}

			<div className={`${styles.linktoenter}`}>
				<Link to={`/post/${postId}`}>Acessar</Link>
			</div>

		</div>
	)
}

export default Post
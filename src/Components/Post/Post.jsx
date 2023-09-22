import React from 'react'
import styles from './Post.module.css'

const Post = ({postData}) => {

	return (
		<div className={styles.post}>
			<div className={styles.title}>
				{postData.title}
			</div>

			<div className={styles.description}>
				{postData.description}
			</div>

			<div className={styles.quizlinks}>
				<p>Meus questionários: </p>
				{Object.entries(postData.quizLinks).map(([key, value]) => (
					<div key={key} className={styles.quizlink}>
						<a href={value}>{value}</a>
					</div>
				))}
			</div>
		</div>
	)
}

export default Post
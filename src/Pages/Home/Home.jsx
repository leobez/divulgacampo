import React from 'react'
import styles from "./Home.module.css"

const Home = ({uid, email, displayName}) => {
	return (
		<div className={styles.home}>
			<p> Olá, você esta na tela de home! </p> 
			{uid && 
				<>
				</>
			}
			{/* <div className={styles.teste}></div> */}
		</div>
	)
}

export default Home
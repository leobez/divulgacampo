import React from 'react'
import styles from "./Home.module.css"

const Home = ({uid, email, displayName}) => {
	return (
		<div className={styles.home}>
			{uid &&
				<>
					<p> Olá, você esta na tela de home! </p> 
					<p>Seu uid é: {uid}</p>
					<p>seu email é: {email}</p>
					<p>seu displayName é: {displayName} </p>
				</>
			}
			{/* <div className={styles.teste}></div> */}
		</div>
	)
}

export default Home
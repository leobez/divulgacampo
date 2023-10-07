import React, { useEffect, useRef } from 'react'
import styles from './RefreshButton.module.css'

const RefreshButton = () => {

	const handleClick = () => {
		console.log("REFRESH")
		const MAIN = document.querySelector(".main")
		const DIV_TO_REFRESH = MAIN.firstChild

		console.log(DIV_TO_REFRESH)
	}

	return (
		<div className={styles.refreshButton} >
			<button onClick={handleClick}>
				Recarregar
			</button>
		</div>
	)
}

export default RefreshButton
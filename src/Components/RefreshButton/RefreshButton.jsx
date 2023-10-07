import React, { useContext, useEffect, useRef } from 'react'
import styles from './RefreshButton.module.css'
import RefreshContext from '../../Context/RefreshContext'

const RefreshButton = () => {

	const {refresh, setRefresh} = useContext(RefreshContext)

	const handleClick = () => {
		const MAIN = document.querySelector(".main")
		const DIV_TO_REFRESH = MAIN.firstChild

		setRefresh(true)
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
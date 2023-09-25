import React, { useEffect, useState } from 'react'
import styles from './PopUp.module.css'

const PopUp = ({children, time}) => {

	const [showIt, setShowIt] = useState(true)

	useEffect(() => {

		const showPopUp = () => {
			setShowIt(false)
		}

		const timeout = setTimeout(showPopUp, time)

		return () => clearTimeout(timeout)
		
	}, [])

	if (showIt) {
		return 	<div className={styles.popup}>
					{children}
				</div>
	}
}

export default PopUp
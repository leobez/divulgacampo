import React, { useEffect, useRef } from 'react'
import styles from './RefreshButton.module.css'

const RefreshButton = () => {


	return (
		<div className={styles.refreshButton} >
			<button>
				Refresh
			</button>
		</div>
	)
}

export default RefreshButton
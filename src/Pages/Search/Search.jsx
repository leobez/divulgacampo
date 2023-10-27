import React, { useEffect, useState } from 'react'
import { useQuery } from '../../Hooks/useQuery'
import { useGetDocuments } from '../../Hooks/useGet/useGetDocuments'
import styles from "./Search.module.css"

const Search = () => {
	
	const query = useQuery()
	const search = query.get("q")
	const [error, setError] = useState(null)

	const {loading, apiError, listOfDocs, getDocumentsByQuery} = useGetDocuments("post")

	useEffect(() => {
		if (search) {
			getDocumentsByQuery(search)
		}
	}, [])

	useEffect(() => {
		console.log(listOfDocs.postData)
	}, [listOfDocs])

	return (
		<div className={styles.search}>
				
			{listOfDocs ? (
				<div></div>
			) : (
				<div>
					<p>
					<span>Não há posts.</span>
					</p>
				</div>
			)
			}

			<div>
				{loading && <p><span>Carregando...</span></p>}
			</div>
			<div className="error">
				{error && <p><span>{error}</span></p>}
				{apiError && <p><span>{apiError}</span></p>}
			</div>

		</div>
	)
}

export default Search
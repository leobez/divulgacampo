import React, { useContext, useEffect, useState } from 'react'
import styles from "./Home.module.css"
import AuthContext from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
import { useGetDocuments } from '../../Hooks/useGet/useGetDocuments'
import Post from '../../Components/Post/Post'

const Home = () => {

	const auth = useContext(AuthContext)

	const {
		loading, 
		apiError, 
		getNonExpiredDocuments, 
		getDocumentsByQuery, 
		sortedListOfDocs, 
		queryMessage} = useGetDocuments("posts")
		
	const [refresh, setRefresh] = useState(false)

	const [searchQuery, setSearchQuery] = useState("")

	const handleSearch = (e) => {
		e.preventDefault()
		if (searchQuery.trim() === "") {
			setRefresh(prev => !prev)
			return;
		} 
		getDocumentsByQuery(searchQuery.trim())
	}

	useEffect(() => {
		getNonExpiredDocuments()
	}, [refresh])

	const handleRefreshClick = () => {
		setRefresh(prev => !prev)
	}
	
	return (
		<div className={styles.home}>

			<div className={styles.homemenu}>

				<div className={styles.titlecontainer}>
					<p>
						<span>Seja bem vindo ao DivulgaCampo !</span>
					</p>
				</div>

				<hr />

				<div className={styles.searchbarcontainer}>

					<form onSubmit={handleSearch}>
						<input 
						type="text" 
						name="searchQuery" 
						id="searchQuery" 
						placeholder='#nome, termo'
						onChange={(e) => setSearchQuery(e.target.value)}/>
		
						<input type="submit" value="Pesquisa"/>
					</form>

				</div>

				<hr />

				<div className={styles.refreshcontainer}>
					<button onClick={handleRefreshClick} className={styles.refreshbutton}>
						<p>Recarregar</p>				
						<img src="..\src\assets\icons8-refresh-30.png" alt="refresh-icon" />
					</button>
				</div>

			</div>

			<div className={styles.homerightcontainer}>

			<div className={styles.welcome}>
				{!auth.currentUser ? 
					(<div className={styles.welcomelinkstoauth}>
						{!auth.currentUser && <Link to="/register" >Cadastre-se</Link>}
						<p> OU </p>
						{!auth.currentUser && <Link to="/login" >Entre</Link>}
					</div>) :
					(
						<div className={styles.welcomelinkstopost}>
							<Link to="/createpost" >Divulgue sua pesquisa de campo +</Link>
						</div>
					)
				}
			</div>

			<div className={styles.homecontentcontainer}>

				<div className={styles.homecontent}>

						<div>
							{loading && <p>Carregando posts...</p>}
						</div>
				
						{sortedListOfDocs && !queryMessage && sortedListOfDocs.map((post) => (
							<Post key={post.postId} postData={post.postData} postId={post.postId}></Post>
						))}

						<div>
							{apiError && <p>{apiError}</p>}
						</div>

						<div>
							{queryMessage && <p>{queryMessage}</p>}
						</div>

						<div>
							{!loading && sortedListOfDocs.length <= 0 && <p>Não há posts.</p>}
						</div>
						
					</div>

				</div>
			</div>
		</div>
	)
}

export default Home
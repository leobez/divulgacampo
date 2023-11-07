import React, { useContext, useState } from 'react'
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
		message, 
		listOfDocs, 
		setGetMoreDocs,
		setSearch
	} = useGetDocuments("posts")

	const [searchQuery, setSearchQuery] = useState("")
	const handleSearch = (e) => {
		e.preventDefault()
		console.log(searchQuery)
		setSearch(true)
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
					<button onClick={() => setGetMoreDocs(0)} className={styles.refreshbutton}>
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
				
						{listOfDocs && listOfDocs.map((post) => (
							<Post key={post.postId} postData={post.postData} postId={post.postId}></Post>
						))}

						<div>
							{message.length === 0 ? (
								<button 
									className={styles.loadmore} 
									onClick={() => setGetMoreDocs((prev) => prev+1)}
								>
								Carregar Mais
							</button>

							) : (
								<div>
									{message && <p>{message}</p>}
								</div>
							)}

						</div>

						<div>
							{apiError && <p>{apiError}</p>}
						</div>

						<div>
							{!loading && listOfDocs.length <= 0 && <p>Não há posts.</p>}
						</div>
						
					</div>

				</div>
			</div>
		</div>
	)
}

export default Home
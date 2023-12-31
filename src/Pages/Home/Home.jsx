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
		listOfFilteredDocs,
		setGetMoreDocs,
		beingSearched,
		setSearch
	} = useGetDocuments("posts")

	const [searchQuery, setSearchQuery] = useState("")
	const handleSearch = (e) => {
		e.preventDefault()
		if (searchQuery === "") {
			setGetMoreDocs(0)
		} else {
			setGetMoreDocs((prev) => prev+1)
			setSearch(searchQuery)
		}
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
							{loading ? (
								<p>Carregando posts...</p>
							) : (
								<div className={styles.homecontentposts}>
									{listOfFilteredDocs && listOfFilteredDocs.map((post) => (
									<Post key={post.postId} postData={post.postData} postId={post.postId}></Post>
									))}
								</div>
							)}
						</div>

						<div>
							{message.length === 0 && !beingSearched ? (
								<button 
								className={styles.loadmore} 
								onClick={() => setGetMoreDocs((prev) => prev+1)}>
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

					</div>

				</div>
			</div>
		</div>
	)
}

export default Home
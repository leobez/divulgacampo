import React, { useContext, useEffect, useState } from 'react'
import styles from "./Home.module.css"
import AuthContext from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
import { useGetDocuments } from '../../Hooks/useGetDocuments'
import Post from '../../Components/Post/Post'

const Home = ({isEmailVerified}) => {

	const auth = useContext(AuthContext)

	const {loading, apiError, getDocuments} = useGetDocuments("posts")
	const [posts, setPosts] = useState([])
	const [warn, setWarn] = useState("")

/* 	useEffect(() => {
		const verifyParams = new URLSearchParams(window.location.search)
		const params = verifyParams.get("refresh")
		if (params) {
			if (params === "true") {
				window.location.assign("/")
			}
		}
	}, []) */

	useEffect(() => {

		const asyncGetDocuments = async() => {
			const list = await getDocuments()
			if (list) {
				if (list.length <= 0) {
					setWarn("Não há posts.")
				}
				setPosts([...list])
			}
		}
		asyncGetDocuments()

	}, [])

	return (
		<div className={styles.home}>
			<div className={styles.welcome}>
				<p> Olá, você esta na tela de home! </p> 

				{!auth.currentUser ? 
					(<div className={styles.welcomelinkstoauth}>
						{!auth.currentUser && <Link to="/register" className="nonNavLink">Cadastre-se</Link>}
						<p> OU </p>
						{!auth.currentUser && <Link to="/login" className="nonNavLink">Entre</Link>}
					</div>) :
					(
						<div className={styles.welcomelinkstopost}>
							<Link to="/createpost" className='nonNavLink'>Divulgue sua pesquisa de campo +</Link>
						</div>
					)
				}
			</div>
			<hr />
			
			<div className={styles.homecontent}>
				 
				{!posts && <p>Não há posts...</p>}

				{posts && posts.map((post) => (
					<Post key={post.postId} postData={post.postData}></Post>
				))}

				<div className='loading'>
					{loading && <p>Carregando posts...</p>}
				</div>

				<div className="error">
					{apiError && <p>{apiError}</p>}
				</div>

				<div className="warn">
					{warn && <p>{warn}</p>}
				</div>

			</div>
		</div>
	)
}

export default Home
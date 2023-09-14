import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

// Components
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import NotFound from './Pages/NotFound/NotFound'

// Context
import AuthContext from './Context/AuthContext'
/* import VerifiedEmailContext from './Context/VerifiedEmailContext' 
 */
// Pages
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import MyProfile from './Pages/MyProfile/MyProfile'


function App() {

	const auth = useContext(AuthContext)

	const [isLogged, setIsLogged] = useState(false)
	const [isEmailVerified, setIsEmailVerified] = useState(false)

	const [loadingUser, setLoadingUser] = useState(true)

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log(auth.currentUser.emailVerified)
			setIsLogged(true)

			if (user.emailVerified) {
				setIsEmailVerified(true)
			} else {
				setIsEmailVerified(false)
			}

		} else {
			setIsLogged(false)
		}
		setLoadingUser(false)
	})

	if (loadingUser) {
		return <div className="lds-ring loading"><div></div><div></div><div></div><div></div></div>
	}

/* 	console.log("isLogged: ", isLogged)
	console.log("auth.currentUser: ", auth.currentUser) */

    return (
		<div className='App'>
			<AuthContext.Provider value={auth}>
				<BrowserRouter>
					<Header/>
					<Navbar/>
					<div className='main'>

						{!isEmailVerified && auth.currentUser && 
							<div className='verifyemailwarn'>
								<p>Verifique seu email: <span>{auth.currentUser.email}</span></p>
							</div>
						}

						<Routes>
							<Route path='/' element={<Home isEmailVerified={isEmailVerified}/>}></Route>
							<Route path='*' element={<NotFound/>}></Route>

							{/* ROTAS PARA AUTENTICADO */}
							<Route path='/myprofile' element={isLogged ? <MyProfile isEmailVerified={isEmailVerified}/>:<Navigate to="/register"/>}></Route>

							{/* ROTAS PARA NÃO AUTENTICADO */}
							<Route path='/login' element={!isLogged ? <Login/>:<Navigate to="/"/>}></Route>
							<Route path='/register' element={!isLogged ? <Register/>:<Navigate to="/"/>}></Route>

						</Routes>

					</div>
				</BrowserRouter>
				<Footer/>
			</AuthContext.Provider>
		</div>
    )
}

export default App

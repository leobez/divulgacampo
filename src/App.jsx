import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

// Components
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import NotFound from './Pages/NotFound/NotFound'

// Context
import AuthContext from './Context/AuthContext'

// Pages
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import MyProfile from './Pages/MyProfile/MyProfile'
import About from './Pages/About/About'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail'
import ChangeEmailVerified from './Components/ChangeEmailVerified/ChangeEmailVerified'


function App() {

	const auth = useContext(AuthContext)
	const [isLogged, setIsLogged] = useState(false)
	const [isEmailVerified, setIsEmailVerified] = useState(false)
	const [loadingUser, setLoadingUser] = useState(true)

/* 	useEffect(() => {
		const verifyParams = new URLSearchParams(window.location.search)
		const params = verifyParams.get('refresh')
		console.log(params)
		if (params === "true") {
			window.history.pushState({}, document.title, "/");
			window.location.reload()
		}
	}, []) */

	const handleEmailVerified = () => {
		setIsEmailVerified(true)
	}

	onAuthStateChanged(auth, (user) => {
		if (user) {

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
		return <div className="loading">Carregando...</div>
	}

/* 	console.log("isLogged: ", isLogged)
	console.log("auth.currentUser: ", auth.currentUser) */
	console.log("isEmailVerified: ", isEmailVerified)

    return (
		<div className='App'>
			<AuthContext.Provider value={auth}>
				<ChangeEmailVerified handleEmailVerified={handleEmailVerified}/>
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
							<Route path='*' element={<NotFound/>}></Route>
							<Route path='/' element={<Home isEmailVerified={isEmailVerified}/>}></Route>
							<Route path='/about' element={<About/>}></Route>
							<Route path='/resetpassword' element={<ResetPassword/>}></Route>
							<Route path='/verifyemail' element={<VerifyEmail setIsEmailVerified={setIsEmailVerified}/>}></Route>

							{/* ROTAS PARA AUTENTICADO */}
							<Route path='/myprofile' element={isLogged ? <MyProfile isEmailVerified={isEmailVerified}/>:<Navigate to='/register'/>}></Route>

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

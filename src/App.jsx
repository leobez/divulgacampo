import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

// Components
import Navbar from './Components/Navbar/Navbar'
import SubNavBar from './Components/SubNavBar/SubNavBar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

// Context
import AuthContext from './Context/AuthContext'

// Pages
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import MyProfile from './Pages/MyProfile/MyProfile'
import About from './Pages/About/About'
import NotFound from './Pages/NotFound/NotFound'
import ValidationEmailSent from './Pages/ValidationEmailSent/ValidationEmailSent'
import Config from './Pages/Config/Config'
import CreatePost from './Pages/CreatePost/CreatePost'
import PostPage from './Pages/PostPage/PostPage'
import EditPost from './Pages/EditPost/EditPost'
import ChangeName from './Pages/Config/User/ChangeName/ChangeName'
import DeleteAccount from './Pages/Config/User/DeleteAccount/DeleteAccount'
import ChangePassword from './Pages/Config/User/ChangePassword/ChangePassword'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ChangeEmail from './Pages/Config/User/ChangeEmail/ChangeEmail'
import LandingEmailPage from './Pages/LandingEmailPage/LandingEmailPage'

function App() {

	const auth = useContext(AuthContext)
	const [isLogged, setIsLogged] = useState(false)
	const [isEmailVerified, setIsEmailVerified] = useState(false)
	const [loadingUser, setLoadingUser] = useState(true)

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

/*  console.log("isLogged: ", isLogged)
	console.log("auth.currentUser: ", auth.currentUser)
	console.log("isEmailVerified: ", isEmailVerified) */

    return (
		<div className='App'>
			
			<AuthContext.Provider value={auth}>
				<BrowserRouter>
					<Header/>
				
					<div className='navcontainer'>
						<Navbar/>
						<SubNavBar/>	
					</div>

					<div className='main'>

						<Routes>
							<Route path='*' element={<NotFound/>}/>
							<Route path='/' element={<Home isEmailVerified={isEmailVerified}/>}/>
							<Route path='/about' element={<About/>}/>
							<Route path='/validationemailsent' element={<ValidationEmailSent/>}/>
							<Route path='/landingemailpage' element={<LandingEmailPage/>}/>
							<Route path='/post/:postId' element={<PostPage/>}/>
							<Route path='/config' element={<Config element={"config"}/>}/>
							<Route path='/config/user' element={<Config element={"user"}/>}/>
							<Route path='/config/appearance' element={<Config element={"appearance"}/>}/>

							{/* ROTAS PARA AUTENTICADO */}
							<Route path='/myprofile' element={isLogged ? <MyProfile isEmailVerified={isEmailVerified}/>:<Navigate to='/login'/>}/>
							<Route path='/createpost' element={isLogged ? <CreatePost isEmailVerified={isEmailVerified}/>:<Navigate to='/login'/>}/>
							<Route path='/editpost/:postId' element={isLogged ? <EditPost/> : <Navigate to="/login"/>}/>
							<Route path='/changename' element={isLogged ? <ChangeName/> : <Navigate to="/login"/>}/>
							<Route path='/deleteaccount' element={isLogged ? <DeleteAccount/> : <Navigate to="/"/>}/>
							<Route path='/changepassword' element={isLogged ? <ChangePassword/>: <Navigate to="/login"/>}/>
							<Route path='/changeemail' element={isLogged ? <ChangeEmail/>: <Navigate to="/login"/>}/>

							{/* ROTAS PARA NÃO AUTENTICADO */}
							<Route path='/login' element={!isLogged? <Login/>:<Navigate to="/"/>}/>
							<Route path='/register' element={!isLogged ? <Register/>:<Navigate to="/"/>}/>
							<Route path='/forgotpassword' element={!isLogged ? <ForgotPassword/>:<Navigate to="/"/>}/>

						</Routes>
					</div>

				</BrowserRouter>
				<Footer/>
			</AuthContext.Provider>

		</div>
    )
}

export default App

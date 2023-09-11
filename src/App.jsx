import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Components
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import NotFound from './Pages/NotFound/NotFound'

// Context

// Pages
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import MyProfile from './Pages/MyProfile/MyProfile'

import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function App() {

	// Info of the current user
	const auth = getAuth()

	const [globalUid, setGlobalUid] = useState()
	const [globalEmail, setGlobalEmail] = useState("")
	const [globalDisplayName, setGlobalDisplayName] = useState("")

	const [isLogged, setIsLogged] = useState(false)
	const [loadingUser, setLoadingUser] = useState(true)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log('USUARIO ESTA LOGADO?: ', auth.currentUser ? "Sim" : "Não")
			if (user) {
				console.log("TESTE: ", user.displayName, user.uid, user.email)
				setTimeout(() => {
					setGlobalDisplayName(user.displayName)
				}, 500)
				setGlobalUid(user.uid)
				setGlobalEmail(user.email)
				setIsLogged(true)
			} else {
				console.log("TESTE: NO DISPLAYNAME")
				setGlobalUid(undefined)
				setGlobalEmail("")
				setGlobalDisplayName("")
				setIsLogged(false)
			}
			setLoadingUser(false)	
		})
		
	}, [auth])

	if (loadingUser) {
		return <div className="lds-ring loading"><div></div><div></div><div></div><div></div></div>
	}

    return (
      <div className='App'>
			<BrowserRouter>
				<Header/>
				<Navbar auth={auth} isLogged={isLogged} setIsLogged={setIsLogged}/>
				<div className='main'>
					<Routes>
						<Route path='/' element={<Home uid={globalUid} email={globalEmail} displayName={globalDisplayName}/>}></Route>
						<Route path='*' element={<NotFound/>}></Route>

						{/* ROTAS PARA AUTENTICADO */}
						<Route path='/myprofile' element={isLogged ? <MyProfile uid={globalUid} email={globalEmail} displayName={globalDisplayName}/>:<Navigate to="/register"/>}></Route>

						{/* ROTAS PARA NÃO AUTENTICADO */}
						<Route path='/login' element={!isLogged ? <Login auth={auth}/>:<Navigate to="/"/>}></Route>
						<Route path='/register' element={!isLogged ? <Register auth={auth}/>:<Navigate to="/"/>}></Route>

					</Routes>
				</div>
			</BrowserRouter>
			<Footer/>
      </div>
    )
}

export default App

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

import { useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function App() {

	// Info of the current user
	const auth = getAuth()
	const [globalUid, setGlobalUid] = useState()
	const [globalEmail, setGlobalEmail] = useState("")
	const [globalDisplayName, setGlobalDisplayName] = useState("")
	const [isLogged, setIsLogged] = useState(false)
	const [loadingUser, setLoadingUser] = useState(true)

	onAuthStateChanged(auth, (user) => {
		console.log('USUARIO ESTA LOGADO?: ', auth.currentUser ? "Sim" : "Não")
		if (user) {
			setGlobalUid(user.uid)
			setGlobalEmail(user.email)
			setGlobalDisplayName(user.displayName)
			setIsLogged(true)
		}
		setLoadingUser(false)	
	})

	if (loadingUser) {
		return <p className='loading'>Carregando...</p>
	}

    return (
      <div className='App'>
			<BrowserRouter>
				<Header/>
				<Navbar auth={auth} isLogged={isLogged} setIsLogged={setIsLogged}/>
				<div className='main'>
					<Routes>
						<Route path='/' element={<Home uid={globalUid} email={globalEmail} displayName={globalDisplayName}/>}></Route>

						<Route path='/login' element={<Login/>}></Route>
						<Route path='/register' element={<Register auth={auth}/>}></Route>
						<Route path='*' element={<NotFound/>}></Route>
					</Routes>
				</div>
			</BrowserRouter>
			<Footer/>
      </div>
    )
}

export default App

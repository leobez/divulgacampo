import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Components
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import NotFound from './Pages/NotFound/NotFound'
// Pages
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'

function App() {

    return (
      <div className='App'>
			<Header/>
			<Navbar />
			<BrowserRouter>
				<div className="main">
					<Routes>
						<Route path='/' element={<Home/>}></Route>
						{/* <Route path='/projeto-lab-eng-soft' element={<Navigate to="/"/>}></Route> */}

            			<Route path='/login' element={<Login/>}></Route>
						<Route path='/register' element={<Register/>}></Route>

						<Route path='*' element={<NotFound/>}></Route>
					</Routes>
				</div>
			</BrowserRouter>
			<Footer/>
      </div>
    )
}

export default App

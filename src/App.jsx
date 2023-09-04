import './App.css'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

    return (
      <div className='App'>
<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path='/' element={<Home/>}></Route>

            <Route path='/login' element={<Login/>}></Route>
					</Routes>
				</div>
			</BrowserRouter>
      </div>
    )
}

export default App

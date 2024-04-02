
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Home from "./pages/home/Home.jsx";

function App() {
  return (
      <div className="p-4 h-screen flex justify-center items-center">
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </Router>
      </div>
  )
}

export default App

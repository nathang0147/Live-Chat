
import './App.css'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Home from "./pages/home/Home.jsx";
import useAuthContext from "./hook/useAuthContext.jsx";

function App() {
    const {chat_user} = useAuthContext();
  return (
      <div className="p-4 h-screen flex justify-center items-center">
        <Router>
            <Routes>
                <Route path='/' element={chat_user ? <Navigate to="/home"/> : <Login />} />
                <Route path='/signup' element={chat_user ? <Navigate to="/home"/> : <SignUp />} />
                <Route path='/home' element={chat_user ? <Navigate to="/"/> :<Home />} />
            </Routes>
        </Router>
      </div>
  )
}

export default App

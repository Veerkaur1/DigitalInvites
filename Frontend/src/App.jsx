import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AuthCallback from "./Components/AuthCallback";
import './App.css'
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import ProfilesList from './Components/ProfilesList';

function Navbar({ onLogout, userId }) {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div className="text-xl font-bold">MyApp</div>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/Login" className="hover:text-gray-300">Login</Link>
        <Link to="/Register" className="hover:text-gray-300">Register</Link>
        <Link to="/ProfilesList" className="hover:text-gray-300">Get All User</Link>


        {/* {userId && (
          <Link to={`/Profile/${userId}`} className="hover:text-gray-300">Profile</Link>
        )} */}
        <Link
          to="/Profile/dfab50ea-ed52-4dd7-8201-8a88ce4c3705"
          className="hover:text-gray-300"
        >
          Profile
        </Link>

        <button onClick={onLogout} className="hover:text-red-400">Logout</button>
      </div>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("You have been logged out!");
  }

  return (
    <>
      <BrowserRouter>
        <Navbar onLogout={handleLogout} />

        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path="/Profile" element={<Profile />} /> */}
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/ProfilesList" element={<ProfilesList />} />
          <Route path="/" element={<h1 className="p-4">Welcome to Home Page</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"

import Login from "./pages/login"
import Registration from "./pages/registration"
import Home from './pages/home,'
import CreatePortfolio from './pages/createPortfolio'
import ProtectedRoute from './components/Protected'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/registration"} element={<Registration />} />
        <Route path={"/home"} element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path={"/createPortfolio"} element={<ProtectedRoute><CreatePortfolio /></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

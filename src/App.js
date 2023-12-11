import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./components/Login"
import Main from "./components/Main"
import NavBar from "./components/NavBar"
import Register from "./components/Register"

function App() {
   return (
      <>
         <NavBar />

         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Main />} />
         </Routes>
      </>
   )
}

export default App

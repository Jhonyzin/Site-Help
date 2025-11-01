import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Teste from "./pages/Teste.jsx";

export default function App(){
    return(
        <Router>
            <div style={{padding: 20}}>
                <nav> 
                    <Link to="/login">Login</Link>
                    <Link to="/teste">Teste</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<h1>Página Inicial</h1>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/teste" element={<Teste/>}/>
                </Routes>
            </div>
        </Router>
    )
}
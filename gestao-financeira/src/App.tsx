import Login from './pages/login';
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Sobre from "./pages/sobre";
import { Route, Routes } from "react-router-dom";


function App() {

  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>


  );
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom";


import Home from "../pages/Home";
import Login from "../pages/Login";
import Produtos from "../pages/Produto";
import ScrollToTop from "../scrolltop/scroll";
import AdminPainel from "../pages/Dashboard";
import EditarProduto from "../pages/form";

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<AdminPainel />} />
            <Route path="dashboard/form/:id" element={<EditarProduto />} />
            <Route path="/produto/categoria/celular/:id" element={<Produtos />} />
        </Routes>
        
        </BrowserRouter>
        </>
     );
}
 
export default Paths;
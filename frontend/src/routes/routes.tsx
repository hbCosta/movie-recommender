import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Auth/login';
import Register from '@/pages/Auth/register';
import Home from '@/pages/Home/home';

export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

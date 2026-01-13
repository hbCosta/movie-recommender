import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Auth/login';
import Register from '@/pages/Auth/register';

export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

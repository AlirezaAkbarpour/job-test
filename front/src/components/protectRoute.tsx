import { Navigate } from "react-router-dom";
import type { ReactNode } from 'react';

const ProtectedRoute = ({children}: {children: ReactNode})=>{
    const token = localStorage.getItem('authToken')
    return token ? children : <Navigate to={'/login'}/>
}

export default ProtectedRoute
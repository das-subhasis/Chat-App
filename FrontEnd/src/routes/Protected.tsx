import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
    children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
    const { user } = useAuthContext();
    if (user.token) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />;
    }
}

export default Protected;

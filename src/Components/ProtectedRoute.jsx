import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('adminToken');
    
    console.log('ProtectedRoute - Auth Status:', !!isAuthenticated); // Debug log
    
    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login'); // Debug log
        return <Navigate to="/admin/login" />;
    }

    console.log('Authenticated, rendering children'); // Debug log
    return children;
};

export default ProtectedRoute; 
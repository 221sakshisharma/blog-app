// for restricting access to login and sign up pages for logged in users

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.status)

  if (isAuthenticated) {
    return <Navigate to="/my-space" replace/>;
  }
  
  return children;
  
};

export default AuthRedirect;
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  return Cookies.get('jwt') ? (
    children
  ) : (
    <Navigate to="/login" replace={true}></Navigate>
  );
};

export default ProtectedRoute;

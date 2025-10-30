import { Navigate } from "react-router";
import useAuthStore from "../stores/authStore";

const ProtectedRoute:React.FC<{children:React.ReactNode}> = ({children}) => {
    const { isAuthenticated } = useAuthStore();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <>{children}</>;
  };

  export default ProtectedRoute
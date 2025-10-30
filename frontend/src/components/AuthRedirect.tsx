import { Navigate } from "react-router";
import useAuthStore from "../stores/authStore";

const AuthRedirect:React.FC<{children:React.ReactNode}> = ({children}) => {
    const { isAuthenticated } = useAuthStore();
    
    if (!isAuthenticated) {
      return <>{children}</>;
    }
    
    return <Navigate to="/home" />;
  };

  export default AuthRedirect
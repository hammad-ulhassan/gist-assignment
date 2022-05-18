import { useLocation, useNavigate, useParams } from "react-router-dom";

export const RouterComponent = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    
    return (
      <Component
        navigate={navigate}
        params = {params}
        location = {location}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

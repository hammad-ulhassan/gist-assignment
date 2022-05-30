import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

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

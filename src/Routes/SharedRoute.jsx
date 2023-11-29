import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";
import { Navigate, useLocation } from "react-router-dom";


const SharedRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext); 
    const {isAdmin, isAdminLoading} = useAdmin();
    const {isSurveyor, isSurveyorLoading} = useSurveyor();
    const location = useLocation();

    if(loading || isAdminLoading || isSurveyorLoading){
        return <progress className="progress w-56"></progress>
    }

    if ((user && isAdmin) || (user && isSurveyor)) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default SharedRoute;
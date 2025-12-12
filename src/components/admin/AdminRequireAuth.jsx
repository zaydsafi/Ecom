import { useContext } from "react"
import { AdminAuthContext } from "../context/AdminAuth"
import { Navigate } from "react-router-dom";
Navigate

export const AdminRequireAuth = ({children}) => {
    const {user} = useContext(AdminAuthContext);

    if(!user){
        return <Navigate to={'/admin/login'} />
    }

    return children;
}
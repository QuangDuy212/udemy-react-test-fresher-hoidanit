import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    if (isAdminRoute && userRole === "ADMIN") {
        return (<>{props.children}</>)
    }
    return <NotPermitted />

}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    return (
        <>
            {isAuthenticated === true
                ?
                <>{props.children}</>
                :
                <Navigate to='/login' replace={true} />
            }
        </>
    )
}

export default ProtectedRoute;
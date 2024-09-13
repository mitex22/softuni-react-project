import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';

import AuthContext from '../../contexts/authContext';
import PATH from '../../paths/paths';

const RouteGuardAuth = () => {

    const {isAuthenticated} = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to={PATH.HOME} />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default RouteGuardAuth
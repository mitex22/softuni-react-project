import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as authAPI from "../api/auth-api"
import PATH from "../paths/paths"
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({
    children,
}) => {

    const navigate = useNavigate();

    const [auth, setAuth] = usePersistedState('auth', {});

    const [error, setError] = useState('');

    const loginSubmitHandler = async (values) => {

        try {
            const result = await authAPI.login(values.email, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);

            setError('');
        } catch (error) {
            setError(error.message);
        }
    }

    const registerSubmitHandler = async (values) => {

        if (values.username.length < 3) {
            setError({ username: 'Username must be at least 3 characters!' });
            return;
        }

        if (values.password.length < 6) {
            setError({ password: 'Password must be at least 6 characters!' });
            return;
        }

        if (values.password !== values['confirm-password']) {
            setError({ confirmPassword: 'Password and Confirm Password must match!' });
            return;
        }

        try {
            const result = await authAPI.register(values.email, values.username, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);

            setError('');
        } catch (error) {
            if (error.message === 'A user with the same email already exists') {
                setError({ email: 'A user with the same email already exists!' });
                return;
            }
            setError(error.message);
        }
    }

    const logoutHandler = () => {

        setAuth({});

        localStorage.removeItem('accessToken');

        navigate(PATH.HOME);

        localStorage.removeItem('auth');
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        error,
        setError,
        username: auth.username || auth.email,
        email: auth.email,
        // double negation - if truthy value cast to TRUE
        // double negation - if falsy value cast to FALSE
        isAuthenticated: !!auth.email,
        userId: auth._id
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
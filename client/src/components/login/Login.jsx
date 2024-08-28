import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";
import PATH from "../../paths/paths"

const LOGIN_FORM_KEYS = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

const Login = () => {
    const { loginSubmitHandler, error, setError } = useContext(AuthContext);

    // cleanup 
    useEffect(() => {

        return () => {
            setError('');
        }

    }, []);

    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, { [LOGIN_FORM_KEYS.EMAIL]: '', [LOGIN_FORM_KEYS.PASSWORD]: '' });

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100vh] lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">Your email</label>
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        required=""
                                        name={LOGIN_FORM_KEYS.EMAIL}
                                        onChange={onChange}
                                        value={values[LOGIN_FORM_KEYS.EMAIL]} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                        name={LOGIN_FORM_KEYS.PASSWORD}
                                        onChange={onChange}
                                        value={values[LOGIN_FORM_KEYS.PASSWORD]}
                                    />
                                </div>

                                <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log In</button>

                                {error &&
                                    <p>
                                        <span>{error}</span>
                                    </p>
                                }

                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <Link className="font-medium text-purple-600 hover:text-purple-700 " to={PATH.REGISTER}>Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;
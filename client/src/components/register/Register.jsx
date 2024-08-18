import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import PATH from "../../paths/paths"

const REGISTER_FORM_KEYS = {
    EMAIL: 'email',
    USERNAME: 'username',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirm-password'
}

const Register = () => {

    const { registerSubmitHandler, error, setError } = useContext(AuthContext);

    // cleanup 
    useEffect(() => {

        return () => {
            setError('');
        }

    }, []);

    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [REGISTER_FORM_KEYS.EMAIL]: '',
        [REGISTER_FORM_KEYS.USERNAME]: '',
        [REGISTER_FORM_KEYS.PASSWORD]: '',
        [REGISTER_FORM_KEYS.CONFIRM_PASSWORD]: '',
    });

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-300">
                <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto h-[100vh] lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Your email</label>
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                        name={REGISTER_FORM_KEYS.EMAIL}
                                        onChange={onChange}
                                        value={values[REGISTER_FORM_KEYS.EMAIL]} />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Your username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="jorko0o0o"
                                        required=""
                                        name={REGISTER_FORM_KEYS.USERNAME}
                                        onChange={onChange}
                                        value={values[REGISTER_FORM_KEYS.USERNAME]} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        name={REGISTER_FORM_KEYS.PASSWORD}
                                        onChange={onChange}
                                        value={values[REGISTER_FORM_KEYS.PASSWORD]}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-slate-700 dark:text-white">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        name={REGISTER_FORM_KEYS.CONFIRM_PASSWORD}
                                        onChange={onChange}
                                        value={values[REGISTER_FORM_KEYS.CONFIRM_PASSWORD]}
                                    />
                                </div>

                                <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>

                                {error &&
                                    <p>
                                        <span>{error}</span>
                                    </p>
                                }

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already registered? <Link className="font-medium text-purple-600 dark:text-purple-500 hover:text-purple-700 " to={PATH.LOGIN}>Log In</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;
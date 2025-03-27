import { useContext, useEffect, useRef, useState } from "react";
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

    const [loading, setLoading] = useState(false);

    const registerBtnClass = () =>
        loading
            ? 'disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none cursor-not-allowed w-full text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            : 'w-full text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center';

    useEffect(() => {

        return () => {
            setError('');
        }

    }, []);

    const { values, onChange, onSubmit } = useForm(async (formData) => {
        setLoading(true);
        await registerSubmitHandler(formData);
        setLoading(false);
    }, {
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
            <section className="bg-gray-50 pb-12">
                <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto h-[100vh] lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-20 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">Your email</label>
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        required
                                        name={REGISTER_FORM_KEYS.EMAIL}
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[REGISTER_FORM_KEYS.EMAIL]} />
                                </div>
                                {error.email &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.email}</span>
                                }
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-700">Your username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        placeholder="jorko0o0o"
                                        required
                                        name={REGISTER_FORM_KEYS.USERNAME}
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[REGISTER_FORM_KEYS.USERNAME]} />
                                </div>
                                {error.username &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.username}</span>
                                }
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        required=""
                                        name={REGISTER_FORM_KEYS.PASSWORD}
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[REGISTER_FORM_KEYS.PASSWORD]}
                                    />
                                </div>
                                {error.password &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.password}</span>
                                }
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-slate-700">Confirm password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-slate-700 rounded-lg focus:ring-indigo-600 focus:border-indigo-700 block w-full p-2.5"
                                        required=""
                                        name={REGISTER_FORM_KEYS.CONFIRM_PASSWORD}
                                        onChange={onChange}
                                        onInput={() => setError('')}
                                        value={values[REGISTER_FORM_KEYS.CONFIRM_PASSWORD]}
                                    />
                                </div>
                                {error.confirmPassword &&
                                    <span className="text-xs text-red-600 animate-pulse">{error.confirmPassword}</span>
                                }

                                <button
                                    type="submit"
                                    className={registerBtnClass()}
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </button>

                                <p className="text-sm font-light text-slate-500">
                                    Already registered? <Link className="font-medium text-indigo-600 hover:text-indigo-800" to={PATH.LOGIN}>Log In</Link>
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
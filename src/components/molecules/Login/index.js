import { useState } from "react";
import Axios from 'axios';
import { Auth } from "../../../../services";
import { Spin } from 'antd';
import { useRouter } from 'next/router'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const submitLogin = () => {
        setIsLoading(true);

        Axios.post(Auth.signIn, {
            email,
            password
        })
        .then(res => {
            const auth_token = res.data.auth_token;
            localStorage.setItem('auth_token', auth_token);
            router.push('/');
        })
        .catch(err => {
            console.log(err, 'Error');
        })
        .finally(_ => {
            setIsLoading(false);
        })
    }

    return (
        <section className="h-screen p-40 bg-white">
            <div className="px-6 h-full text-gray-800">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    type="button"
                                    onClick={submitLogin}
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    {isLoading ? <Spin /> : 'Login'}
                                </button>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <a
                                        href="#"
                                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                    >
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
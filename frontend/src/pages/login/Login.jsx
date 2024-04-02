import {useState} from "react";
import {login} from "../../utils/ApiFunction.js";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('password')

    const navigator = useNavigate()


    const handleInputUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleInputPassword = (e) => {
        setPassword(e.target.value)
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        if(password.length<5) {
            alert("Please enter password again")
        }else {
            try{
                const resData = await login(username, password);
                if (resData && resData.access_token) {
                    console.log(resData)
                    localStorage.setItem("access_token", resData.access_token);
                    navigator("/home")
                } else {
                    console.error('No access token in response', resData);
                }
            }catch (e){
                console.log(e.message)
            }

        }
    }

    return (
        <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
                <div className="flex-col items-center justify-center p-2">
                    <strong className="text-5xl justify-center text-center card-title text-amber-50">
                        Login
                        <span className='text-blue-500'> ChatApp</span>
                    </strong>
                    <div className="text-center pt-4 text-opacity-55 ">
                        <strong style={{ color: '#535C91', fontSize: '17px' }}>Join for exclusive access!</strong>
                    </div>

                    <form className="p-2">
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text text-amber-50">Username</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    required
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleInputUsername}
                                />
                            </label>
                        </div>

                        <div className="pt-1">
                            <label className="label p-2">
                                <span className="text-base label-text text-amber-50">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd"
                                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <input
                                    type="password"
                                    className="grow"
                                    required
                                    value={password}
                                    onChange={handleInputPassword}
                                />
                            </label>
                        </div>

                        <a href="/signup" className=" text-sm hover:underline hover:text-blue-500 mt-2 inline-block">
                            {"Don't"} have an account?
                        </a>

                        <div className="pt-3 pb-1">
                            <button type="submit" className="btn btn-block btn-sm"
                            onClick={handleLogin}
                            >Login</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;

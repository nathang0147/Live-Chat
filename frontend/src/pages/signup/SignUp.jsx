import GenderCheckBox from "./GenderCheckbox.jsx";
import {useState} from "react";
import {signup} from "../../utils/ApiFunction.js";
import {Link, useNavigate} from "react-router-dom";
import useAuthContext from "../../hook/useAuthContext.jsx";

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {dispatch} = useAuthContext();

    const handleInputErrors = ({ fullName, userName, password, confirmPassword, gender }) => {
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            throw new Error("Please fill in all fields");
        }

        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        return true;
    }

    const handleInputFullName = (e) => {
        setFullName(e.target.value);
    }

    const handleInputUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    }

    const handleInputConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleCheckboxChange = (gender) => {
        setGender(gender);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try{
            handleInputErrors({ fullName, userName, password, confirmPassword, gender });
            const user = {fullName, userName, password, confirmPassword, gender};

            const resData = await signup(user);

            //save token
            localStorage.setItem("access_token", resData.access_token);

            //save User Data
            const userData = {
                _id: resData._id,
                fullName: resData.fullName,
                profilePicture: resData.profilePicture,
            }
            localStorage.setItem("chat_user", JSON.stringify(userData));

            //dispatch to global state
            dispatch({type: "LOGIN", payload: userData});


        }catch (e){
            setError(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
                <div className="flex-col items-center justify-center p-2">
                    <strong className="text-5xl justify-center text-center card-title text-amber-50 pb-5">
                        Sign Up
                        <span className='text-blue-500'> ChatApp</span>
                    </strong>

                    {error && <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>{error}</span>
                        </div>}

                    <form className="p-2" onSubmit={handleSubmit}>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text text-amber-50">Full Name</span>
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
                                    placeholder="Enter your full Name"
                                    value={fullName}
                                    onChange={handleInputFullName}
                                />
                            </label>
                        </div>

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
                                    value={userName}
                                    onChange={handleInputUserName}
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
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleInputPassword}
                                />
                            </label>
                        </div>

                        <div className="pt-1">
                            <label className="label p-2">
                                <span className="text-base label-text text-amber-50">Confirm Password</span>
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
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleInputConfirmPassword}
                                />
                            </label>
                        </div>
                        <GenderCheckBox onCheckBoxChange={handleCheckboxChange} selectedGender={gender}/>

                        <Link to="/login" className=" text-sm hover:underline hover:text-blue-500 mt-2 inline-block" >
                            Already have an account?
                        </Link>

                        <div className="pt-3 pb-1">
                            {isLoading ? (
                                <button className="btn btn-block btn-sm" disabled="disabled">
                                    <span className="loading loading-spinner"></span>
                                </button>) :
                                (
                                <button type="submit" className="btn btn-block btn-sm">Sign up</button>
                                )}
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignUp;

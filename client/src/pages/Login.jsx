import  {useState} from "react";
import {Link} from "react-router-dom";
import {FaEyeSlash, FaEye} from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUser} from "../context/UserContext.jsx";

const Login = ({showPassword, setShowPassword}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {setIsLogged} = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password
            })
            if(response.data.message){
                setError(response.data.message);
                setTimeout(() => {
                    setError('');
                }, 2000);
            }
            else{
                setIsLogged(true);
                navigate('/');
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex items-center justify-center h-[100vh] bg-gray-200">
            <div className="w-[70%] md:w-[30vw] min-w-[22rem] mx-auto border pt-10 bg-white rounded-lg shadow-2xl shadow-gray-300">
                <h1 className="text-4xl text-center font-serif text-gray-900">Login Form</h1>
                <div className="py-5">
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col py-3 px-5">
                            <input type="email"
                                   value={email}
                                   placeholder="Email"
                                   className="p-1 border-b-2 border-gray-300 text-lg outline-none"
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col py-3 px-5 relative">
                            <input type={showPassword}
                                   value={password}
                                   placeholder="Password"
                                   className="p-1 border-b-2 border-gray-300 text-lg outline-none"
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                            {
                                showPassword === "password" ?
                                    <FaEyeSlash onClick={() => setShowPassword("text")}
                                                className="absolute right-8 flex items-center top-6 text-xl text-gray-400 hover:text-gray-900 cursor-pointer"/>
                                                        :
                                    <FaEye onClick={() => setShowPassword("password")}
                                           className="absolute right-8 flex items-center top-6 text-xl text-gray-400 hover:text-gray-900 cursor-pointer"/>
                            }
                        </div>
                        <div className="flex flex-col py-8 px-5">
                            <button type="submit" className="py-3 px-2 border border-gray-800 rounded-full uppercase text-lg text-white bg-gray-900">Login</button>
                        </div>
                        {error && <span className="flex justify-center text-red-500 font-semibold">{error}</span>}
                    </form>
                    <span className="flex justify-center pt-10 gap-1">Don't have an account?
                        <Link to="/register" className="underline text-blue-600">Sign up!</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Login

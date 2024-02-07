import {useState} from "react";
import {Link} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = ({showPassword, setShowPassword}) => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if(!username || !email || !password){ setMessage('Please fill all the fields');
        }
        else if(password.length < 6){
            setMessage('Password must be at least 6 characters long');
        }
        else{
            try{
            const emailExistsResponse = await axios.post('http://localhost:3001/check-email', {
                email: email,
            });
            console.log(emailExistsResponse)
                if(emailExistsResponse.data.exists){
                    setMessage('Email already exists');
                    setTimeout(() => {
                        setMessage('');
                        setUsername('')
                        setEmail('');
                        setPassword('');
                    }, 2000)
                    return
                }
            } catch (err) {
                console.log(err)
            }
            try {
                const response = await axios.post('http://localhost:3001/register', {
                    email: email,
                    username: username,
                    password: password
                })
                if (response.data.message) {
                    navigate('/login');
                }
            }catch (err) {
                    console.log(err)
                }
            }
        }

    return (
        <div className="flex items-center justify-center h-[100vh] bg-gray-200">
            <div className="w-[70%] md:w-[30vw] min-w-[22rem] mx-auto border pt-10 bg-white rounded-lg shadow-2xl shadow-gray-300">
                <h1 className="text-4xl text-center font-serif text-gray-900">Registration Form</h1>
                <div className="py-5">
                    <form action="" onSubmit={handleRegister}>
                        <div className="flex flex-col py-3 px-5">
                            <input type="text"
                                   value={username}
                                   placeholder="Username"
                                   className="p-1 border-b-2 border-gray-300 text-lg outline-none"
                                   onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
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
                            <button type="submit" className="py-3 px-2 rounded-full uppercase text-xl text-white bg-gray-900">Create account</button>
                        </div>
                        {message && <span className="flex justify-center text-red-500 font-semibold">{message}</span>}
                    </form>
                    <span className="flex justify-center pt-10 gap-1">Already have an account?
                        <Link to="/login" className="underline text-blue-600">Sign in!</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Register
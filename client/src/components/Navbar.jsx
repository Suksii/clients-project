import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { BiX, BiMenu } from "react-icons/bi";
import {useEffect, useState} from "react";
import { AiOutlineLogout} from "react-icons/ai";
import axios from "axios";
import {useUser} from "../context/UserContext.jsx";

const Navbar = () => {

    const navbarItems = [
        {
            id: 1,
            name: "Table",
            link: "/"
        },
        {
            id: 2,
            name: "Cards",
            link: "/cards"
        },
    ];

    const [toggle, setToggle] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const {setIsLogged} = useUser();

    useEffect(() => {
        axios.get('http://localhost:3001/current-user')
            .then(response => {
            setCurrentUser(response.data.username)
        })
            .catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <>
        <nav className="bg-gray-100 hidden md:flex items-center justify-between px-[2vw] border-b-2 border-gray-500">
            <h2 className="text-[3rem] text-gray-500 font-serif cursor-pointer">Logo</h2>
            <div className="flex gap-[6vw]">
                {
                    navbarItems.map((item, index) => {
                        return (
                            <Link to={item.link} key={index}>
                                <h2 className="text-lg text-gray-500 font-serif uppercase">{item.name}</h2>
                            </Link>
                        )
                    })
                }
            </div>
            <p className="flex items-center gap-2 text-gray-500 text-xl hover:text-gray-900 font-semibold duration-300">Hello, {currentUser}</p>
            <h3 className="text-xl text-gray-500 font-serif cursor-pointer"
                onClick={() => {
                    navigate("/login");
                    setIsLogged(false);
                }}>Logout</h3>
        </nav>
            <nav className={`bg-gray-200 md:hidden flex items-center justify-between px-[2vw] border-b-2 border-gray-500 relative`}>
                <h2 className="text-[3rem] text-gray-500 font-serif cursor-pointer">Logo</h2>
                <p className="flex items-center gap-2 text-gray-500 text-xl hover:text-gray-900 uppercase font-semibold duration-300">Hello, {currentUser}</p>
                <div className="cursor-pointer text-3xl text-gray-500 hover:text-gray-900 duration-500" onClick={() => setToggle(prev => !prev)}>
                    {toggle ? <BiX/> : <BiMenu/>}
                </div>
            </nav>
            <div className={`md:hidden flex flex-col bg-gray-200 gap-10 absolute right-0 py-10 items-center justify-center border-b-2 border-gray-500 ${toggle ? 'w-full' : 'w-0'} cursor-pointer transition-all duration-300`}>
                {
                    navbarItems.map(item => {
                        return (
                            <Link to={item.link} key={item.id} onClick={() => setToggle(false)}>
                                <div className="text-gray-500 text-xl hover:text-gray-900 duration-300 uppercase font-semibold">{item.name}</div>
                            </Link>
                        )
                    })
                }
                <p className="flex items-center gap-2 text-gray-500 text-xl hover:text-gray-900 uppercase font-semibold duration-300"
                   onClick={() => {
                       navigate('/login');
                       setToggle(false);
                   }}><AiOutlineLogout/>Logout</p>
            </div>
        </>
    );
}

export default Navbar;
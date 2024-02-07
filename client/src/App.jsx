import Login from "./pages/Login.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Main from "./pages/Main.jsx";
import {useState} from "react";
import AddEditClient from "./pages/AddEditClient.jsx";
import {useUser} from "./context/UserContext.jsx";
import Cards from "./pages/Cards.jsx";
import View from "./pages/View.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

    const [showPassword, setShowPassword] = useState("password")
    const [clients, setClients] = useState([]);
    const {isLogged} = useUser();

    const router = createBrowserRouter([
        {
            path: "/",
            element: isLogged ? <Main clients={clients} setClients={setClients}/> : <Login showPassword={showPassword} setShowPassword={setShowPassword}/>
        },
        {
            path: "/login",
            element: <Login showPassword={showPassword} setShowPassword={setShowPassword}/>
        },
        {
            path: "/register",
            element: <Register showPassword={showPassword} setShowPassword={setShowPassword}/>
        },
        {
            path: "/add-client",
            element: isLogged ? <AddEditClient/> : <Login showPassword={showPassword} setShowPassword={setShowPassword}/>
        },
        {
            path: "/update/:id",
            element: isLogged ? <AddEditClient/> : <Login showPassword={showPassword} setShowPassword={setShowPassword}/>
        },
        {
            path: "/client/:id",
            element: isLogged ? <View/> : <Login showPassword={showPassword} setShowPassword={setShowPassword}/>
        },
        {
            path: "/cards",
            element: isLogged ? <Cards clients={clients}/> : <Login showPassword={showPassword} setShowPassword={setShowPassword}/>
        }
        ]
    );

  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App

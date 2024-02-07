import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Table from "../components/Table.jsx";

const Main = ({clients, setClients}) => {

    const [message, setMessage] = useState('')

    const fetchedData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/clients')
            setClients(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchedData()
    }, []);
    const handleDelete = (id) => {
            axios.delete(`http://localhost:3001/delete-client/${id}`)
                setMessage('Client successfully deleted!')
                setTimeout(() => {
                    fetchedData();
                    setMessage('');
                }, 1000)
    }

    return (
        <div>
            <Navbar/>
            <Table data={clients} handleDelete={handleDelete}/>
            <div className="text-center">
                <Link to="/add-client" className="p-3 bg-blue-950 text-white rounded-lg text-center">
                    <button className="uppercase my-10">Add client</button>
                </Link>
                <p className="text-blue-600 text-center">{message}</p>
            </div>
        </div>
    )
}

export default Main
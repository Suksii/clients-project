import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ViewPage = () => {

    const { id } = useParams();
    const [client, setClient] = useState({});

    useEffect(() => {
                axios.get(`http://localhost:3001/api/get/${id}`)
                    .then((response) => {
                    setClient({...response.data[0]});
                    console.log(response.data[0]);
                })
    }, [id]);



    return (
        <div className="flex flex-col w-[30%] mx-auto">
            <h1 className="text-4xl text-center font-serif text-gray-900 py-12">Client Details</h1>
            <label htmlFor="name" className="">Name</label>
            <input type="text"
                   id="name"
                   value={client.client_name}
                   disabled={true}
                   className="border border-black rounded-md p-1 mb-3 mt-1 bg-gray-200"
            />
            <label htmlFor="phone">Phone number</label>
            <input type="number"
                   id="phone"
                   value={client.client_phone}
                   disabled={true}
                   className="border border-black rounded-md p-1 mb-3 mt-1 bg-gray-200"
                   onChange={(e) => setClient(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input type="email"
                   id="email"
                   value={client.client_email || ''}
                   disabled={true}
                   className="border border-black rounded-md p-1 mb-3 mt-1 bg-gray-200"
                   onChange={(e) => setClient(e.target.value)}
            />
            <label htmlFor="name">Age</label>
            <input type="number"
                   id="age"
                   value={client.client_age || ''}
                   disabled={true}
                   className="border border-black rounded-md p-1 mb-3 mt-1 bg-gray-200"
                   onChange={(e) => setClient(e.target.value)}
            />
            <button className="bg-gray-900 text-white rounded-md p-1 my-3 w-full" onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
}
export default ViewPage;
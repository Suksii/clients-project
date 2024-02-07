import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const AddEditClient = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/get/${id}`)
            .then((response) => {
                setName(response.data[0].client_name);
                setPhone(response.data[0].client_phone);
                setEmail(response.data[0].client_email);
                setAge(response.data[0].client_age);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!name || !phone || !email || !age){
            alert('Please fill all the fields');
        }
        else {
            if (!id) {
                try {
                    const response = await axios.post('http://localhost:3001/add-client', {
                        clientName: name,
                        clientPhone: phone,
                        clientEmail: email,
                        clientAge: age
                    })
                    if (response.data.message) {
                        setName('');
                        setPhone('');
                        setEmail('');
                        setAge('');
                        setMessage(response.data.message);
                        setTimeout(() => {
                            setMessage('');
                            navigate('/');
                        }, 2000)
                    } else {
                        setMessage(response.data.error);
                        setTimeout(() => {
                            setMessage('');
                        }, 2000)

                    }
                } catch (err) {
                    console.log(err)
                }
            } else {
                const response = await axios.put(`http://localhost:3001/api/put/${id}`, {
                    clientName: name,
                    clientPhone: phone,
                    clientEmail: email,
                    clientAge: age
                })
                if(response.data.message){
                    setMessage(response.data.message);
                    setTimeout(() => {
                        setMessage('');
                        navigate('/');
                    }, 2000)
                }
            }
        }

    }

    return (
        <div className="w-[90%] sm:w-[30rem] mx-auto">
            <h1 className="text-4xl text-center font-serif text-gray-900 py-[10vh]">{id ? 'Change client' : 'Add client'}</h1>
            <form action="" className="flex flex-col w-full" onSubmit={onSubmit}>
                <label htmlFor="name" className="">Name</label>
                <input type="text"
                       id="name"
                       value={name || ''}
                       placeholder="Name"
                       className="border border-black rounded-md p-1 mb-3 mt-1"
                       onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="phone">Phone number</label>
                <input type="number"
                       id="phone"
                       value={phone || ''}
                       placeholder="Phone number"
                       className="border border-black rounded-md p-1 mb-3 mt-1"
                       onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input type="email"
                       id="email"
                       value={email || ''}
                       placeholder="Email"
                       className="border border-black rounded-md p-1 mb-3 mt-1"
                       onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="name">Age</label>
                <input type="number"
                       id="age"
                       value={age || ''}
                       placeholder="Age"
                       className="border border-black rounded-md p-1 mb-3 mt-1"
                       onChange={(e) => setAge(e.target.value)}
                />
                <button className="bg-gray-900 text-white rounded-md p-1 my-3"
                        type="submit"
                >
                    {id ? 'Update' : 'Add'}
                </button>
                <p className="text-blue-600 text-center">{message}</p>
            </form>
                <button className="bg-gray-900 text-white rounded-md p-1 my-3 w-full" onClick={() => window.history.back()}>Go Back</button>
        </div>
    )
}
export default AddEditClient
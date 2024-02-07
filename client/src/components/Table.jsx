import {useNavigate} from "react-router-dom";

const Table = ({data, handleDelete}) => {

    const navigate = useNavigate()


    return (
        <div className="text-[0.65rem] sm:text-lg mt-10">
            <table className="w-[95%] lg:w-[70%] mx-auto">
                <thead className="h-10 bg-blue-950 text-white" style={{padding:'10px'}}>
                    <tr className=" text-center ">
                        <th className="w-[10vw] ">Name</th>
                        <th className="w-[10vw]">Phone</th>
                        <th className="w-[10vw]">Email</th>
                        <th className="w-[10vw]">Age</th>
                        <th className="w-[10vw]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(data) ? (
                    data.map((item) => (
                        <tr key={item.client_id} className="text-center h-8">
                            <td className="border border-gray-300">{item?.client_name}</td>
                            <td className="border border-gray-300">{item?.client_phone}</td>
                            <td className="border border-gray-300">{item?.client_email}</td>
                            <td className="border border-gray-300">{item?.client_age}</td>
                            <td className="border border-gray-300 sm:flex block">
                                <button onClick={() => navigate(`/update/${item.client_id}`)} className="bg-blue-950 text-white rounded-md p-1 mx-2 w-full">Edit</button>
                                <button type={"submit"} onClick={() => handleDelete(item?.client_id)} className="bg-red-950 text-white rounded-md p-1 mx-2 w-full">Delete</button>
                                <button onClick={() => navigate(`/client/${item.client_id}`)} className="bg-gray-900 text-white rounded-md p-1 mx-2 w-full">View</button>
                            </td>
                        </tr>
                    )
                    ))
                    : (
                        <tr>
                            <td colSpan={4} className="border border-gray-300 text-center p-10">No clients available.</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default Table
import Card from "../components/Card.jsx";

const Cards = ({clients}) => {
    return (
        <div className="w-[95%] mx-auto">
            <h1 className="text-center text-2xl font-bold my-10">Clients</h1>
            <div className="flex flex-wrap gap-3">
                {
                    clients.map((item, index) => (
                        <div key={index} className="w-[40rem] mx-auto">
                            <Card name={item.client_name} phone={item.client_phone} email={item.client_email} age={item.client_age}/>
                        </div>
                    ))
                }
            </div>
            <div className="w-[30vw] md:w-[20%] mx-auto py-10">
                <button className="bg-gray-900 text-white rounded-md p-1 my-3 w-full" onClick={() => window.history.back()}>Go Back</button>
            </div>
        </div>
    )
}

export default Cards
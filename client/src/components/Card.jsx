const Card = ({ name, phone, email, age }) => {
    return (
        <div className="my-5 border border-gray-300 rounded-md p-5">
            <div className="flex justify-between items-center border-b border-gray-300">
                <span className="text-xl">Phone:</span>
                <span className="text-lg text-gray-500">{phone}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300">
                <span className="text-xl">Name:</span>
                <span className="text-lg text-gray-500">{name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300">
                <span className="text-xl">Email:</span>
                <span className="text-lg text-gray-500">{email}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300">
                <span className="text-xl">Age:</span>
                <span className="text-lg text-gray-500">{age}</span>
            </div>
        </div>
    )
}

export default Card
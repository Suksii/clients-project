import { createContext, useState, useContext } from "react";
import {useLocalStorage} from '@uidotdev/usehooks';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useLocalStorage('isLogged', false);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            isLogged,
            setIsLogged }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;

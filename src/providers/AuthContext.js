import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
    const url = "https://server-mern-project.vercel.app"
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            const id = localStorage.getItem('id');
            const response = await axios.get(`${url}/users/${id}`)
            setUser(response.data)
        }
        fetchData();
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext);

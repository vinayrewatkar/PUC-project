import { createContext, useContext } from "react";
import { Error } from "../pages/Error";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) =>{
    const storeTokenInLS = (serverToken) =>{
        return localStorage.setItem("token",serverToken);

    };


    return <AuthContext.Provider value={{storeTokenInLS}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("used outside of the provider");
    }
    return authContextValue;
};
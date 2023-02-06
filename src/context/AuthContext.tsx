import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import FirebaseService from '../_services/Firebase'

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState<User>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        FirebaseService.auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setIsLoaded(true)
        })
    }, [currentUser])
    return (
        <AuthContext.Provider value={{currentUser, isLoaded}}>
            {children}
        </AuthContext.Provider>
    )
}
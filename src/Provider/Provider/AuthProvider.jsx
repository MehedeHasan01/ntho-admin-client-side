import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../../Configs/Firebase.config';




export const AuthContext = createContext(null)

const googleProvider =new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoding] = useState(true)



    const createUser = (email, password)=>{
        setLoding(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const login =(email, password)=>{
        setLoding(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = ()=>{
        setLoding(true)
        return signOut(auth)
    }



    const googleLogin =()=>{
        setLoding(true)
       return signInWithPopup(auth, googleProvider)
    }


    useEffect(()=>{
        const unSubcribe = onAuthStateChanged(auth, currentUser=>{
            setLoding(false)
            setUser(currentUser)
        })
        return ()=>{
            unSubcribe()
        }
    },[])


    const userInfo ={
        user,
        loading,
        createUser,
        login,
        logOut,
        googleLogin
    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;
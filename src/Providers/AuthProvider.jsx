import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from 'prop-types'; 
import auth from "../../firebase.config";



export const AuthContext = createContext(null);


const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser =(email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser =(email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle =() =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            // const userEmail = currentUser?.email || user?.email;
            // const loggedUser = {email: userEmail}
            
            setLoading(false);
            // if(currentUser){
            //     axios.post( 'https://job-flow-server.vercel.app/jwt',loggedUser, {withCredentials : true})
            //     .then(res => {
            //         console.log('token response', res.data);
            //     })
            // }
            // else{
            //     axios.post('https://job-flow-server.vercel.app/logout', loggedUser,
            //     {withCredentials: true})
            //     .then(res => {console.log(res.data);})
            // }
        })
        return () => {
            unSubscribe();
        }
    },[])

    const authInfo = {user, createUser, signInUser, logOut, signInWithGoogle, loading}
    
    
    return (
       <AuthContext.Provider value={authInfo}>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;
AuthProvider.propTypes ={
    children: PropTypes.node
}
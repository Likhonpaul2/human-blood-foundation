import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';


const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // dark mode 
    const [darkMode, setDarkMode] = useState(() => {
        // Persist theme in localStorage
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);


    // sign in with google 
    const SignInWithGoogle = () => {
        setLoading(false);
        return signInWithPopup(auth, GoogleProvider)
    }

    // signIn with email & pass 
    const SignInEmailAndPass = (email, password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password)
    }
    // create user with email  and pass  
    const CreateUserWithEmailAndPassword = (email, password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user photo and name 
    const UpdateUserPhotoAndName = (D_Name, P_URL) => {
        setLoading(false);
        return updateProfile(auth.currentUser, {
            displayName: D_Name, photoURL: P_URL
        })
    }
    // signout 
    const SignOut = () => {
        setLoading(false);
        return signOut(auth);
    }


    // auth holder 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(true);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const [userStatus, setUserStatus] = useState({})

    // fetch user info
    useEffect(() => {
        fetch(`${import.meta.env.VITE_server}users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserStatus(data.status);
                //   setPreviewImage(data.ImageUrl);
            });
    }, [user?.email]);




    const [userRole, setUserRole] = useState({});
    useEffect(() => {
        fetch(`${import.meta.env.VITE_server}users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserRole(data);
            })
    }, [user?.email, userRole])

    const userInfo = {
        user,
        loading,
        SignInWithGoogle,
        SignInEmailAndPass,
        SignOut,
        CreateUserWithEmailAndPassword,
        UpdateUserPhotoAndName,
        darkMode,
        setDarkMode,
        userStatus,
        userRole
    }


    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
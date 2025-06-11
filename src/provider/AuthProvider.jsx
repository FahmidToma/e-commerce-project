import { useState } from "react";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  //signin using google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //sign up or creating a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //send email verification mail
  const emailVerification = () => {
    setLoading(true);
    //console.log("email verification from authprovider");
    return sendEmailVerification(auth.currentUser);
  };

  //log in existing user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // forget password
  const resetPassword = email => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  //log out existing user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //update the user profile
  const updateUserProfile = name => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  //keep an eye on logged in user....if anyone is logged in or not

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, user => {
      //console.log("current user", user);
      setUser(user);
      if (user && user.emailVerified) {
        const userInfo = { email: user.email };
        axiosPublic.post("/jwt", userInfo).then(res => {
          //console.log(res.data);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      //setUser(user);
    });

    return () => {
      return unsubscribed();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    googleSignIn,
    createUser,
    emailVerification,
    updateUserProfile,
    signInUser,
    resetPassword,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

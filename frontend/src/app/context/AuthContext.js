"use client";
import { createContext,useContext,useState, useEffect } from "react";

const AuthContext=createContext();

export function AuthProvider({children}){
    const [token,setToken]=useState(null);
    const[user,setUser]=useState(null);
     const [loading,setLoading]=useState(true);
    
      useEffect(()=>{
        const savedToken=localStorage.getItem("token");
        const savedUser=JSON.parse(localStorage.getItem("user"));
        if(savedToken)setToken(savedToken);
        if(savedUser)setUser(savedUser);
        setLoading(false);
      },[])

   

    const login=(token,user)=>{
         console.log("login called", token, user);
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
        setToken(token);
        setUser(user);
    }

    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{token,user,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}
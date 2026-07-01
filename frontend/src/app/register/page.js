"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register(){
    const [form,setForm]=useState({name:"",email:"",password:""});
    const [error,setError]=useState("");
    const {login} =useAuth();
    const router=useRouter();

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});

    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await api.post("/auth/register",form);
            console.log("response:", res.data); 
            login(res.data.token,res.data.user);
            router.push("/dashboard")

        }catch(error){
            console.log("error:", err);
            setError(err.response?.data?.message||"Something went wrong")
        }
    }

    return(
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
           <Link
        href="/"
        className="cursor-pointer absolute top-6 left-6 text-sm text-gray-400 hover:text-black flex items-center gap-1"
      >
        ← Back
      </Link>

      <div className="bg-white border border-gray-100 rounded-2xl p-10 w-full max-w-sm">

        <h1 className="text-2xl font-bold mb-1">
          Link<span className="text-blue-500">Vault</span>
        </h1>
        <p className="text-xs text-gray-400 mb-7">Create your account</p>

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-xl py-2.5 text-sm cursor-pointer mt-1 hover:bg-gray-800"
          >
            Register
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-5 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">Login</Link>
        </p>

      </div>
    </main>
  );
}
"use client";

import {useState} from "react";
import api from "../api/axios";

export default function AddSection({onSectionAdded}){
    const [name,setName]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!name)return;
        await api.post("/sections",{name});
        setName("");
        onSectionAdded();
    }

    return(
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <input
            type="text"
            placeholder="New section name..."
            value={name}
            onChange={(e)=>setName(e.target.value)}
        className="border border-gray-200 rounded-lg px-4 py-2 flex-1 outline-none focus:border-gray-400"

            />
              <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        Add Section
      </button>
        </form>
    )
}


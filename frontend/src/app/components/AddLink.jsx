"use client";
import {useState} from "react";
import api from "../api/axios";

export default function AddLink({sectionId,onLinkAdded}){
    const [form,setForm]=useState({title:"",url:"",description:""});
    const [open,setOpen]=useState(false);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!form.title || !form.url)return;
       await api.post("/links",{...form,section:sectionId});
       setForm({title:"",url:"",description:""});
       setOpen(false);
       onLinkAdded();
    }

    return(
        <div>
          
           <button
  onClick={() => setOpen(!open)}
  className="cursor-pointer bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-all"
>
  + Add Link
</button>
             {open && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 mt-3">
  <input
    name="title"
    placeholder="Title"
    value={form.title}
    onChange={handleChange}
    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
  />
  <input
    name="url"
    placeholder="URL"
    value={form.url}
    onChange={handleChange}
    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
  />
  <input
    name="description"
    placeholder="Description (optional)"
    value={form.description}
    onChange={handleChange}
    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
  />
  <div className="flex gap-2 mt-1">
    <button
      type="submit"
      className="cursor-pointer bg-black text-white px-5 py-2 rounded-full text-xs hover:bg-gray-800"
    >
      Save
    </button>
    <button
      onClick={() => setOpen(false)}
      className="cursor-pointer border border-gray-200 px-5 py-2 rounded-full text-xs hover:bg-gray-100"
    >
      Cancel
    </button>
  </div>
</form>
      )}
  
        </div>
    )
}
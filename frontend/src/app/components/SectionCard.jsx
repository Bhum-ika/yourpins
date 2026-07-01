"use client";
const COLORS = ["#3b82f6", "#22c55e", "#ec4899", "#eab308"];
import api from "../api/axios";
import AddLink from "./AddLink";
import{useState,useEffect } from "react";

export default function SectionCard({section,index,onRefresh}){
  const color=COLORS[index%COLORS.length];

  const [links,setLinks]=useState([]);
  const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({ title: "", url: "", description: "" });

  const fetchLinks=async()=>{
    const links=await api.get(`/links?section=${section._id}`);
    setLinks(links.data);
  }
    useEffect(() => {
    fetchLinks();
  }, []);

    const handleDelete=async()=>{
        await api.delete(`/sections/${section._id}`);
        onRefresh();
    };
  

return (
  <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
    <div className="flex justify-between items-center mb-3">
      <h2 style={{color:color}} className="text-lg font-semibold tracking-wise uppercase">{section.name}</h2>
      <button onClick={handleDelete} className="text-sm text-red-400 hover:text-red-600">
        Delete
      </button>
    </div>

    {links.map((link) => (
      <div key={link._id} className="py-2 border-b border-gray-50 last:border-0">
        {editingId === link._id ? (
          <div className="flex flex-col gap-2">
            <input
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none"
            />
            <input
              value={editForm.url}
              onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none"
            />
            <input
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await api.patch(`/links/${link._id}`, editForm);
                  setEditingId(null);
                  fetchLinks();
                }}
                className="text-sm bg-black text-white px-3 py-1 rounded-lg"
              >
                Save
              </button>
              <button onClick={() => setEditingId(null)} className="text-sm text-gray-400">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <span style={{ color: color }} className="mt-1 text-xs">●</span>
            <div>
              <p className="text-sm font-medium">{link.title}</p>
              <a href={link.url} target="_blank" className="text-xs text-blue-400 hover:underline">
                {link.url}
              </a>
              {link.description && (
                <p className="text-xs text-gray-400 mt-1">{link.description}</p>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => {
                  setEditingId(link._id);
                  setEditForm({ title: link.title, url: link.url, description: link.description });
                }}
                className="text-sm text-gray-400 hover:text-black"
              >
                ✎
              </button>
              <button
                onClick={async () => {
                  await api.patch(`/links/${link._id}/star`);
                  fetchLinks();
                }}
                style={{ color: link.starred ? "#facc15" : "#d1d5db" }}
                className="text-lg"
              >
                ★
              </button>
              <button
                onClick={async () => {
                  await api.delete(`/links/${link._id}`);
                  fetchLinks();
                }}
                className="text-sm text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    ))}

    <AddLink sectionId={section._id} onLinkAdded={fetchLinks} />
  </div>
);



}
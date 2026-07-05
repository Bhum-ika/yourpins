"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../api/axios";
import AddLink from "../../components/AddLink";
import { useAuth } from "../../context/AuthContext";

const COLORS = ["#3b82f6", "#22c55e", "#ec4899", "#eab308"];

export default function SectionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token, loading } = useAuth();
  const [section, setSection] = useState(null);
  const [links, setLinks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", url: "", description: "" });

  const fetchSection = async () => {
    const res = await api.get(`/sections`);
    const found = res.data.find((s) => s._id == id);
    setSection(found);
  };

  const fetchLinks = async () => {
    const res = await api.get(`/links?section=${id}`);
    const sorted=res.data.sort((a,b)=>b.starred-a.starred);

    setLinks(sorted);
  };

  useEffect(() => {
    if (!loading) {
      if (!token) router.push("/login");
      else {
        fetchSection();
        fetchLinks();
      }
    }
  }, [token, loading]);

  if (loading) return null;
  if (!section) return <p className="p-10 text-sm text-gray-400">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-50 relative">

  <button
    onClick={() => router.push("/dashboard")}
    className="cursor-pointer absolute top-4 md:top-6 left-4 md:left-6 text-sm text-gray-400 hover:text-black flex items-center gap-1"
  >
    ← Back
  </button>

  <div className="max-w-4xl mx-auto px-4 md:px-10 pt-16 md:pt-20 pb-10">

    <div className="flex justify-between items-center mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{section.name}</h1>
      <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 md:px-4 py-1.5 md:py-2">
        <p className="text-sm font-medium text-gray-800">{links.length}</p>
        <p className="text-xs text-gray-400">{links.length === 1 ? "link" : "links"}</p>
      </div>
    </div>

    <div className="flex flex-col gap-3 mb-8">
      {links.map((link, index) => {
        const color = COLORS[index % COLORS.length];
        return (
          <div
            key={link._id}
            className="bg-white border border-gray-100 rounded-2xl px-4 md:px-5 py-3 md:py-4 flex justify-between items-start hover:shadow-md transition-shadow"
          >
            {editingId === link._id ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                <input
                  value={editForm.url}
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                <input
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={async () => {
                      await api.patch(`/links/${link._id}`, editForm);
                      setEditingId(null);
                      fetchLinks();
                    }}
                    className="cursor-pointer bg-black text-white rounded-full px-4 py-1.5 text-xs hover:bg-gray-800"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="cursor-pointer text-xs text-gray-400 hover:text-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex gap-2.5 items-start flex-1 min-w-0">
                  <span style={{ color }} className="text-[10px] mt-1.5 shrink-0">●</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium mb-0.5 truncate">{link.title}</p>
                    
                      <a href={link.url}
                      target="_blank"
                      className="text-xs text-gray-400 hover:underline truncate block"
                    >
                      {link.url}
                    </a>
                    {link.description && (
                      <p className="text-xs text-gray-300 mt-1">{link.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3 ml-2 md:ml-3 shrink-0">
                  <button
                    onClick={() => { setEditingId(link._id); setEditForm({ title: link.title, url: link.url, description: link.description }); }}
                    className="cursor-pointer text-sm text-gray-300 hover:text-black"
                  >✎</button>
                  <button
                    onClick={async () => { await api.patch(`/links/${link._id}/star`); fetchLinks(); }}
                    style={{ color: link.starred ? "#eab308" : "#d1d5db" }}
                    className="cursor-pointer text-base"
                  >★</button>
                  <button
                    onClick={async () => { await api.delete(`/links/${link._id}`); fetchLinks(); }}
                    className="cursor-pointer text-sm text-red-300 hover:text-red-500"
                  >✕</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>

    <AddLink sectionId={id} onLinkAdded={fetchLinks} />
  </div>
</main>
  );
}
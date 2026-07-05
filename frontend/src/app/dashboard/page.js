"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const COLORS = ["#3b82f6", "#22c55e", "#ec4899", "#eab308"];
const BG_COLORS = ["#eff6ff", "#f0fdf4", "#fdf2f8", "#fefce8"];

export default function Dashboard() {
  const [sections, setSections] = useState([]);
  const [name, setName] = useState("");
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [starredLinks,setStarredLinks]=useState([]);
  const [copied,setCopied]=useState(false);
  const { token, logout, user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const fetchSections = async () => {
    const res = await api.get("/sections");
    setSections(res.data);
  };

  const fetchStarredLinks=async()=>{
    const res=await api.get("/links/starred");
    setStarredLinks(res.data);
  }

  useEffect(() => {
    if (!loading) {
      if (!token) router.push("/login");
      else {
        fetchSections();
        fetchStarredLinks();

      }
    }
  }, [token, loading]);

  if (loading) return null;

  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post("/sections", { name });
    setName("");
    fetchSections();
  };

  const confirmDelete = async () => {
  if (!sectionToDelete) return;
  await api.delete(`/sections/${sectionToDelete._id}`);
  setSections((prev) => prev.filter((sec) => sec._id !== sectionToDelete._id));
  setSectionToDelete(null);
};

 return (
 <main className="min-h-screen bg-gray-50 px-4 md:px-10 py-6 md:py-10">
  <div className="max-w-4xl mx-auto">

    {/* Header */}
    <nav className="flex justify-between items-start mb-8 md:mb-10 pb-6 border-b border-gray-100">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Your<span className="text-blue-500">Pins</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1.5">
          Hey,{" "}
          <span className="font-medium text-gray-600">{user?.name}</span> 👋
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(`https://yourpins.vercel.app/u/${user?.username}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="cursor-pointer text-xs text-gray-600 hover:text-black border border-gray-300 hover:shadow-2xl rounded-full px-3 py-1.5 transition-all"
        >
          {copied ? "Copied ✓" : "Share 🔗"}
        </button>
        <button
          onClick={handleLogout}
          className="cursor-pointer text-xs bg-black text-white rounded-full px-3 py-1.5 hover:bg-gray-800 transition-all"
        >
          Logout →
        </button>
      </div>
    </nav>

    {/* Add Section Form */}
    <form onSubmit={handleAddSection} className="flex gap-2 mb-6 md:mb-8">
      <input
        type="text"
        placeholder="New section..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none bg-white focus:border-gray-400"
      />
      <button
        type="submit"
        className="cursor-pointer bg-black text-white rounded-full px-4 md:px-5 py-2 text-sm hover:bg-gray-800"
      >
        Add
      </button>
    </form>

    {/* Starred Links */}
    {starredLinks.length > 0 && (
      <div className="mb-8 md:mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-yellow-500 mb-4">
          ★ Starred
        </h2>
        <div className="flex flex-col gap-2">
          {starredLinks.map((link) => (
            <div
              key={link._id}
              className="bg-white border border-yellow-100 rounded-2xl px-4 md:px-5 py-3 flex justify-between items-center hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm font-medium truncate">{link.title}</p>
                
                  <a href={link.url}
                  target="_blank"
                  className="text-xs text-gray-400 hover:underline truncate block"
                >
                  {link.url}
                </a>
              </div>
              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <span className="hidden md:block text-xs text-gray-300 bg-gray-50 rounded-full px-3 py-1">
                  {link.section?.name}
                </span>
                <span className="text-yellow-400">★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Sections Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sections.map((section, index) => {
        const color = COLORS[index % COLORS.length];
        const bg = BG_COLORS[index % BG_COLORS.length];
        return (
          <div
            key={section._id}
            className="flex justify-between bg-white border rounded-2xl p-4 md:p-5 hover:shadow-md transition-shadow border-gray-100"
          >
            <div className="p-2" style={{ borderLeft: `4px solid ${color}` }}>
              <div
                className="inline-block rounded-lg px-2.5 py-1 mb-2.5"
                style={{ background: bg }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color }}
                >
                  {section.name}
                </span>
              </div>
              <Link
                href={`/section/${section._id}`}
                className="cursor-pointer text-xs text-gray-400 hover:text-black hover:underline block"
              >
                Click to view links →
              </Link>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  await api.patch(`/sections/${section._id}/visibility`);
                  fetchSections();
                }}
                className="cursor-pointer text-sm"
                title={section.isPublic ? "Make Private" : "Make Public"}
              >
                {section.isPublic ? "🔓" : "🔒"}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSectionToDelete(section);
                }}
                className="cursor-pointer text-xs"
              >
                ❌
              </button>
            </div>
          </div>
        );
      })}
    </div>

    {/* Delete Modal */}
    {sectionToDelete && (
      <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-sm">
          <h2 className="text-lg font-semibold mb-2">Delete section</h2>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            This will delete{" "}
            <span className="font-medium text-gray-800">{sectionToDelete.name}</span>{" "}
            and all its links. This can't be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setSectionToDelete(null)}
              className="cursor-pointer text-sm px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="cursor-pointer text-sm px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}

  </div>
</main>
)

}

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PublicVault() {
  const { username } = useParams();
  const [vault, setVault] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const res = await api.get(`/public/${username}`);
        setVault(res.data);
      } catch (err) {
        setError("Vault not found");
      }
    };
    fetchVault();
  }, [username]);

  if (error) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">{error}</p>
    </main>
  );

  if (!vault) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50 px-10 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            {vault.name}'s <span className="text-blue-500">Vault</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1.5">@{vault.username}</p>
        </div>

        {/* Sections */}
        {vault.sections.length === 0 ? (
          <p className="text-sm text-gray-400">No public sections yet.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {vault.sections.map((section) => (
              <div key={section.id}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  {section.name}
                </h2>
                <div className="flex flex-col gap-2">
                  {section.links.length === 0 ? (
                    <p className="text-xs text-gray-300">No links in this section.</p>
                  ) : (
                    section.links.map((link) => (
                      <div
                        key={link._id}
                        className="bg-white border border-gray-100 rounded-2xl px-5 py-3 flex justify-between items-center hover:shadow-md transition-shadow"
                      >
                        <div>
                          <p className="text-sm font-medium">{link.title}</p>
                          
                            <a href={link.url}
                            target="_blank"
                            className="text-xs text-gray-400 hover:underline"
                          >
                            {link.url}
                          </a>
                          {link.description && (
                            <p className="text-xs text-gray-300 mt-1">{link.description}</p>
                          )}
                        </div>
                        {link.starred && (
                          <span className="text-yellow-400 text-base">★</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PublicVault() {
  const { username } = useParams();
  const [pins, setPins] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await api.get(`/public/${username}`);
        setPins(res.data);
      } catch (err) {
        setError("Pins not found");
      }
    };
    fetchPins();
  }, [username]);

  if (error) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">{error}</p>
    </main>
  );

  if (!pins) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 md:px-10 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {pins.name}'s <span className="text-blue-500">Pins</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1.5">@{pins.username}</p>
        </div>

        {pins.sections.length === 0 ? (
          <p className="text-sm text-gray-400">No public sections yet.</p>
        ) : (
          <div className="flex flex-col gap-6 md:gap-8">
            {pins.sections.map((section) => (
              <div key={section.id}>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  {section.name}
                </h2>
                <div className="flex flex-col gap-2">
                  {section.links.length === 0 ? (
                    <p className="text-xs text-gray-300">No links in this section.</p>
                  ) : (
                    section.links.map((link) => (
                      <div
                        key={link.id}
                        className="bg-white border border-gray-100 rounded-2xl px-4 md:px-5 py-3 flex justify-between items-center hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1 min-w-0 mr-3">
                          <p className="text-sm font-medium truncate">{link.title}</p>
                          
                            <a href={link.url}
                            target="_blank"
                            className="text-xs text-gray-400 hover:underline truncate block"
                          >
                            {link.url}
                          </a>
                          {link.description && (
                            <p className="text-xs text-gray-300 mt-1 truncate">{link.description}</p>
                          )}
                        </div>
                        {link.starred && (
                          <span className="text-yellow-400 text-base shrink-0">★</span>
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
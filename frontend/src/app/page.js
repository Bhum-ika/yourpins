"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Organize",
    desc: "Create custom sections — Work, Learning, Tools — and keep links where they belong.",
    text: "#3b82f6",
    hoverBg: "#eff6ff",
    hoverBorder: "#bfdbfe",
  },
  {
    title: "Star",
    desc: "Star your most important links so they always stand out when you need them fast.",
    text: "#eab308",
    hoverBg: "#fefce8",
    hoverBorder: "#fde68a",
  },
  {
    title: "Private",
    desc: "Every pin is yours alone — private by default, shared only when you choose.",
    text: "#ec4899",
    hoverBg: "#fdf2f8",
    hoverBorder: "#fbcfe8",
  },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );
    sections.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.16), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative w-full">

        {/* Navbar */}
        <nav className="sticky top-0 z-50 flex justify-between items-center px-5 md:px-12 py-4 md:py-5 bg-white/85 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center text-base font-bold">
            <span>Your</span>
            <span className="text-blue-500">Pins</span>
          </div>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 text-sm border border-gray-100 rounded-full p-1.5 bg-white">
            <a href="#hero" className={`cursor-pointer transition-all px-4 py-1.5 rounded-full border border-gray-200 text-sm ${activeSection === "hero" ? "text-black" : "text-gray-400 hover:text-black"}`}>Home</a>
            <a href="#about" className={`cursor-pointer transition-all px-4 py-1.5 rounded-full border border-gray-200 text-sm ${activeSection === "about" ? "text-black" : "text-gray-400 hover:text-black"}`}>About</a>
            <a href="#contact" className={`cursor-pointer transition-all px-4 py-1.5 rounded-full border border-gray-200 text-sm ${activeSection === "contact" ? "text-black" : "text-gray-400 hover:text-black"}`}>Contact</a>
          </div>

          <div className="flex items-center gap-1.5 border border-black rounded-full p-1">
            <Link href="/login" className="cursor-pointer px-3 py-1.5 text-xs flex items-center gap-1">Login →</Link>
            <Link href="/register" className="cursor-pointer bg-black text-white px-3 py-1.5 rounded-full text-xs">Signup</Link>
          </div>
        </nav>

        {/* Mobile nav links */}
        <div className="flex md:hidden justify-center gap-4 py-3 border-b border-gray-100 bg-white text-sm">
          <a href="#hero" className={`cursor-pointer px-3 py-1 rounded-full ${activeSection === "hero" ? "text-black font-medium" : "text-gray-400"}`}>Home</a>
          <a href="#about" className={`cursor-pointer px-3 py-1 rounded-full ${activeSection === "about" ? "text-black font-medium" : "text-gray-400"}`}>About</a>
          <a href="#contact" className={`cursor-pointer px-3 py-1 rounded-full ${activeSection === "contact" ? "text-black font-medium" : "text-gray-400"}`}>Contact</a>
        </div>

        {/* Hero */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">YourPins</h1>
          <div className="text-xl md:text-3xl text-gray-700 mt-2 mb-6">for your digital life</div>
          <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">
            A minimal space to save, organize, and revisit your links — by topic, by mood, by you.
          </p>
          <Link
            href="/register"
            className="cursor-pointer inline-flex items-center gap-2 bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base hover:bg-gray-800 transition-all"
          >
            Get started →
          </Link>
        </section>

        {/* About */}
        <section id="about" className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 border-t border-gray-100">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">About</h2>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed mb-10 md:mb-16">
              YourPins is a full-stack personal link manager built for people who hate losing important links across tabs, chats, and browser bookmarks. Save once, find always.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border transition-all duration-300"
                  style={{ background: "#f9fafb", borderColor: "#f0f0f0" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = f.hoverBg;
                    e.currentTarget.style.borderColor = f.hoverBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.borderColor = "#f0f0f0";
                  }}
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: f.text }}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="min-h-screen flex items-center px-6 md:px-16 py-20 border-t border-gray-100">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Contact</h2>
            <p className="text-gray-500 text-sm mb-10 md:mb-14 max-w-md leading-relaxed">
              Feel free to reach out for collaborations, opportunities, or just to say hello.
            </p>

            <div className="flex items-center gap-5 mb-10 md:mb-14">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg md:text-xl font-semibold text-gray-700">
                BS
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Bhumika Sharma</h3>
                <p className="text-sm text-gray-500">Full Stack Developer</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <a href="mailto:bhumikas.mca25@cs.du.ac.in" className="group border border-gray-200 rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Email</p>
                <p className="text-gray-900 font-medium group-hover:text-blue-500 transition-colors">Mail me →</p>
              </a>
              <a href="https://github.com/Bhum-ika" target="_blank" rel="noopener noreferrer" className="group border border-gray-200 rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">GitHub</p>
                <p className="text-gray-900 font-medium group-hover:text-blue-500 transition-colors">Explore projects →</p>
              </a>
              <a href="https://www.linkedin.com/in/bhumikaasharma/" target="_blank" rel="noopener noreferrer" className="group border border-gray-200 rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">LinkedIn</p>
                <p className="text-gray-900 font-medium group-hover:text-blue-500 transition-colors">Let's connect →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-100 text-xs text-gray-300">
          © {new Date().getFullYear()} YourPins — Built by Bhumika Sharma
        </footer>
      </div>
    </main>
  );
}
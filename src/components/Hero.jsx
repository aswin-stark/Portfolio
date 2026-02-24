import React, { useState, useEffect } from "react";
import { Mail, FileText, Linkedin, Github, MapPin, Clock } from "lucide-react";
import profilePic from "../assets/profile.png";
import resume from "../assets/resume.pdf";
import NeonBackground from "../components/NeonBackground";

/* Magnetic Card Component with CSS Hover Glow */
function MagneticCard({ icon, label, glow, href, download }) {
  return (
    <a
      href={href}
      download={download}
      target={href ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`relative cursor-pointer w-full max-w-[120px] group`}
    >
      {/* Glow Background */}
      <div
        className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${glow} opacity-60 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-3xl`}
      />
      <div
        className={`absolute inset-0 rounded-3xl blur-2xl opacity-50 bg-gradient-to-r ${glow} transition-all duration-300 group-hover:opacity-70 group-hover:blur-2xl`}
      />

      {/* Card Content */}
      <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center transition-transform duration-300 group-hover:scale-105">
        <div className="mb-3 text-white">{icon}</div>
        <p className="text-xs tracking-widest text-gray-300 text-center">{label}</p>
      </div>
    </a>
  );
}

/* Clock & Location Component */
function ClockLocation() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const location = "Chennai, India";

  return (
    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-300 font-mono w-full">
      {/* Clock */}
      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2 shadow-[0_0_40px_rgba(168,85,247,0.7)]">
        <Clock size={20} className="text-purple-400 animate-pulse" />
        <span className="text-white text-lg md:text-xl font-bold">{formattedTime}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2 shadow-[0_0_40px_rgba(79,70,229,0.7)]">
        <MapPin size={20} className="text-cyan-400 animate-pulse" />
        <span className="text-white">{location}</span>
      </div>
    </div>
  );
}

/* Hero Component */
export default function Hero() {
  return (
    <div className="w-full min-h-screen text-white relative overflow-visible">
      {/* Background */}
      <NeonBackground />

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-start text-center px-6 pt-8 relative z-10">
        <span className="px-4 py-2 text-sm bg-white/10 rounded-full border border-white/10 mb-4 inline-block">
          ⚡ Available for opportunities
        </span>

        <h1 className="text-4xl md:text-6xl font-bold">
          Hi, I'm <span className="text-white">ASWIN</span>
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          Python Developer & MCA Graduate passionate about building scalable,
          user-focused software solutions.
        </p>

        {/* Profile Picture */}
        <div className="relative mt-10 w-44 h-44 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.6)]">
          <img
            src={profilePic}
            alt="ASWIN"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Magnetic Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-8 justify-items-center">
          <MagneticCard
            icon={<FileText size={30} />}
            label="RESUME"
            glow="from-pink-500 to-purple-500"
            href={resume}
            download="ASWIN_Resume.pdf"
          />
          <MagneticCard
            icon={<Linkedin size={30} />}
            label="LINKEDIN"
            glow="from-blue-500 to-cyan-500"
            href="https://www.linkedin.com/in/aswin-s-b74136210/"
          />
          <MagneticCard
            icon={<Github size={30} />}
            label="GITHUB"
            glow="from-gray-500 to-slate-700"
            href="https://github.com/aswin-stark"
          />
          <MagneticCard
            icon={<Mail size={30} />}
            label="EMAIL"
            glow="from-purple-500 to-indigo-500"
            href="mailto:ajayaswin521@gmail.com"
          />
        </div>

        {/* Clock & Location */}
        <ClockLocation />
      </div>
    </div>
  );
}
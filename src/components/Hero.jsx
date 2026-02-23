import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Mail,
  FileText,
  Linkedin,
  Github,
  MapPin,
  Clock,
} from "lucide-react";
import profilePic from "../assets/profile.png";
import resume from "../assets/resume.pdf";
import NeonBackground from "../components/NeonBackground";

/* Magnetic Card Component */
function MagneticCard({ icon, label, glow, onClick, href, download }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.15);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.15);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={href ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.1 }}
      className="relative group cursor-pointer w-full max-w-[120px]"
    >
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-60 blur-lg animate-tilt" />
      <div
        className={`absolute inset-0 rounded-3xl blur-2xl opacity-50 bg-gradient-to-r ${glow}`}
      />
      <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center">
        <div className="mb-3 text-white">{icon}</div>
        <p className="text-xs tracking-widest text-gray-300 text-center">{label}</p>
      </div>
    </motion.a>
  );
}

/* Neon Flickering Clock & Location with Pulsing Glow */
function ClockLocation() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const location = "Chennai, India";
  const digits = formattedTime.split("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.5 }}
      className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-300 font-mono w-full"
    >
      {/* Neon Clock with Pulsing Glow */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center gap-2 bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2 shadow-[0_0_40px_rgba(168,85,247,0.7)]"
      >
        <Clock size={20} className="text-purple-400 animate-pulse" />
        <div className="relative flex space-x-0.5">
          {/* Pulsing glow behind digits */}
          <div className="absolute inset-0 rounded-xl bg-purple-500 opacity-10 blur-2xl animate-pulse"></div>
          <div className="flex relative space-x-0.5">
            {digits.map((d, i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [0.7, 1, 0.85, 1],
                  textShadow: [
                    "0 0 4px #fff, 0 0 12px #8b5cf6",
                    "0 0 6px #fff, 0 0 18px #d8b4fe",
                    "0 0 4px #fff, 0 0 12px #8b5cf6",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1,
                  delay: i * 0.05,
                }}
                className="text-white text-lg md:text-xl font-bold relative z-10"
              >
                {d}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Neon Location */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2 shadow-[0_0_40px_rgba(79,70,229,0.7)]"
      >
        <MapPin size={20} className="text-cyan-400 animate-pulse" />
        <span className="text-white">{location}</span>
      </motion.div>
    </motion.div>
  );
}

/* Hero Component */
export default function Hero() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <div className="w-full min-h-screen text-white relative overflow-visible">
      {/* Background */}
      <NeonBackground />

      {/* Neon Cursor */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none mix-blend-screen z-50"
      />

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
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="relative mt-10 w-44 h-44 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.6)]"
        >
          <img
            src={profilePic}
            alt="ASWIN"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Magnetic Cards with direct download */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-4 gap-4 md:gap-[10px] mt-16 mb-8 justify-items-center">
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
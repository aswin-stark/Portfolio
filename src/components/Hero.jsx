import React from "react";
import { motion } from "framer-motion";
import { Star, Mail, Briefcase, Code, GraduationCap, Award } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#1a093e] to-[#090e2a] text-white relative overflow-hidden">

      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-30"
      />

      {/* Navbar */}
      <nav className="w-full flex justify-center pt-6">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 px-8 py-3 rounded-full flex items-center justify-between w-[90%] max-w-5xl"
        >
          <h1 className="text-lg font-semibold tracking-wide">ASWIN S</h1>

          <div className="hidden md:flex gap-6 text-sm text-gray-300">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#education" className="hover:text-white transition">Education</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          <button className="rounded-full px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform">
            Hire Me
          </button>
        </motion.div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-24">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="px-4 py-2 text-sm bg-white/10 rounded-full border border-white/10">
            ⚡ Available for opportunities
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Aswin Stark
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl"
        >
          Python Developer & MCA Graduate passionate about building efficient,
          scalable, and user-focused software solutions. Specializing in web
          applications, automation scripts, and backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-4 mt-8"
        >
          <button className="flex items-center gap-2 rounded-2xl px-6 py-3 text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform">
            <Star size={18} /> View My Work
          </button>

          <button className="flex items-center gap-2 rounded-2xl px-6 py-3 text-base border border-white/20 hover:bg-white/10 transition">
            <Mail size={18} /> Get In Touch
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { icon: <Briefcase size={22} />, value: "15+", label: "Projects Completed" },
            { icon: <Code size={22} />, value: "20+", label: "Technologies" },
            { icon: <GraduationCap size={22} />, value: "4+", label: "Years Learning" },
            { icon: <Award size={22} />, value: "5+", label: "Certifications" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
            >
              <div className="mb-3 text-purple-400">{item.icon}</div>
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-sm text-gray-400 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
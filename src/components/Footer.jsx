import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070714] text-gray-400 py-10 px-6 overflow-hidden">
      
      {/* Animated Gradient Top Border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />

      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-40"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 200,
            }}
            animate={{
              y: [null, -50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left */}
        <p className="text-sm">
          © {year} Aswin S. All rights reserved.
        </p>

        {/* Center Icons with Glow */}
        <div className="flex items-center gap-8 text-lg">
          
          <motion.a
            href="https://github.com/aswin-stark"
            target="_blank"
            whileHover={{
              scale: 1.3,
              textShadow: "0px 0px 12px rgb(168 85 247)",
            }}
            className="transition duration-300 hover:text-purple-400"
          >
            <FiGithub />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/aswin-s-b74136210/"
            target="_blank"
            whileHover={{
              scale: 1.3,
              textShadow: "0px 0px 12px rgb(59 130 246)",
            }}
            className="transition duration-300 hover:text-blue-400"
          >
            <FiLinkedin />
          </motion.a>

          <motion.a
            href="mailto:ajayaswin521@gmail.com"
            whileHover={{
              scale: 1.3,
              textShadow: "0px 0px 12px rgb(168 85 247)",
            }}
            className="transition duration-300 hover:text-purple-400"
          >
            <FiMail />
          </motion.a>

        </div>

        {/* Right */}
        <p className="text-sm flex items-center gap-2">
          Built with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-red-500"
          >
            <FiHeart />
          </motion.span>
          creative way.
        </p>
      </div>

      {/* Scroll To Top Button */}
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-full shadow-lg text-white"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
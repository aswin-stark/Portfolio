import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = ["About", "Skills", "Education", "Contact"];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== HEADER ===== */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 
          px-6 py-3 rounded-full flex items-center justify-between 
          w-[92%] max-w-7xl shadow-2xl"
        >
          {/* Logo */}
          <a href="/Portfolio/"> <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            ASWIN
          </h1></a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white relative group"
              >
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Button */}
          <a
            href="#contact"
            className="hidden md:block rounded-full px-6 py-2 
            bg-gradient-to-r from-purple-500 to-indigo-500 
            hover:scale-105 transition shadow-lg"
          >
            Hire Me
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </motion.div>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 
            w-[90%] max-w-sm backdrop-blur-xl bg-black/80 
            border border-white/10 rounded-2xl p-6 z-40"
          >
            <div className="flex flex-col gap-5 text-center">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white text-lg 
                  transition hover:tracking-widest"
                >
                  {item}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full px-6 py-3 
                bg-gradient-to-r from-purple-500 to-indigo-500 
                shadow-lg hover:scale-105 transition"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="h-24" />
    </>
  );
}
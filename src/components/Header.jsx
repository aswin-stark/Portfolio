import { motion } from "framer-motion";

export default function Header() {
  return (
    <nav className="w-full flex justify-center pt-6">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 px-8 py-3 rounded-full flex items-center justify-between w-[90%] max-w-5xl shadow-xl"
      >
        <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          ASWIN
        </h1>

        <div className="hidden md:flex gap-6 text-sm">
          {["About", "Skills", "Education", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white relative group"
            >
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all" />
              {item}
            </a>
          ))}
        </div>

        <button className="rounded-full px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition">
          Hire Me
        </button>
      </motion.div>
    </nav>
  );
}
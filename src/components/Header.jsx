import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-3">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`backdrop-blur-xl border border-white/10
          px-6 py-3 rounded-full flex items-center justify-between
          w-[95%] max-w-6xl shadow-2xl transition-colors duration-300
          ${scrolled ? "bg-[#0d0d10]/90" : "bg-white/5"}`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-1">
            <h1 className="text-lg font-extrabold tracking-wide text-white">
              ASWIN<span className="text-(--accent)">.</span>
            </h1>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative group tracking-wide transition-colors duration-300 ${
                    isActive ? "text-(--accent)" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--accent) transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--accent) group-hover:w-full transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full px-6 py-2 text-sm font-semibold
            bg-(--accent) hover:bg-(--accent-dark)
            hover:scale-105 transition shadow-lg shadow-(--accent)/30"
          >
            Let's Talk
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
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
            w-[90%] max-w-sm backdrop-blur-xl bg-[#0d0d10]/95
            border border-white/10 rounded-2xl p-6 z-40"
          >
            <div className="flex flex-col gap-5 text-center">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white text-lg
                  transition hover:tracking-widest"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full px-6 py-3 font-semibold
                bg-(--accent) shadow-lg hover:scale-105 transition"
              >
                Let's Talk
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

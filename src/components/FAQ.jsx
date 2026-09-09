import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    q: "What services do you offer?",
    a: "I specialize in backend development with Python (Flask/FastAPI), REST API design, database modeling with MySQL and MongoDB, and building responsive front-ends with React.",
  },
  {
    q: "Are you open to internships or full-time roles?",
    a: "Yes — I'm actively seeking full-time Python Developer positions as well as internship opportunities, remote or based in Chennai.",
  },
  {
    q: "What is your tech stack?",
    a: "Python, Flask, FastAPI, React, Node.js, MySQL, MongoDB, and Git/GitHub, alongside HTML, CSS, and Tailwind CSS for the front-end.",
  },
  {
    q: "How can I get in touch with you?",
    a: "The fastest way is the contact form below, or reach out directly via email or LinkedIn — links are in the Contact section.",
  },
];

function FAQItem({ item, isOpen, onClick }) {
  return (
    <Reveal className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-semibold text-white text-base sm:text-lg">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) flex items-center justify-center"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed pb-6 pr-12">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative text-white px-6 py-24 sm:py-28">
      <SectionHeading eyebrow="Got Questions?" title="Frequently Asked" highlight="Questions" />

      <div className="max-w-3xl mx-auto">
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            item={item}
            isOpen={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}

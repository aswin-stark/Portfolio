import { useRef } from "react";
import { useInView } from "framer-motion";
import "@fontsource/orbitron/700.css";
import "@fontsource/poppins/400.css";
import { FileText, Code2, Layers, GraduationCap, Sparkles } from "lucide-react";
import profilePic from "../assets/profile.png";
import resume from "../assets/resume.pdf";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import useCountUp from "./useCountUp";

const details = [
  { label: "Name", value: "Aswin S" },
  { label: "Degree", value: "MCA (2024 – 2026)" },
  { label: "Email", value: "ajayaswin521@gmail.com" },
  { label: "Phone", value: "+91 8144721458" },
  { label: "Address", value: "Chennai, India" },
  { label: "Language", value: "English" },
  { label: "Availability", value: "Immediately Available" },
];

/* NOTE: placeholder figures — update these with your real numbers */
const highlights = [
  { icon: <Code2 size={20} />, value: 10, suffix: "+", label: "Projects Built" },
  { icon: <Layers size={20} />, value: 15, suffix: "+", label: "Technologies Used" },
  { icon: <GraduationCap size={20} />, value: 2, suffix: "", label: "Degrees Earned" },
  { icon: <Sparkles size={20} />, value: 100, suffix: "%", label: "Quality Focus" },
];

function StatBox({ icon, value, suffix, label, active, delay }) {
  const count = useCountUp(value, active, 1200 + delay);
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-(--accent)/50 hover:-translate-y-1 transition-all duration-300">
      <div className="mx-auto mb-2 w-9 h-9 rounded-xl bg-(--accent)/10 text-(--accent) flex items-center justify-center">
        {icon}
      </div>
      <p className="text-xl font-extrabold text-white leading-none">
        {count}
        <span className="text-(--accent)">{suffix}</span>
      </p>
      <p className="mt-1.5 text-[11px] text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export default function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="relative text-white px-5 sm:px-10 py-24 sm:py-28 overflow-hidden font-poppins"
    >
      <SectionHeading eyebrow="About Me" title="Who" highlight="I Am" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
        {/* Left: photo + tags + highlights */}
        <Reveal x={-30} y={0} className="flex justify-center lg:justify-start">
          <div className="w-72 sm:w-80">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-(--accent)/20 blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img src={profilePic} alt="Aswin S" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="absolute -top-4 right-4 bg-[#131318] border border-white/10 px-4 py-2 text-xs sm:text-sm rounded-full shadow-lg">
                🐍 Python Dev
              </div>
              <div className="absolute -bottom-4 left-4 bg-[#131318] border border-white/10 px-4 py-2 text-xs sm:text-sm rounded-full shadow-lg">
                🎓 MCA Graduate
              </div>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-3 mt-12">
              {highlights.map((h, i) => (
                <Reveal key={h.label} delay={0.1 + i * 0.08}>
                  <StatBox {...h} active={statsInView} delay={i * 200} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: bio + details */}
        <div>
          <Reveal>
            <h3 className="text-2xl sm:text-3xl font-orbitron font-bold mb-4 tracking-wide">
              Passionate Python Developer
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I'm Aswin, a dedicated Python Developer with a Master of Computer Applications (MCA)
              degree. I specialize in building efficient, scalable, and user-focused software
              solutions that solve real-world problems.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              With a strong foundation in programming principles, data structures, and database
              management, I develop web applications, automation scripts, and backend systems
              using Python and related technologies — and I'm always looking to learn more.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              {details.map((d, i) => (
                <div key={i} className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-500 text-sm">{d.label}</span>
                  <span className="text-white text-sm font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={resume}
                download="ASWIN_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold
                bg-(--accent) hover:bg-(--accent-dark) hover:scale-105 transition shadow-lg shadow-(--accent)/30"
              >
                <FileText size={18} /> Download CV
              </a>
              {["Problem Solver", "Team Player", "Fast Learner"].map((skill, i) => (
                <span key={i} className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

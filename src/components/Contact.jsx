import React, { useEffect, useState, useRef } from "react";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiPhone,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [stars, setStars] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const mouse = useRef({ x: 0, y: 0 });
  const formRef = useRef(null);
  const cardRefs = useRef([]);

  // ===== Neon Stars Background =====
  useEffect(() => {
    const starArray = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
      depth: Math.random() * 0.5 + 0.2,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((s) => {
          let newX = s.x + s.speed * 1.5;
          let newY = s.y + s.speed;
          if (newX > window.innerWidth) newX = 0;
          if (newY > window.innerHeight) newY = 0;
          return { ...s, x: newX, y: newY };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ===== Send Message =====
  const handleSendMessage = (e) => {
    e.preventDefault();
    setStatusMessage("");

    emailjs
      .sendForm(
        "service_uoxrd3o",
        "template_3t1widc",
        formRef.current,
        "_vcukmTXsEj1iYsyj"
      )
      .then(
        () => {
          setStatusMessage(
            "✅ Message sent successfully! I will reach you soon."
          );
          setStatusColor("text-green-400");
          formRef.current.reset();
          setTimeout(() => setStatusMessage(""), 5000);
        },
        () => {
          setStatusMessage("❌ Failed to send message. Please try again.");
          setStatusColor("text-red-400");
          setTimeout(() => setStatusMessage(""), 5000);
        }
      );
  };

  // ===== Scroll Fade-In for Cards =====
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index || 0;
            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen relative text-white px-6 py-16 overflow-hidden"
      style={{ scrollMarginTop: "-10px" }}
    >
      {/* Neon Stars */}
      {stars.map((star, idx) => {
        const offsetX =
          (mouse.current.x - window.innerWidth / 2) * star.depth * 0.02;
        const offsetY =
          (mouse.current.y - window.innerHeight / 2) * star.depth * 0.02;

        return (
          <div
            key={idx}
            style={{
              width: star.size,
              height: star.size,
              top: star.y + offsetY,
              left: star.x + offsetX,
              backgroundColor: star.color,
              boxShadow: `0 0 6px ${star.color}, 0 0 12px ${star.color}`,
            }}
            className="absolute rounded-full opacity-70 animate-pulse"
          />
        );
      })}

      {/* Heading */}
      <div
        ref={(el) => (cardRefs.current[0] = el)}
        data-index={0}
        className="text-center mb-14 relative z-10 opacity-0 transform translate-y-12 transition-all duration-700"
         
      >
        <span className="px-4 py-1 bg-[#1c1c3a] text-2xl rounded-full text-purple-400 animate-pulse" >
          Contact
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-8">
          Let's <span className="text-purple-500">Connect</span>
        </h2>
        <p className="text-gray-400 mt-3 text-sm">
          Interested in collaboration or just want to say hi?
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Connect */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          data-index={1}
          className="opacity-0 transform translate-y-12 transition-all duration-700"
        >
          <h3 className="text-xl font-semibold mb-5">Connect With Me</h3>
          <p className="text-gray-400 mb-6 text-sm">Find me on these platforms.</p>

          <div className="flex flex-col gap-5">
            {[
              {
                icon: <FiGithub />,
                label: "GitHub",
                color: "bg-blue-600",
                href: "https://github.com/aswin-stark",
              },
              {
                icon: <FiLinkedin />,
                label: "LinkedIn",
                color: "bg-blue-500",
                href: "https://www.linkedin.com/in/aswin-s-b74136210/",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#151530] p-5 rounded-[1.75rem] flex items-center gap-4 shadow-xl transition-transform transform hover:scale-105"
              >
                <div
                  className={`${social.color} p-3 rounded-xl flex items-center justify-center`}
                >
                  {social.icon}
                </div>
                <div>
                  <p className="text-white text-2xl">{social.label}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          data-index={2}
          className="opacity-0 transform translate-y-12 transition-all duration-700"
        >
          <h3 className="text-xl font-semibold mb-5">Send a Message</h3>
          <div className="bg-[#151530] p-6 rounded-[1.75rem] shadow-xl">
            <form ref={formRef} onSubmit={handleSendMessage} className="space-y-4">
              {[
                { name: "user_name", placeholder: "Your Name" },
                { name: "user_phone", placeholder: "Phone Number" },
                { name: "email", placeholder: "Your Email", type: "email" },
              ].map((field, i) => (
                <input
                  key={i}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="bg-[#1f1f3f] p-3 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-600"
                />
              ))}

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="bg-[#1f1f3f] p-3 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-600"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 shadow-lg transition-transform transform hover:scale-105 active:scale-95"
              >
                <FiSend /> Send Message
              </button>

              {statusMessage && (
                <p className={`text-center text-sm mt-3 ${statusColor}`}>
                  {statusMessage}
                </p>
              )}
            </form>

            <p className="mt-6 italic text-gray-400 text-center text-sm">
              "Work hard in silence, let your success make the noise."
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div
          ref={(el) => (cardRefs.current[3] = el)}
          data-index={3}
          className="opacity-0 transform translate-y-12 transition-all duration-700"
        >
          <h3 className="text-xl font-semibold mb-5">Contact Me</h3>
          <p className="text-gray-400 mb-6 text-sm">Reach me directly.</p>

          <div className="flex flex-col gap-5">
            {[
              {
                icon: <FiMail />,
                label: "Email",
                value: "ajayaswin521@gmail.com",
                color: "bg-purple-600",
                href: "mailto:ajayaswin521@gmail.com",
              },
              {
                icon: <FiPhone />,
                label: "Phone",
                value: "+91 8144721458",
                color: "bg-green-500",
                href: "tel:+918144721458",
              },
              {
                icon: <FiMapPin />,
                label: "Address",
                value: "Chennai, India",
                color: "bg-pink-500",
              },
            ].map((info, idx) =>
              info.href ? (
                <a
                  key={idx}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1f1f3f] p-5 rounded-[1.75rem] flex items-center gap-4 shadow-xl transition-transform transform hover:scale-105"
                >
                  <div
                    className={`${info.color} p-3 rounded-xl flex items-center justify-center`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{info.label}</p>
                    <p className="text-white text-sm font-semibold">{info.value}</p>
                  </div>
                </a>
              ) : (
                <div
                  key={idx}
                  className="bg-[#1f1f3f] p-5 rounded-[1.75rem] flex items-center gap-4 shadow-xl transition-transform transform hover:scale-105"
                >
                  <div
                    className={`${info.color} p-3 rounded-xl flex items-center justify-center`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{info.label}</p>
                    <p className="text-white text-sm font-semibold">{info.value}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ===== CSS for fade-in ===== */}
      <style>{`
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0px) !important;
        }
      `}</style>
    </section>
  );
}
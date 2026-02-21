import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [stars, setStars] = useState([]);
  const [statusMessage, setStatusMessage] = useState(""); // ✅ success/error message
  const [statusColor, setStatusColor] = useState(""); // ✅ color for message
  const mouse = useRef({ x: 0, y: 0 });
  const formRef = useRef(null);

  // ===== Neon Stars Background =====
  useEffect(() => {
    const starArray = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
      depth: Math.random() * 0.5 + 0.2,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((s) => {
          let newX = s.x + s.speed * 2;
          let newY = s.y + s.speed * 1.2;
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

  // ===== Handle Send Message =====
const handleSendMessage = (e) => {
  e.preventDefault();
  setStatusMessage(""); // clear previous message

  emailjs
    .sendForm(
      "service_uoxrd3o",      // Your EmailJS Service ID
      "template_3t1widc",     // Your EmailJS Template ID
      formRef.current,
      "_vcukmTXsEj1iYsyj"    // Your EmailJS Public Key
    )
    .then(
      (result) => {
        setStatusMessage("✅ Message sent successfully! I will reach you soon. Thank you for your patience.");
        setStatusColor("text-green-400");
        formRef.current.reset();

        // ✅ Hide the message after 5 seconds
        setTimeout(() => {
          setStatusMessage("");
        }, 5000);
      },
      (error) => {
        setStatusMessage("❌ Failed to send message. Please try again.");
        setStatusColor("text-red-400");

        // Optional: Hide error after 5 seconds
        setTimeout(() => {
          setStatusMessage("");
        }, 5000);

        console.error(error.text);
      }
    );
};

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0b0b1f] via-[#140a34] to-[#070714] text-white px-6 py-20 overflow-hidden">
      
      {/* Neon Stars */}
      {stars.map((star, idx) => {
        const offsetX = (mouse.current.x - window.innerWidth / 2) * star.depth * 0.02;
        const offsetY = (mouse.current.y - window.innerHeight / 2) * star.depth * 0.02;
        return (
          <div
            key={idx}
            style={{
              width: star.size,
              height: star.size,
              top: star.y + offsetY,
              left: star.x + offsetX,
              backgroundColor: star.color,
              boxShadow: `0 0 8px ${star.color}, 0 0 16px ${star.color}`,
            }}
            className="absolute rounded-full opacity-70 animate-pulse"
          />
        );
      })}

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <span className="px-4 py-1 bg-[#1c1c3a] text-sm rounded-full text-purple-400 animate-pulse">
          Contact
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">
          Let's <span className="text-purple-500">Connect</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Interested in collaboration or just want to say hi? Reach out below!
        </p>
      </motion.div>

      {/* 3 Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

        {/* ===== Connect With Me ===== */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
          <p className="text-gray-400 mb-8">
            Find me on these platforms and let's network.
          </p>
          <div className="flex flex-col gap-6">
            {[ 
              { icon: <FiGithub />, label: "GitHub", value: "github.com/aswin-stark", color: "bg-blue-600", href: "https://github.com/aswin-stark" },
              { icon: <FiLinkedin />, label: "LinkedIn", value: "linkedin.com/in/aswin-stark", color: "bg-blue-500", href: "https://www.linkedin.com/in/aswin-s-b74136210/" }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${social.color}, 0 0 30px ${social.color}` }}
                className="relative bg-[#151530] p-6 rounded-[2rem] flex items-center gap-4 cursor-pointer overflow-hidden shadow-2xl transition"
              >
                <div className={`${social.color} p-4 rounded-2xl flex items-center justify-center`}>
                  {social.icon}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{social.label}</p>
                  <p className="text-white font-semibold">{social.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ===== Contact Me ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-2xl font-semibold mb-6">Contact Me</h3>
          <p className="text-gray-400 mb-8">
            Reach me via email, phone, or visit my location.
          </p>
          <div className="flex flex-col gap-6">
            {[
              { icon: <FiMail />, label: "Email", value: "ajayaswin521@gmail.com", color: "bg-purple-600" },
              { icon: <FiPhone />, label: "Phone", value: "+91 8144721458", color: "bg-green-500" },
              { icon: <FiMapPin />, label: "Address", value: "Chennai, Tamil Nadu, India", color: "bg-pink-500" }
            ].map((info, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="relative bg-[#1f1f3f] p-6 rounded-[2rem] flex items-center gap-4 cursor-default overflow-hidden shadow-2xl"
              >
                <div className={`${info.color} p-4 rounded-2xl flex items-center justify-center`}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{info.label}</p>
                  <p className="text-white font-semibold">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== Send Message Form + Status ===== */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex flex-col gap-6"
        >
          <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
          <motion.div className="relative bg-[#151530] p-8 rounded-[2rem] shadow-2xl overflow-hidden">
            {/* Neon Sparkles */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 blur-lg rounded-full opacity-30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                ></div>
              ))}
            </motion.div>

            <form ref={formRef} onSubmit={handleSendMessage} className="relative space-y-6 z-10">
              <input type="text" name="user_name" placeholder="Your Name" className="bg-[#1f1f3f] p-4 rounded-xl w-full outline-none focus:ring-2 focus:ring-purple-600" />
              <input type="text" name="user_country" placeholder="Your Country" className="bg-[#1f1f3f] p-4 rounded-xl w-full outline-none focus:ring-2 focus:ring-purple-600" />
              <input type="text" name="user_phone" placeholder="Your Phone Number" className="bg-[#1f1f3f] p-4 rounded-xl w-full outline-none focus:ring-2 focus:ring-purple-600" />
              <input type="email" name="email" placeholder="Your Email" className="bg-[#1f1f3f] p-4 rounded-xl w-full outline-none focus:ring-2 focus:ring-purple-600" />
              <textarea name="message" rows="5" placeholder="Your Message" className="bg-[#1f1f3f] p-4 rounded-xl w-full outline-none focus:ring-2 focus:ring-purple-600"></textarea>
              
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-semibold flex justify-center items-center gap-2 shadow-lg">
                <FiSend /> Send Message
              </motion.button>

              {/* ✅ Inline status message */}
              {statusMessage && (
                <p className={`mt-4 text-center font-medium ${statusColor}`}>
                  {statusMessage}
                </p>
              )}
            </form>

            {/* Work-Life Quote */}
            <motion.p className="mt-8 italic text-gray-400 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              "Work hard in silence, let your success make the noise."
            </motion.p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
import { useState, useRef } from "react";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiPhone,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const formRef = useRef(null);

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
          setStatusMessage("✅ Message sent successfully! I will reach you soon.");
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

  return (
    <section id="contact" className="relative text-white px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's"
        highlight="Connect"
        subtitle="Interested in collaboration or just want to say hi? I'd love to hear from you."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Connect */}
        <Reveal>
          <h3 className="text-xl font-semibold mb-5">Connect With Me</h3>
          <p className="text-gray-400 mb-6 text-sm">Find me on these platforms.</p>

          <div className="flex flex-col gap-4">
            {[
              { icon: <FiGithub />, label: "GitHub", href: "https://github.com/aswin-stark" },
              { icon: <FiLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/aswin-s-b74136210/" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4
                hover:border-(--accent)/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-(--accent)/15 text-(--accent) p-3 rounded-xl flex items-center justify-center text-xl">
                  {social.icon}
                </div>
                <p className="text-white text-lg">{social.label}</p>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <h3 className="text-xl font-semibold mb-5">Send a Message</h3>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
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
                  className="bg-white/5 border border-white/10 p-3 rounded-lg w-full text-sm outline-none
                  focus:ring-2 focus:ring-(--accent) focus:border-(--accent) transition"
                />
              ))}

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="bg-white/5 border border-white/10 p-3 rounded-lg w-full text-sm outline-none
                focus:ring-2 focus:ring-(--accent) focus:border-(--accent) transition"
              />

              <button
                type="submit"
                className="w-full bg-(--accent) hover:bg-(--accent-dark) py-3 rounded-xl font-semibold
                flex justify-center items-center gap-2 shadow-lg shadow-(--accent)/30 transition-transform hover:scale-105 active:scale-95"
              >
                <FiSend /> Send Message
              </button>

              {statusMessage && (
                <p className={`text-center text-sm mt-3 ${statusColor}`}>{statusMessage}</p>
              )}
            </form>
          </div>
        </Reveal>

        {/* Contact Info */}
        <Reveal delay={0.2}>
          <h3 className="text-xl font-semibold mb-5">Contact Me</h3>
          <p className="text-gray-400 mb-6 text-sm">Reach me directly.</p>

          <div className="flex flex-col gap-4">
            {[
              { icon: <FiMail />, label: "Email", value: "ajayaswin521@gmail.com", href: "mailto:ajayaswin521@gmail.com" },
              { icon: <FiPhone />, label: "Phone", value: "+91 8144721458", href: "tel:+918144721458" },
              { icon: <FiMapPin />, label: "Address", value: "Chennai, India" },
            ].map((info, idx) => {
              const Wrapper = info.href ? "a" : "div";
              return (
                <Wrapper
                  key={idx}
                  href={info.href}
                  target={info.href ? "_blank" : undefined}
                  rel={info.href ? "noopener noreferrer" : undefined}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4
                  hover:border-(--accent)/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-(--accent)/15 text-(--accent) p-3 rounded-xl flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{info.label}</p>
                    <p className="text-white text-sm font-semibold">{info.value}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import emailjsBrowser from "@emailjs/browser";
import { profile, emailjs as emailjsConfig } from "../data/profile.js";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const fields = [
  { name: "user_name", label: "Your Name", type: "text", autoComplete: "name" },
  { name: "user_phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Your Email", type: "email", autoComplete: "email" },
];

const socialLinks = [
  { icon: <FiGithub />, label: "GitHub", href: profile.github },
  { icon: <FiLinkedin />, label: "LinkedIn", href: profile.linkedin },
];

const contactInfo = [
  { icon: <FiMail />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: <FiPhone />, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { icon: <FiMapPin />, label: "Address", value: profile.location },
];

export default function Contact() {
  const [status, setStatus] = useState(null); // { message, tone }
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setStatus(null);

    emailjsBrowser
      .sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      )
      .then(
        () => {
          setStatus({ message: "Message sent. I'll get back to you soon.", tone: "ok" });
          formRef.current.reset();
          setTimeout(() => setStatus(null), 6000);
        },
        () => {
          setStatus({ message: "Failed to send. Please try again or email me directly.", tone: "err" });
          setTimeout(() => setStatus(null), 6000);
        }
      )
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" className="section-shell overflow-hidden">
      <span className="watermark absolute left-1/2 top-12 -translate-x-1/2 text-[15vw]" aria-hidden>
        Let&apos;s Talk
      </span>

      <div className="shell relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's"
          highlight="Connect"
          subtitle="Interested in collaboration or just want to say hi? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Connect */}
          <Reveal>
            <h3 className="mb-2 text-lg">Connect With Me</h3>
            <p className="mb-7 text-sm text-mute">Find me on these platforms.</p>

            <div className="flex flex-col gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-card border border-hair bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                >
                  <span className="flex items-center justify-center rounded-xl bg-accent/12 p-3 text-lg text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    {s.icon}
                  </span>
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <h3 className="mb-2 text-lg">Send a Message</h3>
            <p className="mb-7 text-sm text-mute">I usually reply within a day.</p>

            <form ref={formRef} onSubmit={handleSendMessage} className="space-y-6" noValidate={false}>
              {fields.map((f) => (
                <div key={f.name} className="relative">
                  <label htmlFor={f.name} className="sr-only">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    placeholder={f.label}
                    required
                    className="peer w-full border-0 border-b border-hair bg-transparent px-1 pb-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-transparent"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
                  />
                </div>
              ))}

              <div className="relative">
                <label htmlFor="message" className="sr-only">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="peer w-full resize-none border-0 border-b border-hair bg-transparent px-1 pb-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-transparent"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2.5 rounded-pill bg-accent py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-accent-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSend /> {sending ? "Sending…" : "Send Message"}
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`min-h-5 text-center text-sm ${
                  status?.tone === "ok" ? "text-emerald-400" : "text-accent"
                }`}
              >
                {status?.message ?? ""}
              </p>
            </form>
          </Reveal>

          {/* Direct info */}
          <Reveal delay={0.2}>
            <h3 className="mb-2 text-lg">Contact Me</h3>
            <p className="mb-7 text-sm text-mute">Reach me directly.</p>

            <div className="flex flex-col gap-4">
              {contactInfo.map((info) => {
                const Wrapper = info.href ? "a" : "div";
                return (
                  <Wrapper
                    key={info.label}
                    href={info.href}
                    className="group flex items-center gap-4 rounded-card border border-hair bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                  >
                    <span className="flex items-center justify-center rounded-xl bg-accent/12 p-3 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      {info.icon}
                    </span>
                    <span>
                      <span className="block font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                        {info.label}
                      </span>
                      <span className="block text-sm font-semibold text-white">{info.value}</span>
                    </span>
                  </Wrapper>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

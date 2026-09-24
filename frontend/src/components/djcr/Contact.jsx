import { useState } from "react";
import axios from "axios";
import { Mail, Phone, MessageCircle, Facebook, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CHANNELS = [
    {
        icon: Mail,
        label: "Email",
        value: "admin@djcraleigh.org",
        href: "mailto:admin@djcraleigh.org",
        id: "email",
    },
    { icon: Phone, label: "Phone", value: "To be announced", id: "phone" },
    { icon: MessageCircle, label: "WhatsApp", value: "Community group — link coming soon", id: "whatsapp" },
    { icon: Facebook, label: "Facebook", value: "To be announced", id: "facebook" },
    { icon: Instagram, label: "Instagram", value: "To be announced", id: "instagram" },
    { icon: Youtube, label: "YouTube", value: "To be announced", id: "youtube" },
];

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
    const [form, setForm] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`${API}/contact`, form);
            toast.success("Jai Jinendra! Your message has been received.", {
                description: "The DJCR team will respond as soon as possible.",
            });
            setForm(EMPTY);
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const field =
        "w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-3 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20 transition-shadow";

    return (
        <section id="contact" data-testid="contact-section" className="py-20 md:py-32 jali-bg">
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <SectionHeading
                    chapter="07"
                    eyebrow="Contact"
                    title="Connect With DJCR"
                    subtitle="Serving the Digambar Jain community of Raleigh, Cary, Morrisville, Durham, Chapel Hill, and the greater Research Triangle of North Carolina."
                />
                <div className="mt-14 grid lg:grid-cols-5 gap-10 lg:gap-14">
                    <Reveal className="lg:col-span-2">
                        <div className="rounded-2xl bg-[#6F1D1B] p-8 lg:p-10 h-full relative overflow-hidden">
                            <div className="absolute inset-0 jali-bg-light pointer-events-none" />
                            <div className="relative">
                                <p className="font-devanagari text-[#C99A30] text-2xl">
                                    अहिंसा परमो धर्मः
                                </p>
                                <p className="mt-5 text-[#FFF9ED]/75 text-sm leading-relaxed">
                                    We would love to hear from you — whether you are new to the
                                    Research Triangle, looking for a Jain community, or wish to be
                                    part of the temple journey.
                                </p>
                                <ul className="mt-8 space-y-5">
                                    {CHANNELS.map((c) => (
                                        <li
                                            key={c.id}
                                            data-testid={`contact-channel-${c.id}`}
                                            className="flex items-center gap-4"
                                        >
                                            <span className="w-10 h-10 rounded-full border border-[#C99A30]/40 flex items-center justify-center text-[#C99A30] shrink-0">
                                                <c.icon size={17} strokeWidth={1.5} />
                                            </span>
                                            <span>
                                                <span className="block text-xs uppercase tracking-[0.2em] text-[#C99A30]">
                                                    {c.label}
                                                </span>
                                                {c.href ? (
                                                    <a
                                                        href={c.href}
                                                        data-testid={`contact-channel-${c.id}-link`}
                                                        className="block text-sm text-[#FFF9ED] mt-0.5 hover:text-[#C99A30] transition-colors duration-300 underline-offset-4 hover:underline"
                                                    >
                                                        {c.value}
                                                    </a>
                                                ) : (
                                                    <span className="block text-sm text-[#FFF9ED]/70 mt-0.5">
                                                        {c.value}
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.15} className="lg:col-span-3">
                        <form
                            data-testid="contact-form"
                            onSubmit={submit}
                            className="rounded-2xl bg-[#FFFDF7] border border-[#6F1D1B]/10 p-8 lg:p-10 shadow-[0_30px_60px_-35px_rgba(111,29,27,0.3)]"
                        >
                            <div className="grid sm:grid-cols-2 gap-5">
                                <input
                                    data-testid="contact-name"
                                    required
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className={field}
                                />
                                <input
                                    data-testid="contact-email"
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className={field}
                                />
                                <input
                                    data-testid="contact-phone"
                                    placeholder="Phone"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className={field}
                                />
                                <input
                                    data-testid="contact-subject"
                                    required
                                    placeholder="Subject"
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    className={field}
                                />
                            </div>
                            <textarea
                                data-testid="contact-message"
                                required
                                rows="5"
                                placeholder="Message"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className={`${field} mt-5`}
                            />
                            <button
                                data-testid="contact-submit"
                                type="submit"
                                disabled={submitting}
                                className="btn-shimmer mt-7 rounded-full bg-[#6F1D1B] text-[#FFF9ED] px-10 py-3.5 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300 disabled:opacity-60 w-full sm:w-auto"
                            >
                                {submitting ? "Sending…" : "Send Message"}
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

import { useState } from "react";
import axios from "axios";
import { Users, HeartHandshake, Landmark, BellRing, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ACTIONS = [
    {
        kind: "join",
        icon: Users,
        title: "Join Our Community",
        text: "Become part of the DJCR Sangh and stay connected with families across the Research Triangle.",
        cta: "Join the Sangh",
    },
    {
        kind: "volunteer",
        icon: HeartHandshake,
        title: "Volunteer",
        text: "Offer your seva — help with events, pathshala, communications, and community activities.",
        cta: "Volunteer Seva",
    },
    {
        kind: "support",
        icon: Landmark,
        title: "Support the Temple Vision",
        text: "Walk with us on the journey from vision to Pratishtha. Every expression of support matters.",
        cta: "Support the Vision",
    },
    {
        kind: "updates",
        icon: BellRing,
        title: "Receive Event Updates",
        text: "Get announcements for parvs, swadhyay, vidhan, pathshala, and community gatherings.",
        cta: "Subscribe for Updates",
    },
    {
        kind: "whatsapp",
        icon: MessageCircle,
        title: "Join WhatsApp Community",
        text: "Connect with the Sangh on WhatsApp for day-to-day updates and coordination.",
        cta: "Request WhatsApp Invite",
    },
];

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function GetInvolved() {
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!selected) return;
        setSubmitting(true);
        try {
            await axios.post(`${API}/interest`, { kind: selected.kind, ...form });
            toast.success("Jai Jinendra! Thank you for stepping forward.", {
                description:
                    selected.kind === "whatsapp"
                        ? "The WhatsApp invite will be shared with you by email once the group link is published."
                        : "The DJCR team will reach out to you soon.",
            });
            setSelected(null);
            setForm(EMPTY);
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="get-involved"
            data-testid="get-involved-section"
            className="py-20 md:py-32 bg-[#F4EBD9]/60"
        >
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <SectionHeading
                    chapter="06"
                    eyebrow="Seva & Community"
                    title="Be Part of Our Journey"
                    subtitle="Building a permanent spiritual home requires the participation of the entire Sangh. However you can contribute — presence, seva, or support — you are welcome."
                />
                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ACTIONS.map((a, i) => (
                        <Reveal key={a.kind} delay={0.08 * (i % 3)}>
                            <div
                                data-testid={`involved-card-${a.kind}`}
                                className="group h-full flex flex-col rounded-2xl bg-[#FFFDF7] border border-[#6F1D1B]/10 p-7 hover:-translate-y-1.5 hover:border-[#C99A30]/50 hover:shadow-[0_30px_50px_-25px_rgba(111,29,27,0.25)] transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-full border border-[#C99A30]/40 flex items-center justify-center text-[#6F1D1B] group-hover:bg-[#6F1D1B] group-hover:text-[#C99A30] transition-colors duration-500">
                                    <a.icon size={22} strokeWidth={1.5} />
                                </div>
                                <h3 className="mt-5 font-display text-2xl text-[#6F1D1B]">{a.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#292929]/65 flex-1">
                                    {a.text}
                                </p>
                                <button
                                    data-testid={`involved-cta-${a.kind}`}
                                    onClick={() => setSelected(a)}
                                    className="mt-6 self-start rounded-full border border-[#6F1D1B]/30 text-[#6F1D1B] px-6 py-2.5 text-xs uppercase tracking-[0.16em] hover:bg-[#6F1D1B] hover:text-[#FFF9ED] transition-colors duration-300"
                                >
                                    {a.cta}
                                </button>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
                <DialogContent
                    data-testid="interest-dialog"
                    className="bg-[#FFFDF7] border-[#C99A30]/40 sm:max-w-md"
                >
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl text-[#6F1D1B]">
                            {selected?.title}
                        </DialogTitle>
                        <DialogDescription className="text-[#292929]/60">
                            Share your details and the DJCR team will connect with you.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4 mt-2">
                        <input
                            data-testid="interest-name"
                            required
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <input
                            data-testid="interest-email"
                            required
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <input
                            data-testid="interest-phone"
                            placeholder="Phone (optional)"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <textarea
                            data-testid="interest-message"
                            rows="3"
                            placeholder="Message (optional)"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <button
                            data-testid="interest-submit"
                            type="submit"
                            disabled={submitting}
                            className="btn-shimmer w-full rounded-full bg-[#6F1D1B] text-[#FFF9ED] py-3 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300 disabled:opacity-60"
                        >
                            {submitting ? "Submitting…" : "Submit"}
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
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

const EMPTY = { name: "", email: "", phone: "", guests: 1 };

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        axios
            .get(`${API}/events`)
            .then((res) => setEvents(res.data.events || []))
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!selected) return;
        setSubmitting(true);
        try {
            await axios.post(`${API}/events/register`, {
                event_id: selected.id,
                event_title: selected.title,
                ...form,
                guests: Number(form.guests) || 1,
            });
            toast.success("Jai Jinendra! Your registration has been received.", {
                description: `${selected.title} — details will be shared with the Sangh.`,
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
        <section id="events" data-testid="events-section" className="py-20 md:py-32 jali-bg">
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <SectionHeading
                    chapter="05"
                    eyebrow="Sangh Events"
                    title="Upcoming Events"
                    subtitle="Religious observances, spiritual learning, and community gatherings across the Research Triangle. Dates and venues are shared with the Sangh as they are confirmed."
                />
                <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading &&
                        [0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="h-72 rounded-2xl bg-[#FFFDF7] border border-[#6F1D1B]/10 animate-pulse"
                            />
                        ))}
                    {!loading &&
                        events.map((ev, i) => (
                            <Reveal key={ev.id} delay={0.08 * (i % 3)}>
                                <article
                                    data-testid={`event-card-${ev.id}`}
                                    className="group h-full flex flex-col rounded-2xl bg-[#FFFDF7] border border-[#6F1D1B]/10 p-7 hover:-translate-y-1.5 hover:border-[#C99A30]/50 hover:shadow-[0_30px_50px_-25px_rgba(111,29,27,0.25)] transition-all duration-500"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-[#6F1D1B]/5 border border-[#6F1D1B]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#6F1D1B]">
                                            {ev.category}
                                        </span>
                                        {ev.tentative && (
                                            <span className="text-[10px] uppercase tracking-[0.18em] text-[#C99A30]">
                                                Details to be confirmed
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="mt-5 font-display text-2xl text-[#6F1D1B]">{ev.title}</h3>
                                    <div className="mt-4 space-y-2 text-sm text-[#292929]/70">
                                        <p className="flex items-center gap-2.5">
                                            <CalendarDays size={15} className="text-[#C99A30] shrink-0" />
                                            {ev.date}
                                        </p>
                                        <p className="flex items-center gap-2.5">
                                            <Clock size={15} className="text-[#C99A30] shrink-0" />
                                            {ev.time}
                                        </p>
                                        <p className="flex items-center gap-2.5">
                                            <MapPin size={15} className="text-[#C99A30] shrink-0" />
                                            {ev.location}
                                        </p>
                                    </div>
                                    <p className="mt-4 text-sm leading-relaxed text-[#292929]/65 flex-1">
                                        {ev.description}
                                    </p>
                                    <button
                                        data-testid={`event-register-${ev.id}`}
                                        onClick={() => setSelected(ev)}
                                        className="mt-6 rounded-full border border-[#6F1D1B]/30 text-[#6F1D1B] px-6 py-2.5 text-xs uppercase tracking-[0.16em] hover:bg-[#6F1D1B] hover:text-[#FFF9ED] transition-colors duration-300"
                                    >
                                        Registration / Details
                                    </button>
                                </article>
                            </Reveal>
                        ))}
                    {!loading && events.length === 0 && (
                        <p className="col-span-full text-center text-[#292929]/60">
                            Events will be announced soon. Please check back or join our community
                            for updates.
                        </p>
                    )}
                </div>
            </div>

            <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
                <DialogContent
                    data-testid="event-registration-dialog"
                    className="bg-[#FFFDF7] border-[#C99A30]/40 sm:max-w-md"
                >
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl text-[#6F1D1B]">
                            {selected?.title}
                        </DialogTitle>
                        <DialogDescription className="text-[#292929]/60">
                            {selected?.date} · {selected?.time}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4 mt-2">
                        <input
                            data-testid="event-reg-name"
                            required
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <input
                            data-testid="event-reg-email"
                            required
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <input
                            data-testid="event-reg-phone"
                            placeholder="Phone (optional)"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <label className="flex items-center gap-3 text-sm text-[#292929]/70">
                            <Users size={16} className="text-[#C99A30]" />
                            Guests
                            <input
                                data-testid="event-reg-guests"
                                type="number"
                                min="1"
                                max="20"
                                value={form.guests}
                                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                                className="w-20 rounded-lg border border-[#6F1D1B]/20 bg-white px-3 py-2 text-sm outline-none focus:border-[#C99A30]"
                            />
                        </label>
                        <button
                            data-testid="event-reg-submit"
                            type="submit"
                            disabled={submitting}
                            className="btn-shimmer w-full rounded-full bg-[#6F1D1B] text-[#FFF9ED] py-3 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300 disabled:opacity-60"
                        >
                            {submitting ? "Submitting…" : "Register"}
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}

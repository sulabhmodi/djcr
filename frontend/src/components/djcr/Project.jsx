import { Check } from "lucide-react";
import Reveal from "./Reveal";
import ShikharArt from "./ShikharArt";

const MILESTONES = [
    {
        name: "Vision",
        status: "completed",
        note: "Vision defined and shared with the Sangh",
    },
    {
        name: "Planning",
        status: "in-progress",
        note: "All legal activities in progress",
    },
    {
        name: "Property",
        status: "in-progress",
        note: "Property search in progress",
    },
    { name: "Design", status: "upcoming", note: "Temple architecture & design" },
    { name: "Fundraising", status: "upcoming", note: "Sangh-wide fundraising" },
    { name: "Construction", status: "upcoming", note: "Temple construction" },
    { name: "Pratishtha", status: "upcoming", note: "Pratishtha Mahotsav" },
];

export default function Project() {
    return (
        <section id="project" data-testid="project-section" className="py-20 md:py-32 bg-[#F4EBD9]/60">
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    <div>
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.35em] font-mono text-[#C99A30]">
                                04 — Our Journey
                            </p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-[#6F1D1B]">
                                Our Journey Has Begun
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="mt-6 text-lg text-[#292929]/80 leading-relaxed">
                                The Digambar Jain community of the Research Triangle has begun the
                                sacred journey toward establishing a dedicated Digambar Jain Temple —
                                a permanent spiritual home for present and future generations.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="mt-5 text-base text-[#292929]/70 leading-relaxed">
                                This is an upcoming temple project, unfolding step by step with the
                                blessings of the Sangh. Our vision is complete, planning and legal
                                activities are underway, and the search for a suitable property has
                                begun. Every milestone below will be updated as our journey
                                progresses.
                            </p>
                        </Reveal>
                        <Reveal delay={0.4} className="mt-9 flex flex-col sm:flex-row gap-4">
                            <a
                                href="#project-timeline"
                                data-testid="project-timeline-cta"
                                className="btn-shimmer rounded-full bg-[#6F1D1B] text-[#FFF9ED] px-8 py-3.5 text-sm uppercase tracking-[0.16em] text-center hover:bg-[#521413] transition-colors duration-300"
                            >
                                Temple Project
                            </a>
                            <a
                                href="#get-involved"
                                data-testid="project-involved-cta"
                                className="rounded-full border border-[#6F1D1B]/35 text-[#6F1D1B] px-8 py-3.5 text-sm uppercase tracking-[0.16em] text-center hover:border-[#C99A30] hover:bg-[#C99A30]/10 transition-colors duration-300"
                            >
                                Get Involved
                            </a>
                        </Reveal>
                    </div>

                    <Reveal delay={0.2}>
                        <div className="relative rounded-2xl bg-[#FFFDF7] border border-[#C99A30]/35 p-8 sm:p-12 shadow-[0_30px_60px_-30px_rgba(111,29,27,0.3)] overflow-hidden">
                            <div className="absolute inset-0 jali-bg pointer-events-none" />
                            <ShikharArt className="relative w-full text-[#6F1D1B] opacity-80" />
                            <p
                                data-testid="project-concept-caption"
                                className="relative mt-6 text-center text-xs uppercase tracking-[0.22em] text-[#292929]/55"
                            >
                                Conceptual representation · Artist's impression of a traditional
                                Shikhar — not a constructed temple
                            </p>
                        </div>
                    </Reveal>
                </div>

                <div id="project-timeline" data-testid="project-timeline" className="mt-20">
                    <Reveal>
                        <div className="flex flex-wrap justify-center gap-x-0 gap-y-10">
                            {MILESTONES.map((m, i) => {
                                const done = m.status === "completed";
                                const active = m.status === "in-progress";
                                return (
                                    <div key={m.name} className="flex items-start">
                                        <div className="flex flex-col items-center w-28 sm:w-32">
                                            <div
                                                data-testid={`milestone-${m.name.toLowerCase()}`}
                                                className={`w-12 h-12 rounded-full flex items-center justify-center border font-mono text-sm transition-colors duration-500 ${
                                                    done
                                                        ? "bg-[#C99A30] border-[#C99A30] text-[#521413] shadow-[0_0_0_6px_rgba(201,154,48,0.15)]"
                                                        : active
                                                          ? "bg-[#E87524] border-[#E87524] text-[#FFF9ED] shadow-[0_0_0_6px_rgba(232,117,36,0.15)]"
                                                          : "bg-[#FFFDF7] border-[#6F1D1B]/20 text-[#6F1D1B]/60"
                                                }`}
                                            >
                                                {done ? (
                                                    <Check size={18} strokeWidth={2.5} />
                                                ) : (
                                                    String(i + 1).padStart(2, "0")
                                                )}
                                            </div>
                                            <p
                                                className={`mt-3 text-xs uppercase tracking-[0.14em] text-center ${
                                                    done || active
                                                        ? "text-[#6F1D1B] font-semibold"
                                                        : "text-[#292929]/55"
                                                }`}
                                            >
                                                {m.name}
                                            </p>
                                            <p
                                                className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${
                                                    done
                                                        ? "text-[#C99A30]"
                                                        : active
                                                          ? "text-[#E87524]"
                                                          : "text-[#292929]/35"
                                                }`}
                                            >
                                                {done ? "Completed" : active ? "In Progress" : "Upcoming"}
                                            </p>
                                            {m.note && (
                                                <p className="mt-1.5 text-[11px] text-center text-[#292929]/55 leading-snug px-1">
                                                    {m.note}
                                                </p>
                                            )}
                                        </div>
                                        {i < MILESTONES.length - 1 && (
                                            <span className="hidden sm:block h-px w-4 lg:w-6 bg-[#6F1D1B]/20 mt-6" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

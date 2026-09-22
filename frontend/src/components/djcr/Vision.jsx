import { Landmark, BookOpen, GraduationCap, Users } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const PILLARS = [
    {
        num: "01",
        icon: Landmark,
        title: "Jin Mandir",
        devanagari: "जिन मंदिर",
        text: "A sacred environment for Jinendra Darshan, Abhishek, Puja, and spiritual practice.",
    },
    {
        num: "02",
        icon: BookOpen,
        title: "Swadhyay",
        devanagari: "स्वाध्याय",
        text: "A place to study Jain scriptures, philosophy, and the teachings of Tirthankaras.",
    },
    {
        num: "03",
        icon: GraduationCap,
        title: "Pathshala",
        devanagari: "पाठशाला",
        text: "Helping children and future generations understand and practice Jain Dharma.",
    },
    {
        num: "04",
        icon: Users,
        title: "Community",
        devanagari: "संगठन",
        text: "Bringing the Sangh together for religious observances, spiritual learning, and community activities.",
    },
];

export default function Vision() {
    return (
        <section
            id="vision"
            data-testid="vision-section"
            className="relative py-20 md:py-32 bg-[#6F1D1B] overflow-hidden"
        >
            <div className="absolute inset-0 jali-bg-light pointer-events-none" />
            <div className="relative px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <SectionHeading
                    dark
                    chapter="02"
                    eyebrow="Sacred Pillars"
                    title="Our Temple Vision"
                    subtitle="Building a Spiritual Home for Generations to Come — the Digambar Jain community of the Research Triangle is beginning the journey toward a permanent temple and spiritual center."
                />
                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PILLARS.map((p, i) => (
                        <Reveal key={p.num} delay={0.12 * i}>
                            <div
                                data-testid={`vision-pillar-${p.num}`}
                                className="group h-full rounded-2xl border border-[#C99A30]/25 bg-[#FFF9ED]/[0.04] backdrop-blur-sm p-7 hover:border-[#C99A30]/60 hover:-translate-y-1.5 hover:bg-[#FFF9ED]/[0.07] transition-all duration-500"
                            >
                                <div className="flex items-center justify-between">
                                    <p.icon
                                        className="text-[#C99A30] group-hover:text-[#E87524] transition-colors duration-500"
                                        size={30}
                                        strokeWidth={1.5}
                                    />
                                    <span className="font-mono text-xs tracking-[0.3em] text-[#C99A30]/70">
                                        {p.num}
                                    </span>
                                </div>
                                <h3 className="mt-6 font-display text-2xl text-[#FFF9ED]">{p.title}</h3>
                                <p className="mt-1 font-devanagari text-[#C99A30] text-lg">{p.devanagari}</p>
                                <p className="mt-4 text-sm leading-relaxed text-[#FFF9ED]/65">{p.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.3} className="mt-12 text-center">
                    <a
                        href="#project"
                        data-testid="vision-project-cta"
                        className="btn-shimmer inline-block rounded-full bg-[#C99A30] text-[#521413] px-9 py-3.5 text-sm uppercase tracking-[0.16em] font-semibold hover:bg-[#E87524] hover:text-[#FFF9ED] transition-colors duration-300"
                    >
                        Learn About Our Temple Project
                    </a>
                </Reveal>
            </div>
        </section>
    );
}

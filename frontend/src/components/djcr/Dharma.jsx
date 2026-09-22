import { Hand, Layers, Feather } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const PRINCIPLES = [
    {
        icon: Hand,
        devanagari: "अहिंसा",
        name: "Ahimsa",
        text: "Non-violence and compassion toward all living beings — in thought, word, and deed.",
    },
    {
        icon: Layers,
        devanagari: "अनेकान्तवाद",
        name: "Anekantavada",
        text: "Understanding truth through multiple perspectives, with humility and respect for every viewpoint.",
    },
    {
        icon: Feather,
        devanagari: "अपरिग्रह",
        name: "Aparigraha",
        text: "Non-attachment — limiting possessions and desires to live with simplicity and inner freedom.",
    },
];

export default function Dharma() {
    return (
        <section id="dharma" data-testid="dharma-section" className="py-20 md:py-32 jali-bg">
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <SectionHeading
                    chapter="03"
                    eyebrow="Jain Dharma"
                    title="Eternal Principles"
                    subtitle="The timeless foundations of Jain Dharma, taught by the Tirthankaras and lived by the Sangh every day."
                />
                <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
                    {PRINCIPLES.map((p, i) => (
                        <Reveal key={p.name} delay={0.12 * i}>
                            <div
                                data-testid={`dharma-card-${p.name.toLowerCase()}`}
                                className="group relative h-full rounded-2xl bg-[#FFFDF7] border border-[#6F1D1B]/10 p-8 lg:p-10 text-center overflow-hidden hover:-translate-y-1.5 hover:border-[#C99A30]/50 hover:shadow-[0_30px_50px_-25px_rgba(111,29,27,0.25)] transition-all duration-500"
                            >
                                <span className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C99A30] to-transparent opacity-60" />
                                <div className="mx-auto w-14 h-14 rounded-full border border-[#C99A30]/40 flex items-center justify-center text-[#6F1D1B] group-hover:bg-[#6F1D1B] group-hover:text-[#C99A30] transition-colors duration-500">
                                    <p.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="mt-7 font-devanagari text-3xl lg:text-4xl text-[#6F1D1B]">
                                    {p.devanagari}
                                </h3>
                                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#C99A30] font-medium">
                                    {p.name}
                                </p>
                                <p className="mt-5 text-sm leading-relaxed text-[#292929]/70">{p.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

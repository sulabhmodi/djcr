import Reveal from "./Reveal";

const SACRED = [
    "Jinendra Darshan",
    "Abhishek",
    "Puja",
    "Swadhyay",
    "Pathshala",
    "Vidhan",
    "Religious Celebrations",
    "Community",
];

export default function Welcome() {
    return (
        <section id="about" data-testid="welcome-section" className="py-20 md:py-32 jali-bg">
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                <div>
                    <Reveal>
                        <p className="text-xs uppercase tracking-[0.35em] font-mono text-[#C99A30]">
                            01 — Welcome
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-[#6F1D1B]">
                            Jai Jinendra
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="mt-6 text-lg md:text-xl text-[#292929]/80 leading-relaxed">
                            Digambar Jain Center of Raleigh is a growing spiritual community devoted
                            to preserving and practicing the principles, traditions, and teachings
                            of Digambar Jain Dharma.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="mt-5 text-base text-[#292929]/70 leading-relaxed">
                            Together, we are working toward establishing a permanent Digambar Jain
                            Temple in the Raleigh–RTP area — a sacred home for our Sangh today and
                            for generations to come.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <p className="mt-8 text-xs uppercase tracking-[0.25em] text-[#6F1D1B]/60">
                            The future temple will provide a sacred place for
                        </p>
                        <div data-testid="sacred-activities" className="mt-4 flex flex-wrap gap-2.5">
                            {SACRED.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-[#C99A30]/40 bg-[#FFFDF7] px-4 py-1.5 text-sm text-[#6F1D1B] hover:border-[#C99A30] hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.2} className="relative">
                    <div className="relative mx-auto max-w-md">
                        <div className="absolute -inset-3 rounded-t-[999px] rounded-b-2xl border border-[#C99A30]/50 translate-x-4 translate-y-4 pointer-events-none" />
                        <div className="relative overflow-hidden rounded-t-[999px] rounded-b-2xl border border-[#C99A30]/40 shadow-[0_30px_60px_-25px_rgba(111,29,27,0.35)]">
                            <img
                                src="https://images.pexels.com/photos/35341456/pexels-photo-35341456.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700"
                                alt="Intricate temple stone carvings — inspiration for the upcoming Digambar Jain Temple in Raleigh"
                                data-testid="welcome-arch-image"
                                className="w-full h-[420px] sm:h-[520px] object-cover hover:scale-[1.03] transition-transform duration-[1.6s] ease-out"
                                loading="lazy"
                            />
                        </div>
                        <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-[#292929]/50">
                            Architectural inspiration · Temple carving detail
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

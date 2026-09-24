import { HandCoins } from "lucide-react";
import Reveal from "./Reveal";

const DONATE_MAILTO =
    "mailto:admin@djcraleigh.org?subject=Donation%20Inquiry%20-%20Digambar%20Jain%20Center%20of%20Raleigh";

export default function Donate() {
    return (
        <section
            id="donate"
            data-testid="donate-section"
            className="relative py-20 md:py-32 bg-[#6F1D1B] overflow-hidden"
        >
            <div className="absolute inset-0 jali-bg-light pointer-events-none" />
            <div className="relative px-4 sm:px-8 lg:px-16 max-w-3xl mx-auto text-center">
                <Reveal>
                    <p className="text-xs uppercase tracking-[0.35em] font-mono text-[#C99A30]">
                        07 — Support
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mt-8 mx-auto w-16 h-16 rounded-full border border-[#C99A30]/50 flex items-center justify-center text-[#C99A30]">
                        <HandCoins size={30} strokeWidth={1.5} />
                    </div>
                </Reveal>
                <Reveal delay={0.15}>
                    <h2 className="mt-8 font-display text-3xl sm:text-4xl lg:text-5xl text-[#FFF9ED]">
                        Support the Digambar Jain Center of Raleigh
                    </h2>
                </Reveal>
                <Reveal delay={0.25}>
                    <p className="mt-6 text-base md:text-lg leading-relaxed text-[#FFF9ED]/75">
                        Your support will help us build and sustain a spiritual home dedicated to
                        Digambar Jain Dharma, community activities, religious programs, education,
                        and future temple initiatives in Raleigh and the Research Triangle.
                    </p>
                </Reveal>
                <Reveal delay={0.35}>
                    <div className="mt-10 rounded-2xl border border-[#C99A30]/30 bg-[#FFF9ED]/[0.04] backdrop-blur-sm p-8">
                        <p className="text-sm uppercase tracking-[0.22em] text-[#C99A30]">
                            For Donation Information
                        </p>
                        <p className="mt-3 text-[#FFF9ED]/80 text-base">
                            Please contact us at{" "}
                            <a
                                href="mailto:admin@djcraleigh.org"
                                data-testid="donate-email-link"
                                className="text-[#C99A30] hover:text-[#E87524] transition-colors duration-300 underline underline-offset-4 decoration-[#C99A30]/50"
                            >
                                admin@djcraleigh.org
                            </a>
                        </p>
                        <a
                            href={DONATE_MAILTO}
                            data-testid="donate-cta"
                            className="btn-shimmer mt-7 inline-block rounded-full bg-[#C99A30] text-[#521413] px-9 py-3.5 text-sm uppercase tracking-[0.16em] font-semibold hover:bg-[#E87524] hover:text-[#FFF9ED] transition-colors duration-300"
                        >
                            Contact Us to Donate
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={0.45}>
                    <p className="mt-8 font-devanagari text-[#C99A30]/80 text-lg">
                        अहिंसा परमो धर्मः
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

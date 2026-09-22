import Reveal from "./Reveal";

export default function SectionHeading({
    chapter,
    eyebrow,
    title,
    subtitle,
    dark = false,
    align = "center",
}) {
    return (
        <div className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-3xl`}>
            <Reveal>
                <p className="text-xs uppercase tracking-[0.35em] font-mono text-[#C99A30]">
                    {chapter} — {eyebrow}
                </p>
            </Reveal>
            <Reveal delay={0.1}>
                <h2
                    className={`mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight ${
                        dark ? "text-[#FFF9ED]" : "text-[#6F1D1B]"
                    }`}
                >
                    {title}
                </h2>
            </Reveal>
            {subtitle && (
                <Reveal delay={0.2}>
                    <p
                        className={`mt-5 text-base md:text-lg leading-relaxed ${
                            dark ? "text-[#FFF9ED]/70" : "text-[#292929]/70"
                        }`}
                    >
                        {subtitle}
                    </p>
                </Reveal>
            )}
        </div>
    );
}

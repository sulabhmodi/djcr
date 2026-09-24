import Logo from "./Logo";
import Reveal from "./Reveal";

const LINKS = [
    { href: "#temple", label: "Temple", id: "temple" },
    { href: "#about", label: "About Us", id: "about" },
    { href: "#vision", label: "Temple Vision", id: "vision" },
    { href: "#events", label: "Events", id: "events" },
    { href: "#dharma", label: "Jain Dharma", id: "dharma" },
    { href: "#get-involved", label: "Get Involved", id: "get-involved" },
    { href: "#donate", label: "Donate", id: "donate" },
    { href: "#contact", label: "Contact", id: "contact" },
];

export default function Footer() {
    return (
        <footer
            data-testid="site-footer"
            className="relative bg-[#521413] text-[#FFF9ED] overflow-hidden"
        >
            <div className="absolute inset-0 jali-bg-light pointer-events-none" />
            <div className="relative px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto pt-16 pb-8">
                <Reveal>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <Logo dark />
                            <p className="mt-5 text-sm text-[#FFF9ED]/60 leading-relaxed max-w-xs">
                                An upcoming Digambar Jain Temple and spiritual center serving the
                                Research Triangle of North Carolina.
                            </p>
                            <p className="mt-5 font-devanagari text-[#C99A30] text-lg">
                                अहिंसा परमो धर्मः
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-[#C99A30]">
                                Navigate
                            </p>
                            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                                {LINKS.map((l) => (
                                    <li key={l.id}>
                                        <a
                                            href={l.href}
                                            data-testid={`footer-link-${l.id}`}
                                            className="text-sm text-[#FFF9ED]/70 hover:text-[#C99A30] transition-colors duration-300"
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-[#C99A30]">
                                Areas Served
                            </p>
                            <p className="mt-5 text-sm text-[#FFF9ED]/70 leading-relaxed">
                                Raleigh • Cary • Morrisville • Durham • Chapel Hill • Research
                                Triangle, North Carolina
                            </p>
                            <p className="mt-6 font-display italic text-xl text-[#FFF9ED]">
                                Jai Jinendra 🙏
                            </p>
                        </div>
                    </div>
                </Reveal>
                <div className="mt-14 pt-7 border-t border-[#C99A30]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p data-testid="footer-copyright" className="text-xs text-[#FFF9ED]/50 tracking-wide">
                        © Digambar Jain Center of Raleigh. All Rights Reserved.
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#C99A30]/70">DJCR</p>
                </div>
            </div>
        </footer>
    );
}

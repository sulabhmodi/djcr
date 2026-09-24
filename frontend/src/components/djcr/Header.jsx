import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV = [
    { href: "#temple", label: "Temple", id: "temple" },
    { href: "#about", label: "About Us", id: "about" },
    { href: "#vision", label: "Temple Vision", id: "vision" },
    { href: "#events", label: "Events", id: "events" },
    { href: "#dharma", label: "Jain Dharma", id: "dharma" },
    { href: "#get-involved", label: "Get Involved", id: "get-involved" },
    { href: "#donate", label: "Donate", id: "donate" },
    { href: "#contact", label: "Contact", id: "contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="site-header"
            className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 border-b ${
                scrolled
                    ? "bg-[#FFF9ED]/85 backdrop-blur-md border-[#6F1D1B]/10 shadow-[0_8px_30px_rgba(111,29,27,0.06)]"
                    : "bg-transparent border-transparent"
            }`}
        >
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto flex items-center justify-between h-[72px]">
                <Logo />
                <nav className="hidden xl:flex items-center gap-5" aria-label="Main navigation">
                    {NAV.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            data-testid={`nav-link-${item.id}`}
                            className={`text-[13px] uppercase tracking-[0.14em] transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C99A30] after:transition-[width] after:duration-300 hover:after:w-full ${
                                item.id === "donate"
                                    ? "text-[#C99A30] font-semibold hover:text-[#E87524]"
                                    : "text-[#292929]/70 hover:text-[#6F1D1B]"
                            }`}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#get-involved"
                        data-testid="nav-support-vision-cta"
                        className="btn-shimmer ml-2 rounded-full bg-[#6F1D1B] text-[#FFF9ED] text-[13px] uppercase tracking-[0.14em] px-5 py-2.5 hover:bg-[#521413] transition-colors duration-300"
                    >
                        Support Vision
                    </a>
                </nav>
                <button
                    data-testid="mobile-menu-button"
                    className="xl:hidden text-[#6F1D1B] p-2"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.nav
                        data-testid="mobile-menu-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="xl:hidden overflow-hidden bg-[#FFF9ED]/95 backdrop-blur-md border-t border-[#6F1D1B]/10"
                        aria-label="Mobile navigation"
                    >
                        <div className="px-6 py-6 flex flex-col gap-5">
                            {NAV.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    data-testid={`mobile-nav-link-${item.id}`}
                                    onClick={() => setOpen(false)}
                                    className={`font-display text-2xl ${
                                        item.id === "donate" ? "text-[#C99A30]" : "text-[#6F1D1B]"
                                    }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="#get-involved"
                                data-testid="mobile-support-vision-cta"
                                onClick={() => setOpen(false)}
                                className="mt-2 rounded-full bg-[#6F1D1B] text-[#FFF9ED] text-center text-sm uppercase tracking-[0.14em] px-5 py-3"
                            >
                                Support Vision
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}

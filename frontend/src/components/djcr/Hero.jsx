import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ShikharArt from "./ShikharArt";

const lineReveal = {
    hidden: { y: "112%" },
    visible: (i) => ({
        y: 0,
        transition: { delay: 0.45 + i * 0.16, duration: 1.05, ease: [0.16, 1, 0.3, 1] },
    }),
};

function GoldenDust() {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        let w, h, raf;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let particles = [];

        const resize = () => {
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            particles = Array.from({ length: Math.min(80, Math.floor(w / 16)) }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 0.6 + Math.random() * 1.9,
                s: 0.06 + Math.random() * 0.22,
                drift: (Math.random() - 0.5) * 0.12,
                phase: Math.random() * Math.PI * 2,
                tw: 0.004 + Math.random() * 0.01,
            }));
        };

        const tick = () => {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                p.y -= p.s;
                p.x += p.drift;
                p.phase += p.tw * 16;
                if (p.y < -6) {
                    p.y = h + 6;
                    p.x = Math.random() * w;
                }
                if (p.x < -6) p.x = w + 6;
                if (p.x > w + 6) p.x = -6;
                const alpha = 0.18 + 0.3 * (0.5 + 0.5 * Math.sin(p.phase));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201,154,48,${alpha.toFixed(3)})`;
                ctx.fill();
            }
            raf = requestAnimationFrame(tick);
        };

        resize();
        tick();
        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            data-testid="hero-golden-dust-canvas"
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}

export default function Hero() {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 45, damping: 18 });
    const sy = useSpring(my, { stiffness: 45, damping: 18 });
    const artX = useTransform(sx, [-1, 1], [-26, 26]);
    const artY = useTransform(sy, [-1, 1], [-14, 14]);

    const handleMouse = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    return (
        <section
            id="temple"
            data-testid="hero-section"
            onMouseMove={handleMouse}
            className="relative min-h-screen flex items-center justify-center overflow-hidden jali-bg"
        >
            <div className="absolute inset-0 hero-glow pointer-events-none" />
            <GoldenDust />
            <motion.div
                style={{ x: artX, y: artY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <ShikharArt className="w-[130vw] sm:w-[95vw] max-w-[880px] text-[#C99A30] opacity-[0.16]" />
            </motion.div>

            <div className="relative z-10 px-4 sm:px-8 max-w-4xl mx-auto text-center pt-28 pb-20">
                <motion.p
                    data-testid="hero-mantra"
                    initial={{ opacity: 0, letterSpacing: "0.45em" }}
                    animate={{ opacity: 1, letterSpacing: "0.14em" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-devanagari text-[#C99A30] text-xl sm:text-2xl md:text-3xl"
                >
                    अहिंसा परमो धर्मः
                </motion.p>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 mx-auto h-px w-24 bg-[#C99A30]/60 origin-center"
                />

                <h1 className="mt-7 font-display font-semibold text-[#6F1D1B] text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight">
                    <span className="block overflow-hidden pb-1">
                        <motion.span
                            className="block"
                            variants={lineReveal}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                        >
                            Digambar Jain Center
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-2">
                        <motion.span
                            className="block italic font-medium"
                            variants={lineReveal}
                            initial="hidden"
                            animate="visible"
                            custom={1}
                        >
                            of Raleigh
                        </motion.span>
                    </span>
                </h1>

                <span className="block overflow-hidden mt-5">
                    <motion.span
                        data-testid="hero-subheading"
                        className="block text-base md:text-lg uppercase tracking-[0.22em] text-[#E87524] font-medium"
                        variants={lineReveal}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                    >
                        An Upcoming Digambar Jain Temple Serving Raleigh and the Research Triangle
                    </motion.span>
                </span>

                <motion.p
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-7 text-[#292929]/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
                >
                    A spiritual home dedicated to the preservation, practice, and teachings of
                    Digambar Jain Dharma for families throughout the Research Triangle.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#vision"
                        data-testid="hero-vision-cta"
                        className="btn-shimmer rounded-full bg-[#6F1D1B] text-[#FFF9ED] px-8 py-3.5 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300 w-full sm:w-auto text-center"
                    >
                        Our Temple Vision
                    </a>
                    <a
                        href="#get-involved"
                        data-testid="hero-join-cta"
                        className="rounded-full border border-[#6F1D1B]/35 text-[#6F1D1B] px-8 py-3.5 text-sm uppercase tracking-[0.16em] hover:border-[#C99A30] hover:bg-[#C99A30]/10 transition-colors duration-300 w-full sm:w-auto text-center"
                    >
                        Join Our Community
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#6F1D1B]/50">Scroll</span>
                <motion.span
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="block w-px h-10 bg-gradient-to-b from-[#C99A30] to-transparent"
                />
            </motion.div>
        </section>
    );
}

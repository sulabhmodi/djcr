import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import Header from "@/components/djcr/Header";
import Hero from "@/components/djcr/Hero";
import Marquee from "@/components/djcr/Marquee";
import Welcome from "@/components/djcr/Welcome";
import Vision from "@/components/djcr/Vision";
import Dharma from "@/components/djcr/Dharma";
import Project from "@/components/djcr/Project";
import Events from "@/components/djcr/Events";
import GetInvolved from "@/components/djcr/GetInvolved";
import Contact from "@/components/djcr/Contact";
import Footer from "@/components/djcr/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const onClick = (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            const id = anchor.getAttribute("href");
            if (id.length > 1 && document.querySelector(id)) {
                e.preventDefault();
                lenis.scrollTo(id, { offset: -72, duration: 1.4 });
            }
        };
        document.addEventListener("click", onClick);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            document.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#FFF9ED] text-[#292929] antialiased">
            <Header />
            <main>
                <Hero />
                <Marquee />
                <Welcome />
                <Vision />
                <Dharma />
                <Project />
                <Events />
                <GetInvolved />
                <Contact />
            </main>
            <Footer />
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#FFFDF7",
                        border: "1px solid rgba(201,154,48,0.4)",
                        color: "#292929",
                    },
                }}
            />
        </div>
    );
}

export default App;

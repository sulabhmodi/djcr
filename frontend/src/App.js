import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import Header from "@/components/djcr/Header";
import Hero from "@/components/djcr/Hero";
import Marquee from "@/components/djcr/Marquee";
import Welcome from "@/components/djcr/Welcome";
import Vision from "@/components/djcr/Vision";
import Dharma from "@/components/djcr/Dharma";
import Project from "@/components/djcr/Project";
import Events from "@/components/djcr/Events";
import Gallery from "@/components/djcr/Gallery";
import GetInvolved from "@/components/djcr/GetInvolved";
import Donate from "@/components/djcr/Donate";
import Contact from "@/components/djcr/Contact";
import Footer from "@/components/djcr/Footer";
import Admin from "@/components/djcr/Admin";
import { Toaster } from "@/components/ui/sonner";

function Landing() {
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
                lenis.scrollTo(id, { offset: -116, duration: 1.4 });
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
                <Gallery />
                <GetInvolved />
                <Donate />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
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
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

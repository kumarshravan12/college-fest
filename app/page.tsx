"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CountdownTimer } from "@/components/countdown-timer";
import { SocietyCard } from "@/components/society-card";

export default function Home() {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    // Star animation setup
    useEffect(() => {
        const createStar = () => {
            const star = document.createElement("div");
            star.className = "star";
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.position = "absolute";
            star.style.backgroundColor = "white";
            star.style.borderRadius = "50%";
            star.style.opacity = Math.random().toString();
            star.style.animation = `twinkle ${Math.random() * 5 + 2}s infinite ease-in-out`;

            const container = document.getElementById("stars-container");
            if (container) container.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 8000);
        };

        const interval = setInterval(createStar, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen relative overflow-hidden bg-black selection:bg-red-500/30">
            <div id="stars-container" className="stars fixed inset-0 z-0" />

            <Navbar />

            {/* Hero Section */}
            <section ref={targetRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
                <motion.div
                    style={{ opacity, scale }}
                    className="space-y-6 md:space-y-8 z-10 w-full"
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 md:mb-8 relative"
                    >
                        {/* Logo Effect */}
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-playfair font-bold bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] break-words w-full px-2">
                            CULTURAHUB
                        </h1>
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-700" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-gray-400 tracking-[0.2em] sm:tracking-[0.5em] text-xs sm:text-sm md:text-base uppercase"
                    >
                        The Curse Activates In
                    </motion.p>

                    <div className="py-4 md:py-8">
                        <CountdownTimer />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4"
                    >
                        <div className="border border-white/10 px-4 sm:px-6 py-3 rounded-lg backdrop-blur-sm bg-white/5 flex-1 max-w-[200px] mx-auto sm:mx-0">
                            <span className="block text-[10px] uppercase text-gray-500 tracking-wider mb-1">Dates</span>
                            <span className="font-playfair text-lg sm:text-xl">10 - 12 Mar '26</span>
                        </div>
                        <div className="border border-white/10 px-4 sm:px-6 py-3 rounded-lg backdrop-blur-sm bg-white/5 flex-1 max-w-[200px] mx-auto sm:mx-0">
                            <span className="block text-[10px] uppercase text-gray-500 tracking-wider mb-1">Venue</span>
                            <span className="font-playfair text-lg sm:text-xl">SEC Supaul</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Intro Text Section */}
            <section className="py-16 md:py-24 relative z-10">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 md:mb-12" />
                        <p className="text-gray-400 uppercase tracking-widest text-[10px] sm:text-sm mb-4">The Celebration of Creativity</p>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair leading-tight mb-8">
                            Where studios meet stages <br className="hidden sm:block" />
                            <span className="italic text-gray-400">&</span> stories find their voice.
                        </h2>
                        <p className="text-gray-400 text-base md:text-xl font-light mb-8 md:text-12 md:mb-12 max-w-2xl mx-auto px-4">
                            Single registration includes access to all 32 events, official T-shirt, goodies & 3 days accommodation.
                        </p>
                        <Link
                            href={user ? "/events" : "/register"}
                            className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            {user ? "Explore Events" : "Register Now"}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Societies Grid */}
            <section className="py-16 md:py-24 relative z-10 bg-gradient-to-b from-transparent to-black/50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center text-4xl sm:text-5xl md:text-7xl font-playfair mb-12 md:mb-16"
                    >
                        Pick your stage.
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <SocietyCard
                            title="Acting and Drama"
                            subtitle="Society"
                            color="red"
                            image="/placeholder.jpg"
                        />
                        <SocietyCard
                            title="Fine Arts"
                            subtitle="Society"
                            color="blue"
                            image="/placeholder.jpg"
                        />
                        <SocietyCard
                            title="Music & Dance"
                            subtitle="Society"
                            color="red"
                            image="/placeholder.jpg"
                        />
                        <SocietyCard
                            title="Literature & Debate"
                            subtitle="Society"
                            color="yellow"
                            image="/placeholder.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h3 className="text-gray-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4">CulturaHub Glimpses</h3>
                    </div>
                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                        <div className="sm:col-span-2 sm:row-span-2 relative rounded-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <p className="text-white font-playfair text-xl sm:text-2xl">Concert Night '25</p>
                            </div>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gray-700 animate-pulse delay-100" />
                        </div>
                        <div className="relative rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gray-600 animate-pulse delay-200" />
                        </div>
                        <div className="sm:col-span-2 relative rounded-2xl overflow-hidden h-[200px] md:h-auto">
                            <div className="absolute inset-0 bg-gray-800 animate-pulse delay-300" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

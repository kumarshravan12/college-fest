"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TeamMemberCard } from "@/components/team-member-card";
import { motion } from "framer-motion";
import { Star, Shield } from "lucide-react";

export default function TeamPage() {
    // Star animation setup (reused from Home)
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

    const seniorCoordinators = [
        { name: "Aashi Shrivastava", phone: "9905980187", image: "/logo.svg" },
        { name: "Aayush Mishra", phone: "9155521044", image: "/logo.svg" },
        { name: "Adil Irshad", phone: "7903063468", image: "/logo.svg" },
        { name: "Akshita Anand", phone: "7480021240", image: "/logo.svg" },
        { name: "Amisha Giri", phone: "9262356963", image: "/logo.svg" },
    ];

    const coordinators = [
        { name: "Aman Kumar", phone: "9905000955", image: "/logo.svg" },
        { name: "Anand Prabhat", phone: "7870510637", image: "/logo.svg" },
        { name: "Anjali Kumari", phone: "9835686389", image: "/logo.svg" },
        { name: "Ayushi Singh", phone: "9135810898", image: "/logo.svg" },
        { name: "Deepa Singh", phone: "9336507188", image: "/logo.svg" },
    ];

    return (
        <main className="min-h-screen relative bg-black selection:bg-red-500/30">
            <div id="stars-container" className="stars fixed inset-0 z-0 pointer-events-none" />

            <Navbar />

            <section className="pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-24">
                        <div className="inline-block border border-white/20 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-6">
                            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                                The Minds Behind CulturaHub
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            THE TEAM
                        </h1>
                        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto font-light">
                            Brilliant minds bringing CulturaHub to life. The creative force of Junoon.
                        </p>
                    </div>

                    {/* Senior Coordinators */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-yellow-500/20 p-3 rounded-xl border border-yellow-500/30">
                                <Star className="w-6 h-6 text-yellow-500" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-playfair text-white uppercase tracking-wider">
                                Senior Coordinators
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
                            {seniorCoordinators.map((member, idx) => (
                                <TeamMemberCard key={idx} {...member} />
                            ))}
                        </div>
                    </div>

                    {/* Coordinators */}
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                                <Shield className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-playfair text-white uppercase tracking-wider">
                                Coordinators
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
                            {coordinators.map((member, idx) => (
                                <TeamMemberCard key={idx} {...member} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

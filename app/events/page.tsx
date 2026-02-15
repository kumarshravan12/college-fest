"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EventCard, EventProps } from "@/components/event-card";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";

export default function EventsPage() {
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

    const categories = [
        "All categories",
        "Acting and Drama",
        "Fine Arts",
        "Music and Dance",
        "Literature and Debate",
        "Special Events"
    ];

    const [activeCategory, setActiveCategory] = useState("All categories");
    const [searchQuery, setSearchQuery] = useState("");

    // Dummy data - ideally this comes from Supabase
    const events: EventProps[] = [
        {
            id: "1",
            title: "GANGSTA",
            subtitle: "Solo Rap Competition",
            category: "Music and Dance",
            image: "/logo.svg", // Placeholder
            date: "10 Mar",
            entryFee: "Free",
            teamSize: "Individual",
            venue: "AVH",
            status: "Open",
            isOnCampus: true
        },
        {
            id: "2",
            title: "GOONJ",
            subtitle: "A Solo Singing Competition",
            category: "Music and Dance",
            image: "/logo.svg",
            date: "10 Mar",
            entryFee: "Free",
            teamSize: "Individual",
            venue: "Main Stage",
            status: "Open",
            isOnCampus: true
        },
        {
            id: "3",
            title: "GROOVES",
            subtitle: "A Group Dance Competition",
            category: "Music and Dance",
            image: "/logo.svg",
            date: "10 Mar",
            entryFee: "Free",
            teamSize: "3-18",
            venue: "Main Stage",
            status: "Open",
            isOnCampus: true
        },
        {
            id: "4",
            title: "WALL RUSH",
            subtitle: "Wall Painting Competition",
            category: "Fine Arts",
            image: "/logo.svg",
            date: "11 Mar",
            entryFee: "Free",
            teamSize: "2-3",
            venue: "H1 Wall",
            status: "Open",
            isOnCampus: true
        },
        {
            id: "5",
            title: "WITCOINS",
            subtitle: "Quiz Competition",
            category: "Literature and Debate",
            image: "/logo.svg",
            date: "10 Mar",
            entryFee: "Free",
            teamSize: "2-2",
            venue: "Room-50",
            status: "Open",
            isOnCampus: true
        },
        {
            id: "6",
            title: "ABHIVYAKTI",
            subtitle: "An Extempore Speaking Event",
            category: "Literature and Debate",
            image: "/logo.svg",
            date: "11 Mar",
            entryFee: "Free",
            teamSize: "Individual",
            venue: "AVH",
            status: "Open",
            isOnCampus: true
        },
        {
            id: "7",
            title: "BAYAN",
            subtitle: "Open Mic Competition",
            category: "Acting and Drama",
            image: "/logo.svg",
            date: "10 Mar",
            entryFee: "Free",
            teamSize: "Individual",
            venue: "AVH",
            status: "Open",
            isOnCampus: true
        },
        {
            id: "8",
            title: "CHITRAKARI",
            subtitle: "Sketching Competition",
            category: "Fine Arts",
            image: "/logo.svg",
            date: "10 Mar",
            entryFee: "Free",
            teamSize: "Individual",
            venue: "Room No. 37",
            status: "Open",
            isOnCampus: true
        }
    ];

    const [activeType, setActiveType] = useState("All Types");
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const types = ["All Types", "Solo", "Group"];

    const filteredEvents = events.filter(event => {
        const matchesCategory = activeCategory === "All categories" || event.category === activeCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesType = true;
        if (activeType === "Solo") {
            matchesType = event.teamSize === "Individual";
        } else if (activeType === "Group") {
            matchesType = event.teamSize !== "Individual";
        }

        return matchesCategory && matchesSearch && matchesType;
    });

    return (
        <main className="min-h-screen relative bg-black selection:bg-red-500/30">
            <div id="stars-container" className="stars fixed inset-0 z-0 pointer-events-none" />

            <Navbar />

            <section className="pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-4">

                    {/* Top Controls Row */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-2xl w-full group">
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-full py-3.5 pl-6 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all"
                            />
                            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative w-full md:w-auto min-w-[140px]">
                            <button
                                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                className="w-full flex items-center justify-between gap-3 bg-black border border-white/10 px-6 py-3.5 rounded-full text-white font-medium hover:bg-white/5 transition-all"
                            >
                                <span>{activeType}</span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isTypeDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl z-50">
                                    {types.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setActiveType(type);
                                                setIsTypeDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-6 py-3 text-sm hover:bg-white/5 transition-colors ${activeType === type ? "text-white font-bold bg-white/5" : "text-gray-400"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Categories Row */}
                    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl px-8 py-4 mb-16 flex flex-col md:flex-row gap-8 items-center">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase whitespace-nowrap">
                            CATEGORY
                        </span>

                        <div className="flex items-center gap-3 w-full overflow-x-auto pb-2 md:pb-0 no-scrollbar mask-gradient">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === category
                                        ? "bg-white text-black font-extrabold"
                                        : "bg-[#1a1a1a] text-gray-400 hover:bg-[#252525] hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Events Grid */}
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl text-gray-500 font-playfair italic">No events found matching your criteria.</h3>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    );
}

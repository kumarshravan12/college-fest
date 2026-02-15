"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Info, ExternalLink } from "lucide-react";
import Link from "next/link";

export interface EventProps {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    date: string;
    entryFee: string;
    teamSize: string;
    venue: string;
    status: "Open" | "Closed";
    isOnCampus: boolean;
}

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function EventCard({ event }: { event: EventProps }) {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

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

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/30 transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative h-64 md:h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    {event.isOnCampus && (
                        <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-red-500" />
                            <span className="text-[10px] uppercase font-bold tracking-wider text-white">On Campus</span>
                        </div>
                    )}
                </div>

                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${event.status === 'Open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white">{event.status}</span>
                    </div>
                </div>

                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative z-20 -mt-6">
                <div className="mb-4">
                    <div className="inline-block border border-white/20 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-3">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                            {event.category}
                        </span>
                    </div>
                    <h3 className="text-3xl font-playfair font-black text-white mb-1 uppercase leading-none tracking-tight">
                        {event.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                        {event.subtitle}
                    </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10 mb-6">
                    <div className="bg-[#111] p-3">
                        <span className="block text-[10px] uppercase text-gray-500 tracking-wider mb-1">Date</span>
                        <span className="block text-sm font-medium text-white">{event.date}</span>
                    </div>
                    <div className="bg-[#111] p-3">
                        <span className="block text-[10px] uppercase text-gray-500 tracking-wider mb-1">Entry</span>
                        <span className="block text-sm font-medium text-white">{event.entryFee}</span>
                    </div>
                    <div className="bg-[#111] p-3">
                        <span className="block text-[10px] uppercase text-gray-500 tracking-wider mb-1">Team Size</span>
                        <span className="block text-sm font-medium text-white">{event.teamSize}</span>
                    </div>
                    <div className="bg-[#111] p-3">
                        <span className="block text-[10px] uppercase text-gray-500 tracking-wider mb-1">Venue</span>
                        <span className="block text-sm font-medium text-white">{event.venue}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto grid grid-cols-5 gap-3">
                    <button className="col-span-2 py-3 border border-white/20 hover:border-white/40 text-gray-300 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/5 transition-all">
                        Rulebook
                    </button>
                    <Link
                        href={user ? "/register" : "/signin"}
                        className="col-span-3 py-3 bg-[#c42d38] hover:bg-[#a01d26] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-900/20 transition-all hover:translate-y-[-2px] flex items-center justify-center text-center"
                    >
                        {user ? "Register Now" : "Sign In To Register"}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

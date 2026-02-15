"use client";

import { motion } from "framer-motion";

interface TeamMemberProps {
    name: string;
    role?: string;
    image: string;
    phone?: string;
}

export function TeamMemberCard({ name, role, image, phone }: TeamMemberProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-all duration-300 w-full max-w-sm mx-auto"
        >
            <div className="aspect-[3/4] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-4 text-center relative z-20 -mt-16 pb-6">
                <h3 className="text-xl font-playfair font-bold text-white mb-1 uppercase tracking-wide">
                    {name}
                </h3>
                {role && (
                    <p className="text-red-400 text-xs font-semibold uppercase tracking-widest mb-2">
                        {role}
                    </p>
                )}
                {phone && (
                    <p className="text-gray-400 text-sm font-mono">
                        {phone}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

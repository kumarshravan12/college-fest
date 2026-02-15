"use client";

import { motion } from "framer-motion";

import { Link2 } from "lucide-react";
import Link from "next/link";

interface SocietyCardProps {
    title: string;
    subtitle: string;
    image: string; // In a real app, this would be a URL
    color: string;
}

export function SocietyCard({ title, subtitle, color }: SocietyCardProps) {
    // Placeholder gradient based on the passed color
    const gradientClass = {
        red: "from-red-900 to-black",
        blue: "from-blue-900 to-black",
        yellow: "from-yellow-900 to-black",
    }[color] || "from-gray-900 to-black";

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative h-[400px] rounded-xl overflow-hidden cursor-pointer group bg-gradient-to-b ${gradientClass} border border-white/10`}
        >
            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 bg-black/40 group-hover:bg-black/60 transition-colors duration-300">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="text-3xl font-playfair font-bold text-white mb-2 leading-tight">
                        {title}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium tracking-wide uppercase mb-4">
                        {subtitle}
                    </p>

                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                        <Link href="#" className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:underline">
                            Explore <Link2 className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 z-20">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    {/* Icon placeholder */}
                    <div className="w-6 h-6 rounded-full bg-white/20" />
                </div>
            </div>
        </motion.div>
    );
}

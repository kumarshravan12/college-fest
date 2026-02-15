"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CountdownTimer() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        setMounted(true);
        // Target date: March 10, 2026
        const targetDate = new Date("2026-03-10T00:00:00").getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                    <motion.div
                        key={value}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-playfair font-thin text-white relative"
                    >
                        {value.toString().padStart(2, "0")}
                        {/* Colon separator except for last item */}
                        {unit !== "seconds" && (
                            <span className="hidden xs:block absolute -right-3 sm:-right-6 md:-right-10 top-0 sm:top-2 md:top-4 text-gray-600 animate-pulse">
                                :
                            </span>
                        )}
                    </motion.div>
                    <span className="text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-500 mt-2 md:mt-4">
                        {unit}
                    </span>
                </div>
            ))}
        </div>
    );
}

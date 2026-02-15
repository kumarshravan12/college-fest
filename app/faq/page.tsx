"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle, Send } from "lucide-react";

export default function FAQPage() {
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

    const faqs = [
        {
            question: "HOW MUCH IS THE REGISTRATION FEE?",
            answer: "The registration fee is ₹999 for a single pass which covers entry to all events."
        },
        {
            question: "I HAVE COMPLETED THE PAYMENT, BUT I AM UNABLE TO REGISTER FOR ANY EVENT. WHY?",
            answer: "Please allow up to 24 hours for payment confirmation. If the issue persists, contact our support team with your transaction ID."
        },
        {
            question: "CAN THE EVENTS BE DISTRIBUTED MORE EVENLY ACROSS ALL THREE DAYS?",
            answer: "The schedule is designed to maximize participation and minimize clashes. However, minor adjustments might be made closer to the event date."
        },
        {
            question: "WHAT ARE THE PRIZES FOR THE DIFFERENT COMPETITIONS?",
            answer: "Prizes worth over ₹5 Lakhs are up for grabs! Detailed prize breakdown for each event is available in the Rulebook."
        },
        {
            question: "WILL FOOD AND ACCOMMODATION FACILITIES BE PROVIDED BY THE COLLEGE FOR OUTSTATION PARTICIPANTS?",
            answer: "Yes, accommodation is available at a nominal cost. Food stalls will be set up on campus providing a variety of cuisines."
        },
        {
            question: "WITH A SINGLE REGISTRATION FEE OF ₹999, HOW MANY EVENTS CAN A PARTICIPANT TAKE PART IN AND WHAT BENEFITS ARE INCLUDED?",
            answer: "The single fee covers participation in UNLIMITED events, subject to schedule clashes. It also includes entry to all Pro Nites and a welcome kit."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <main className="min-h-screen relative bg-black selection:bg-red-500/30">
            <div id="stars-container" className="stars fixed inset-0 z-0 pointer-events-none" />

            <Navbar />

            <section className="pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-4 max-w-4xl">

                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block mb-4"
                        >
                            <img src="/logo.svg" alt="logo" className="w-16 h-16 mx-auto opacity-80" />
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
                            FREQUENTLY ASKED QUESTIONS
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Find answers to common questions about CulturaHub. Can't find what you're looking for? Ask us directly!
                        </p>
                    </div>

                    <div className="space-y-4 mb-20">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-playfair font-bold text-gray-200 uppercase tracking-wide pr-8">
                                        {faq.question}
                                    </span>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Ask a Question Form */}
                    <div className="bg-gradient-to-br from-[#1a0b0b] to-[#0a0a0a] border border-red-900/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-red-500/10 rounded-full border border-red-500/20">
                                    <MessageCircle className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-playfair font-bold text-white uppercase tracking-wider">
                                    Ask a Question
                                </h2>
                            </div>

                            <textarea
                                placeholder="Type your question here..."
                                className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-black/80 transition-all resize-none mb-6"
                            />

                            <button className="flex items-center gap-2 bg-[#c42d38] hover:bg-[#a01d26] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(196,45,56,0.3)]">
                                <Send className="w-4 h-4" />
                                <span>Submit Question</span>
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

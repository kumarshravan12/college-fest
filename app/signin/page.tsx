"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, User, LogIn } from "lucide-react";

export default function SignInPage() {
    // Star animation setup (same as Register page)
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

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState("");
    const router = useRouter(); // Import useRouter from next/navigation (needs to be added to imports)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const supabase = createClient();
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            // Success - Redirect to home or dashboard
            router.push('/');
            router.refresh();
        } catch (err: any) {
            console.error("Sign In Error:", err);
            setError(err.message || "Failed to sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative bg-black selection:bg-red-500/30 font-sans flex items-center justify-center p-4">
            <div id="stars-container" className="stars fixed inset-0 z-0 pointer-events-none" />

            {/* Background elements */}
            <div className="fixed top-20 left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch pt-20 lg:pt-0">

                {/* Left Side: Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-12 flex flex-col justify-between relative overflow-hidden min-h-0 lg:min-h-[600px]"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-sm">
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#e0a469]" />
                            <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-300 uppercase">Participant Portal</span>
                        </div>

                        <img src="/logo.svg" alt="logo" className="w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8 opacity-80" />

                        <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4 md:mb-6 leading-tight">
                            Welcome back<br />to <span className="text-[#e0a469]">CulturaHub</span>
                        </h1>

                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-md">
                            Access your registrations, manage event lineups, and stay in sync with every announcement.
                        </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                            <h3 className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 md:mb-4">Why Sign In?</h3>
                            <ul className="space-y-2 md:space-y-3">
                                <li className="flex items-center gap-3 text-gray-300 text-xs md:text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                    Track payment verification status.
                                </li>
                                <li className="flex items-center gap-3 text-gray-300 text-xs md:text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                    Join curated events and workshops.
                                </li>
                                <li className="flex items-center gap-3 text-gray-300 text-xs md:text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                    Manage team digital passes.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#052e16]/30 border border-[#052e16] rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4">
                            <div className="p-2 bg-[#052e16] rounded-lg shrink-0">
                                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#4ade80]" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-xs md:text-sm">Verified Access</h4>
                                <p className="text-[#4ade80] text-[10px] md:text-xs">Secure authentication for your festival identity.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col justify-center px-4 md:px-12 py-12"
                >
                    <div className="max-w-md mx-auto w-full">
                        <div className="text-center mb-10">
                            <img src="/logo.svg" alt="logo" className="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                            <h2 className="text-3xl font-playfair font-bold text-white mb-2">SIGN IN</h2>
                            <p className="text-gray-500">Continue with your CulturaHub pass credentials.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-bold text-center">
                                    {error}
                                </div>
                            )}
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                    </div>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                    </div>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Link href="#" className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Signing in...</span>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <LogIn className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-gray-500 text-sm">
                                Need an account? <Link href="/register" className="text-[#e0a469] hover:underline font-bold">Register</Link>
                            </p>
                        </form>

                        <div className="mt-12">
                            <Link href="/" className="group flex items-center justify-between w-full bg-[#0a0a0a] border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all">
                                <span className="text-gray-400 group-hover:text-white transition-colors font-medium">Explore CulturaHub Portal</span>
                                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

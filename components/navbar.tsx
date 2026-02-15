"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Users, Calendar, HelpCircle, LogOut, ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
    { name: "Home", href: "#", icon: Home },
    { name: "Team", href: "/team", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

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

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setProfileOpen(false);
        setMobileMenuOpen(false);
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "glass-nav py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <img src="/logo.svg" alt="CulturaHub" className="h-14 w-14 md:h-16 md:w-16 rounded-full border-2 border-white/20 bg-white hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 bg-white/10 border border-white/20 hover:border-white/50 px-4 py-2 rounded-full transition-all"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                    {user.user_metadata?.fullName?.[0] || <User className="w-4 h-4" />}
                                </div>
                                <span className="text-sm font-medium text-white max-w-[100px] truncate">
                                    {user.user_metadata?.fullName || "User"}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Profile Dropdown */}
                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                                    >
                                        <div className="p-3 border-b border-white/10">
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Signed in as</p>
                                            <p className="text-sm text-white truncate font-medium">{user.email}</p>
                                        </div>
                                        <div className="p-1">
                                            <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                                                <User className="w-4 h-4" />
                                                Profile
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <>
                            <Link href="/register" className="px-6 py-2 bg-[#c42d38] hover:bg-[#a01d26] text-white font-semibold rounded-full shadow-[0_0_15px_rgba(196,45,56,0.5)] hover:shadow-[0_0_25px_rgba(196,45,56,0.7)] transition-all duration-300 transform hover:-translate-y-0.5">
                                Register
                            </Link>
                            <Link href="/signin" className="px-6 py-2 bg-transparent border border-white/20 hover:border-white/50 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {user && (
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                        {user.user_metadata?.fullName?.[0] || <User className="w-5 h-5" />}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-white font-bold truncate">{user.user_metadata?.fullName || "User"}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                            )}

                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            ))}
                            <hr className="border-white/10 my-2" />

                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 bg-[#c42d38] text-white font-bold rounded-xl text-center">
                                        Register Now
                                    </Link>
                                    <Link href="/signin" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 border border-white/20 text-white font-medium rounded-xl text-center">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

import Link from "next/link";
import { MessageCircle, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Organizer Info */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                            Organised By
                        </h3>
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-playfair text-white">
                                The Arts & Culture Club
                            </h2>
                            <p className="text-lg text-gray-400 font-light">
                                of SEC Supaul
                            </p>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block"></div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                            Contact
                        </h3>
                        <div className="space-y-4">
                            <div className="group flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-green-500 group-hover:bg-green-500/10 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Nishant Kumar</h4>
                                    <p className="text-sm text-gray-400">+91 70796 73468</p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-green-500 group-hover:bg-green-500/10 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Tulika Sinha</h4>
                                    <p className="text-sm text-gray-400">+91 70914 49646</p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-red-500 group-hover:bg-red-500/10 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <Link href="mailto:name@gmail.com" className="text-white hover:text-red-400 transition-colors pt-2">
                                    name@gmail.com
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                            Stay in Touch
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="#"
                                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm text-gray-300 hover:text-white hover:border-white hover:bg-white/5 transition-all"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Join Channel
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm text-gray-300 hover:text-white hover:border-white hover:bg-white/5 transition-all"
                            >
                                <Instagram className="w-4 h-4" />
                                Instagram
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm text-gray-300 hover:text-white hover:border-white hover:bg-white/5 transition-all"
                            >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© CulturaHub 2026</p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                        Made By <span className="text-red-500">❤</span> Sqrty
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

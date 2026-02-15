"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff, ChevronDown, ChevronRight, Info, Ruler, Search, ChevronLeft, CreditCard, CheckCircle, Upload, Image as ImageIcon } from "lucide-react";

export default function RegisterPage() {
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

    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Form Data State
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        // Step 2 Fields
        participationType: "",
        accommodation: "",
        tshirtSize: "",
        rollNumber: "",
        college: "",
        // Step 3 Fields
        paymentMethod: "",
        paymentScreenshot: null as File | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on change
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
            setError("");
        }
    };

    const validateStep1 = () => {
        const { fullName, gender, email, mobile, password, confirmPassword } = formData;
        if (!fullName || !gender || !email || !mobile || !password || !confirmPassword) {
            setError("fill the all details");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        const { participationType, accommodation, tshirtSize, rollNumber, college } = formData;
        if (!participationType || !accommodation || !tshirtSize || !rollNumber || !college) {
            setError("fill the all details");
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
        const { paymentMethod, paymentScreenshot } = formData;
        if (!paymentMethod) {
            setError("Please select a payment method");
            return false;
        }
        if (!paymentScreenshot) {
            setError("Payment screenshot required");
            return false;
        }
        return true;
    };

    const handleNextStep = () => {
        setError("");
        if (currentStep === 1) {
            if (validateStep1()) setCurrentStep(2);
        } else if (currentStep === 2) {
            if (validateStep2()) setCurrentStep(3);
        }
    };

    const handlePrevStep = () => {
        setError("");
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };



    const handleSubmit = async () => {
        if (!validateStep3()) return;

        setIsLoading(true);
        setError("");

        try {
            const supabase = createClient();

            // 1. Upload Payment Screenshot
            let screenshotUrl = "";
            if (formData.paymentScreenshot) {
                const fileExt = formData.paymentScreenshot.name.split('.').pop();
                const fileName = `${formData.rollNumber}-${Date.now()}.${fileExt}`;
                const { error: uploadError, data } = await supabase.storage
                    .from('payment-screenshots')
                    .upload(fileName, formData.paymentScreenshot);

                if (uploadError) throw uploadError;

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('payment-screenshots')
                    .getPublicUrl(fileName);

                screenshotUrl = publicUrl;
            }

            // 2. Sign Up User with Metadata
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        fullName: formData.fullName,
                        gender: formData.gender,
                        mobile: formData.mobile,
                        participationType: formData.participationType,
                        accommodation: formData.accommodation,
                        tshirtSize: formData.tshirtSize,
                        rollNumber: formData.rollNumber,
                        college: formData.college,
                        paymentMethod: formData.paymentMethod,
                        paymentScreenshotUrl: screenshotUrl
                    }
                }
            });

            if (signUpError) throw signUpError;

            // Success
            alert("Registration Successful! Please check your email to confirm.");
            router.push('/signin');

        } catch (err: any) {
            console.error("Registration Error:", err);
            setError(err.message || "Failed to register");
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to format plan name
    const getPlanName = (value: string) => {
        if (value === "all_events") return "All Events (Online + Offline)";
        if (value === "online_only") return "Online Only";
        return value;
    };

    return (
        <main className="min-h-screen relative bg-black selection:bg-red-500/30 font-sans">
            <div id="stars-container" className="stars fixed inset-0 z-0 pointer-events-none" />

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pt-24 pb-12">

                {/* Logo and Header */}
                <div className="text-center mb-10 md:mb-12">
                    <img src="/logo.svg" alt="logo" className="w-16 h-16 md:w-20 md:h-20 mx-auto opacity-80 mb-4 md:mb-6" />
                    <h1 className="text-2xl md:text-4xl font-playfair font-bold text-[#e0a469] tracking-wider uppercase px-4">
                        Register for CulturaHub
                    </h1>
                </div>

                {/* Progress Stepper */}
                <div className="w-full max-w-3xl mb-10 md:mb-12 flex items-center justify-between relative px-2 md:px-0">
                    {/* Progress Line */}
                    <div className="absolute top-[20px] left-0 w-full h-[1px] bg-white/10 -z-10" />
                    <div
                        className="absolute top-[20px] left-0 h-[1px] bg-red-600 -z-10 transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    />

                    {/* Step 1 */}
                    <div className="flex flex-col items-center gap-2 bg-black px-2">
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${currentStep >= 1 ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "bg-[#1a1a1a] text-gray-500 border border-white/10"
                            }`}>
                            1
                        </div>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${currentStep >= 1 ? "text-white" : "text-gray-600"}`}>
                            Personal
                        </span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center gap-2 bg-black px-2">
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${currentStep >= 2 ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "bg-[#1a1a1a] text-gray-500 border border-white/10"
                            }`}>
                            2
                        </div>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${currentStep >= 2 ? "text-white" : "text-gray-600"}`}>
                            Details
                        </span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center gap-2 bg-black px-2">
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${currentStep >= 3 ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "bg-[#1a1a1a] text-gray-500 border border-white/10"
                            }`}>
                            3
                        </div>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${currentStep >= 3 ? "text-white" : "text-gray-600"}`}>
                            Payment
                        </span>
                    </div>
                </div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl"
                >
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-red-900/20 rounded-xl border border-red-500/20">
                                    <User className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Full Name *</label>
                                    <div className="relative group">
                                        <input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Gender Dropdown */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Gender *</label>
                                    <div className="relative group">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all appearance-none text-gray-400"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Email Address *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                            <Mail className="w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                        </div>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Mobile Number *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                            <Phone className="w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                        </div>
                                        <input
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            type="tel"
                                            placeholder="Enter 10-digit phone number"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Password *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                            <Lock className="w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                        </div>
                                        <input
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Confirm Password *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                            <Lock className="w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                        </div>
                                        <input
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Re-enter your password"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        />
                                        <button
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Other Details */}
                    {currentStep === 2 && (
                        <div className="space-y-8">
                            {/* Payment Info Button */}
                            <button className="flex items-center gap-2 bg-[#052e16] text-[#4ade80] px-4 py-2 rounded-lg border border-[#4ade80]/20 hover:bg-[#052e16]/80 transition-colors mb-4">
                                <Info className="w-4 h-4" />
                                <span className="text-sm font-medium">View Payment Details</span>
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Participation Type */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Participation Type *</label>
                                    <div className="relative group">
                                        <select
                                            name="participationType"
                                            value={formData.participationType}
                                            onChange={handleChange}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all appearance-none"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="all_events">All Events (Online + Offline) - ₹999</option>
                                            <option value="online_only">Online Only - ₹499</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Accommodation Needed */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Accommodation Needed? *</label>
                                    <div className="relative group">
                                        <select
                                            name="accommodation"
                                            value={formData.accommodation}
                                            onChange={handleChange}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all appearance-none"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* T-Shirt Size */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-bold text-gray-300 ml-1">T-Shirt Size *</label>
                                        <button className="flex items-center gap-1.5 text-[#e0a469] bg-[#e0a469]/10 px-3 py-1 rounded-full text-xs font-bold border border-[#e0a469]/20 hover:bg-[#e0a469]/20 transition-colors">
                                            <Ruler className="w-3 h-3" />
                                            View Chart
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <select
                                            name="tshirtSize"
                                            value={formData.tshirtSize}
                                            onChange={handleChange}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all appearance-none"
                                        >
                                            <option value="">Select Size</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                    <p className="text-[10px] text-[#e0a469] flex items-center gap-1.5 mt-2">
                                        <Info className="w-3 h-3" />
                                        T-shirt size will not change in any case. Please choose correctly.
                                    </p>
                                </div>

                                {/* Roll Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Roll Number *</label>
                                    <div className="relative group">
                                        <input
                                            name="rollNumber"
                                            value={formData.rollNumber}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter your roll number"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        />
                                    </div>
                                </div>

                                {/* College */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">College *</label>
                                    <div className="relative group">
                                        <input
                                            name="college"
                                            value={formData.college}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Select your college"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all"
                                        />
                                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Payment & Review */}
                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-red-900/20 rounded-xl border border-red-500/20">
                                    <CreditCard className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Payment & Review</h2>
                            </div>

                            {/* Review Details Card */}
                            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[50px] pointer-events-none" />

                                <div className="flex items-center gap-2 mb-6 text-green-500">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-bold tracking-wide uppercase text-sm">Review Your Details</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Name</p>
                                        <p className="text-white font-medium">{formData.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-white font-medium break-all">{formData.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-white font-medium">{formData.mobile}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Plan</p>
                                        <p className="text-white font-medium">{getPlanName(formData.participationType)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 ml-1">Payment Method *</label>
                                <div className="relative group">
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-6 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-[#111] transition-all appearance-none"
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="upi">UPI (GPay/PhonePe/Paytm)</option>
                                        <option value="card">Bank Transfer</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Dynamic Payment Details Display */}
                            {formData.paymentMethod && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden"
                                >
                                    <div className="text-center mb-4">
                                        <p className="text-gray-400 text-sm uppercase tracking-wider font-bold">Amount to Pay</p>
                                        <p className="text-3xl font-bold text-green-400 mt-1">
                                            {formData.participationType === 'online_only' ? "₹499" : "₹999"}
                                        </p>
                                    </div>

                                    {formData.paymentMethod === "upi" && (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="bg-white p-2 rounded-xl">
                                                {/* Dynamic QR Code based on amount */}
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=culturahub@upi&pn=CulturaHub&am=${formData.participationType === 'online_only' ? '499' : '999'}&cu=INR`}
                                                    alt="Payment QR"
                                                    className="w-40 h-40"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-400 mb-1">UPI ID</p>
                                                <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                                                    <code className="text-amber-500 font-mono">culturahub@upi</code>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500">Scan via any UPI app to pay</p>
                                        </div>
                                    )}

                                    {formData.paymentMethod === "card" && (
                                        <div className="space-y-4">
                                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400 text-sm">Bank Name</span>
                                                    <span className="text-white font-bold">HDFC Bank</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400 text-sm">Account Name</span>
                                                    <span className="text-white font-bold">CulturaHub Fest</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400 text-sm">Account No</span>
                                                    <span className="text-white font-mono">123456789012</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400 text-sm">IFSC Code</span>
                                                    <span className="text-white font-mono">HDFC0001234</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 text-center">Please use these details for NEFT/IMPS transfer</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Payment Screenshot Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 ml-1">Payment Details/Screenshot *</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        id="screenshot"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="screenshot"
                                        className="flex items-center justify-center gap-3 w-full bg-[#0a0a0a] border border-white/10 border-dashed rounded-2xl py-6 cursor-pointer hover:bg-[#111] hover:border-red-500/30 transition-all group"
                                    >
                                        {formData.paymentScreenshot ? (
                                            <>
                                                <ImageIcon className="w-5 h-5 text-green-500" />
                                                <span className="text-green-500 font-medium">{formData.paymentScreenshot.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                                                <span className="text-gray-400 group-hover:text-white transition-colors">Upload Payment Screenshot</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 p-3 md:p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-2 md:gap-3 animate-pulse mx-2 md:mx-0">
                            <Info className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                            <p className="text-red-500 font-bold text-xs md:text-base">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-8 md:mt-12 px-2 md:px-0">
                        {currentStep > 1 ? (
                            <button
                                onClick={handlePrevStep}
                                className="flex items-center gap-1.5 md:gap-2 bg-[#1a1a1a] hover:bg-[#252525] text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl transition-all hover:scale-105 border border-white/10 text-sm md:text-base"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Back</span>
                            </button>
                        ) : <div />}

                        {currentStep === 3 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-1.5 md:gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : (
                                    <>
                                        <span>Complete Registration</span>
                                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={handleNextStep}
                                className="flex items-center gap-1.5 md:gap-2 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-sm md:text-base"
                            >
                                <span>Next Step</span>
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        )}
                    </div>

                </motion.div>

            </div>

            {/* Background elements */}
            <div className="fixed top-20 left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
        </main>
    );
}

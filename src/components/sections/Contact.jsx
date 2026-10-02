import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import siteData from "../../data/site";
import { Terminal, Briefcase, Hash, Copy, Check, Send } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters")
});

export function Contact() {
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Placeholder for actual Formspree/EmailJS submission
        await new Promise(r => setTimeout(r, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7C5CFF', '#C6FF3D', '#FF6B57']
        });

        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(siteData.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-32 relative bg-surface-2 mt-20 rounded-t-[3rem] border-t border-border">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-5xl md:text-[5vw] font-heading font-extrabold tracking-tighter leading-[1.1] text-gradient mb-20 max-w-3xl">
                    Let's build something unreasonably good.
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left: Form */}
                    <div className="glass p-8 md:p-10 rounded-3xl">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-16 h-16 bg-secondary/20 text-secondary border border-secondary rounded-full flex items-center justify-center mb-6">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-text mb-2">Message Transmitted</h3>
                                <p className="text-muted">Houston, we have incoming communication. I'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-mono text-muted mb-2 uppercase tracking-widest">Name</label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        id="name"
                                        className={`w-full bg-surface border ${errors.name ? 'border-highlight' : 'border-border focus:border-primary'} rounded-xl px-4 py-3 text-text outline-none transition-colors`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-highlight text-xs mt-2">{errors.name.message}</motion.p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-mono text-muted mb-2 uppercase tracking-widest">Email</label>
                                    <input
                                        {...register("email")}
                                        type="text"
                                        id="email"
                                        className={`w-full bg-surface border ${errors.email ? 'border-highlight' : 'border-border focus:border-primary'} rounded-xl px-4 py-3 text-text outline-none transition-colors`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-highlight text-xs mt-2">{errors.email.message}</motion.p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-mono text-muted mb-2 uppercase tracking-widest">Message</label>
                                    <textarea
                                        {...register("message")}
                                        id="message"
                                        rows={4}
                                        className={`w-full bg-surface border ${errors.message ? 'border-highlight' : 'border-border focus:border-primary'} rounded-xl px-4 py-3 text-text outline-none transition-colors resize-none`}
                                        placeholder="What's on your mind?"
                                    />
                                    {errors.message && (
                                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-highlight text-xs mt-2">{errors.message.message}</motion.p>
                                    )}
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-secondary text-black font-bold py-4 rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(198,255,61,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    data-cursor="hover"
                                >
                                    {isSubmitting ? <span className="animate-pulse">Transmitting...</span> : <><Send size={18} /> Send Signal</>}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right: Info Box */}
                    <div className="flex flex-col justify-between gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-text mb-6">Direct Comms</h3>
                            <div
                                className="group flex items-center justify-between glass p-6 rounded-2xl cursor-pointer hover:border-primary transition-colors"
                                onClick={copyEmail}
                            >
                                <div>
                                    <div className="text-xs font-mono text-muted uppercase tracking-widest mb-1">Email</div>
                                    <div className="text-lg md:text-xl text-text overflow-hidden text-ellipsis">{siteData.email}</div>
                                </div>
                                <div className={`p-3 rounded-full transition-colors ${copied ? 'bg-secondary text-black' : 'bg-surface-2 text-muted group-hover:text-text'}`}>
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-text mb-6">Networks</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: Terminal, link: siteData.github, label: "GitHub" },
                                    { icon: Briefcase, link: siteData.linkedin, label: "LinkedIn" },
                                    { icon: Hash, link: siteData.twitter, label: "Twitter" },
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-14 h-14 rounded-full glass flex items-center justify-center text-muted hover:text-secondary hover:border-secondary transition-colors"
                                        aria-label={social.label}
                                        data-cursor="hover"
                                    >
                                        <social.icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

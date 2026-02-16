import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '../lib/utils';

const testimonials = [
    {
        id: 1,
        quote: "A masterclass in technical restraint. It feels like running on moss, but with mechanical focus.",
        author: "Elena R.",
        role: "Ultra-Marathon Elite"
    },
    {
        id: 2,
        quote: "Finally, a performance shoe that doesn't scream for attention. It simply performs.",
        author: "James K.",
        role: "Industrial Designer"
    },
    {
        id: 3,
        quote: "The energy return is noticeable after mile 20. It's subtle, but definitive.",
        author: "Sarah L.",
        role: "Olympic Track Coach"
    }
];

export const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev: number) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev: number) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section id="testimonials" className="py-64 bg-[var(--color-surface-900)] relative overflow-hidden flex items-center">
            {/* Cinematic Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-[var(--color-primary)] rounded-full blur-[200px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[var(--color-accent)] rounded-full blur-[200px]" />
            </div>

            <div className="max-w-5xl mx-auto px-8 w-full relative z-10">
                <div className="flex flex-col items-center text-center space-y-24">

                    <div className="relative">
                        <div className="absolute -top-12 -left-12 opacity-5 text-white">
                            <Quote size={80} fill="currentColor" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="space-y-12"
                            >
                                <Text variant="headline" className="font-serif italic text-white text-4xl md:text-6xl leading-[1.1] max-w-4xl">
                                    "{testimonials[current].quote}"
                                </Text>

                                <div className="space-y-4">
                                    <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto" />
                                    <div className="space-y-1">
                                        <Text variant="title" className="text-xl font-bold text-white tracking-widest uppercase">
                                            {testimonials[current].author}
                                        </Text>
                                        <Text variant="caption" className="text-white/40 tracking-[0.3em] block">
                                            {testimonials[current].role}
                                        </Text>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-12">
                        <button
                            onClick={prev}
                            className="group p-4 rounded-full border border-white/10 hover:border-[var(--color-accent)] transition-all duration-500"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={20} className="text-white group-hover:text-[var(--color-accent)] transition-colors" />
                        </button>

                        <div className="flex gap-3">
                            {testimonials.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-all duration-500",
                                        current === i ? "bg-[var(--color-accent)] w-8" : "bg-white/10"
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="group p-4 rounded-full border border-white/10 hover:border-[var(--color-accent)] transition-all duration-500"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={20} className="text-white group-hover:text-[var(--color-accent)] transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
